import 'reflect-metadata';
import { AppDataSource } from './data-source';
import app from './app';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => console.log('Error: ', error));
