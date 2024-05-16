"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const persona_routes_1 = __importDefault(require("../routes/persona.routes"));
const conection_1 = __importDefault(require("../db/conection"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.middlewares();
        this.routes();
        this.conectarDb();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicación corriendo por el puerto ', this.port);
        });
    }
    middlewares() {
        //Parseo del body
        this.app.use(express_1.default.json());
        // Cors
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use('/api/personas', persona_routes_1.default);
    }
    conectarDb() {
        conection_1.default.connect((err) => {
            if (err)
                throw err;
            console.log('Conectado a la base de datos');
        });
    }
}
exports.default = Server;
