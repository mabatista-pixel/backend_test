export const validateMeasureInput = (data: any): string | null => {
    const { image, customer_code, measure_datetime, measure_type } = data;
    if (!image || typeof image !== 'string') return 'Imagem inválida';
    if (!customer_code || typeof customer_code !== 'string') return 'Código do cliente inválido';  // Ensure it's a string
    if (!measure_datetime || isNaN(Date.parse(measure_datetime))) return 'Data de medição inválida';
    if (!['WATER', 'GAS'].includes(measure_type)) return 'Tipo de medição não permitida';
    return null;
};
