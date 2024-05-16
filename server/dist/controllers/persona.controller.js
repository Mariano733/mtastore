"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putPersona = exports.postPersona = exports.deletePersona = exports.getPersona = exports.getPersonas = void 0;
const conection_1 = __importDefault(require("../db/conection"));
const getPersonas = (req, res) => {
    conection_1.default.query('select * from usuarios', (err, data) => {
        if (err)
            throw err;
        res.json(data);
    });
};
exports.getPersonas = getPersonas;
const getPersona = (req, res) => {
    const { id } = req.params;
    conection_1.default.query(`select * from usuarios where id = ${id}`, (err, data) => {
        if (err)
            throw err;
        res.json(data[0]);
    });
};
exports.getPersona = getPersona;
const deletePersona = (req, res) => {
    const { id } = req.params;
    conection_1.default.query(`delete from usuarios where id = ${id}`, (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: 'Usuario eliminado con éxito'
        });
    });
};
exports.deletePersona = deletePersona;
const postPersona = (req, res) => {
    const { body } = req;
    conection_1.default.query('insert into usuarios set ?', [body], (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: 'Usuario añadida con éxito'
        });
    });
};
exports.postPersona = postPersona;
const putPersona = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    conection_1.default.query('update usuarios set ? where id = ?', [body, id], (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: "Usuario actualizado con éxito"
        });
    });
};
exports.putPersona = putPersona;
