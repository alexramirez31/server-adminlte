import { Response } from 'express';
import { Request } from 'express';
import { connectionmysql } from '..';
import { ExtensionModel } from '../models/extension.model';


export class ExtensionesController {

    static obtenerExtensiones = async (req: Request, res: Response) => {

        connectionmysql.query("call  sp_obtener_extensiones()",[],
            function(error,result,fields){
                if(error){
                    throw error;
                }else{
                    res.status(200).json(result[0]);
                }
            
        });

        //Agregar Extension

}



static obtenerExtensionesId = async (req: Request, res: Response) => {
    var id = req.params.id 
    connectionmysql.query("call  sp_extension_obtener_id(?)",[id],
        function(error,result,fields){
            if(error){
                throw error;
            }else{
                res.status(200).json(result[0]);
            }
        
    });
}

static newExtension= async (req: Request, res: Response) => {

    let { nombre, unidad, cargo, extension }=req.body as ExtensionModel;
    
    connectionmysql.query("call  sp_extension_guardar(?,?,?,?)",[nombre,unidad,cargo,extension],
        function(error,result,fields){
            if(error){
                throw error;
            }else{
                res.status(200).json(result[0]);
                message: 'Extensión agregada con éxito'
            }
        
    });

}

static deleteExtension= async (req: Request, res: Response) => {

    var id = req.params.id

    //let { nombre, unidad, cargo, extension }=req.body as ExtensionModel;

    connectionmysql.query("call  sp_extension_delete(?)",[id],
        function(error,result,fields){
            if(error){
                throw error;
            }else{
                res.status(200).json(result[0]);
                message: 'Extensión Eliminada con éxito'
            }
        
    });

}


static editarExtension= async (req: Request, res: Response) => {
    var id = req.params.id
    let { nombre, unidad, cargo, extension }=req.body as ExtensionModel;
    console.log(req.body)
    console.log(id)
    connectionmysql.query("call  sp_extension_editar(?,?,?,?,?)",[id,nombre,unidad,cargo,extension],
        function(error,result,fields){
            if(error){
                throw error;
            }else{
                res.status(200).json(result[0]);
                message: 'Extensión agregada con éxito'
            }
   
    });
}

}


