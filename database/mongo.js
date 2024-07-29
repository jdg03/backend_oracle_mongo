
import mongoose from 'mongoose';

const bd = 'cineMongo';
const port = '27017';
const host = 'localhost';

mongoose.set("strictQuery", false);

export class Database {
    constructor() {
        this.conectar();
    }

    async conectar() {
        try {
            await mongoose.connect(`mongodb://${host}:${port}/${bd}`);
            console.log('Se conectó a la base cineMongo');
        } catch (error) {
            console.log('Error al conectar a la base de datos:', error);
        }
    }
}
