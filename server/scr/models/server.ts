import express, {Application} from 'express';
import routesPersonas from '../routes/persona.routes';
import connetion from '../db/conection';
import cors from 'cors';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.middlewares();
        this.routes();
        this.conectarDb();
    }
    
    listen() {
        this.app.listen(this.port, () => {
        console.log('Aplicación corriendo por el puerto ', this.port);
        })
    }

    middlewares() {
        //Parseo del body
        this.app.use(express.json());

        // Cors
        this.app.use(cors());
    }

    routes() {
        this.app.use('/api/personas', routesPersonas);
    }
        
    conectarDb() {
        connetion.connect((err) => {
            if(err) throw err;
            console.log('Conectado a la base de datos');
        })
    }

}

export default Server;