import { Router } from 'express';
import { uploadMeasure, confirmMeasure, listMeasures } from '../controllers/measureController';
import { validateBase64Image } from '../middlewares/validateBase64Image';

const router = Router();

router.post('/upload', validateBase64Image, uploadMeasure);
router.patch('/confirm', confirmMeasure);
router.get('/:customer_code/list', listMeasures);

export default router;
