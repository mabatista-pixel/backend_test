import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Measure } from '../models/Measure';
import { Customer } from '../models/Customer';
import googleGeminiService from '../services/googleGeminiService';
import { validateMeasureInput } from '../utils/validation';

export const uploadMeasure = async (req: Request, res: Response) => {
    const { image, customer_code, measure_datetime, measure_type } = req.body;

    const error = validateMeasureInput(req.body);
    if (error) {
        return res.status(400).json({ error_code: 'INVALID_DATA', error_description: error });
    }

    const measureRepo = AppDataSource.getRepository(Measure);
    const existingMeasure = await measureRepo.findOne({
        where: { customer: { customer_code }, measure_datetime: new Date(measure_datetime), measure_type }
    });

    if (existingMeasure) {
        return res.status(409).json({ error_code: 'DOUBLE_REPORT', error_description: 'Leitura do mês já realizada' });
    }

    try {
        const measure_value = await googleGeminiService.getMeasureValue(image);
        const image_url = await googleGeminiService.uploadImage(image);

        const customerRepo = AppDataSource.getRepository(Customer);
        const customer = await customerRepo.findOne({ where: { customer_code } });
        if (!customer) {
            return res.status(400).json({ error_code: 'INVALID_DATA', error_description: 'Cliente não encontrado' });
        }

        const newMeasure = measureRepo.create({
            measure_datetime,
            measure_type,
            measure_value,
            image_url,
            customer
        });

        await measureRepo.save(newMeasure);

        return res.status(200).json({ image_url, measure_value, measure_uuid: newMeasure.measure_uuid });
    } catch (err) {
        return res.status(500).json({ error_code: 'SERVER_ERROR', error_description: 'Erro ao processar a leitura' });
    }
};

export const confirmMeasure = async (req: Request, res: Response) => {
    const { measure_uuid, confirmed_value } = req.body;

    const measureRepo = AppDataSource.getRepository(Measure);
    const measure = await measureRepo.findOne({ where: { measure_uuid } });

    if (!measure) {
        return res.status(404).json({ error_code: 'MEASURE_NOT_FOUND', error_description: 'Leitura não encontrada' });
    }

    if (measure.has_confirmed) {
        return res.status(409).json({ error_code: 'CONFIRMATION_DUPLICATE', error_description: 'Leitura já confirmada' });
    }

    measure.measure_value = confirmed_value;
    measure.has_confirmed = true;

    await measureRepo.save(measure);

    return res.status(200).json({ success: true });
};

export const listMeasures = async (req: Request, res: Response) => {
    const { customer_code } = req.params;
    const { measure_type } = req.query;

    const measureRepo = AppDataSource.getRepository(Measure);
    const customerRepo = AppDataSource.getRepository(Customer);

    const customer = await customerRepo.findOne({ where: { customer_code }, relations: ['measures'] });

    if (!customer) {
        return res.status(404).json({ error_code: 'MEASURES_NOT_FOUND', error_description: 'Nenhuma leitura encontrada' });
    }

    let measures = customer.measures;
    if (measure_type) {
        measures = measures.filter(m => m.measure_type.toLowerCase() === measure_type.toString().toLowerCase());
    }

    return res.status(200).json({
        customer_code,
        measures: measures.map(m => ({
            measure_uuid: m.measure_uuid,
            measure_datetime: m.measure_datetime,
            measure_type: m.measure_type,
            has_confirmed: m.has_confirmed,
            image_url: m.image_url
        }))
    });
};
