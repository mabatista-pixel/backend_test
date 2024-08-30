import express from 'express';
import measureRoutes from './routes/measureRoutes';

const app = express();

app.use(express.json());
app.use('/api', measureRoutes);

export default app;
