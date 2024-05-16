import { Request, Response } from "express";
import connetion from "../db/conection";

export const getPersonas = ( req: Request, res: Response) => {

        connetion.query('select * from usuarios',(err, data) =>{
            if(err) throw err;
            res.json(data);
        })
}

export const getPersona = ( req: Request, res: Response) => {

    const { id } = req.params;

    connetion.query(`select * from usuarios where id = ${id}`,(err, data) => {
        if(err) throw err;
        res.json(data[0]);
    })
}

export const deletePersona = ( req: Request, res: Response) => {

    const { id } = req.params;

    connetion.query(`delete from usuarios where id = ${id}`, (err, data) => {
        if(err) throw err;
        res.json({
            msg: 'Usuario eliminado con éxito'
        })

    })
}

export const postPersona = ( req: Request, res: Response) => {
    
    const { body } = req;

    connetion.query('insert into usuarios set ?', [body], (err,data) => {
        if(err) throw err;
        res.json({
            msg: 'Usuario añadida con éxito'
        })

    })
}

export const putPersona = ( req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    connetion.query('update usuarios set ? where id = ?', [body, id], (err, data) => {
        if(err) throw err;
        res.json({
            msg: "Usuario actualizado con éxito"
        })
    })
}