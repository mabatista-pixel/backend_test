import { Request, Response, NextFunction } from 'express';

const base64Regex = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;

export const validateBase64Image = (req: Request, res: Response, next: NextFunction) => {
    const { image } = req.body;

    if (!image || typeof image !== 'string' || !base64Regex.test(image)) {
        return res.status(400).json({
            error_code: 'INVALID_IMAGE',
            error_description: 'The provided image is not a valid base64-encoded string'
        });
    }

    next();
};
