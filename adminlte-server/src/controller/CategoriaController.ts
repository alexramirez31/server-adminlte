import { Request, Response } from "express";
import { connectionmysql } from '..';
import { CategoriaModel } from '../models/categoria.model';


export class CategoriaController {
    //listado de categorias
    static obtenerCategorias = async (req: Request, res: Response) => {

        connectionmysql.query("call  sp_categoria_obtener()",[],
            function(error,result,fields){
                if(error){
                    throw error;
                }else{
                    res.status(200).json(result[0]);
                }
            
        });


    }

    //Agregar Categoria
    static newCategoria= async (req: Request, res: Response) => {

        let { nombre, descripcion}=req.body as CategoriaModel;
        let id=0;

        connectionmysql.query("call  sp_categoria_guardar(?,?,?)",[id,nombre,descripcion],
            function(error,result,fields){
                if(error){
                    throw error;
                }else{
                    res.status(200).json(result[0]);
                    message: 'Extensión agregada con éxito'
                }
            
        });
    
    }

    static obtenerCategoriaId = async (req: Request, res: Response) => {
        var id = req.params.id 
        connectionmysql.query("call  sp_categoria_obtener_id(?)",[id],
            function(error,result,fields){
                if(error){
                    throw error;
                }else{
                    res.status(200).json(result[0]);
                }
            
        });
    }

    static editarCategoria= async (req: Request, res: Response) => {
        var id = req.params.id
        let { nombre, descripcion }=req.body as CategoriaModel;
        console.log(req.body)
        console.log(id)
        connectionmysql.query("call  sp_categoria_guardar(?,?,?)",[id,nombre,descripcion],
            function(error,result,fields){
                if(error){
                    throw error;
                }else{
                    res.status(200).json(result[0]);
                    message: 'Categoria agregada con éxito'
                }
       
        });
    }

    static deleteCategoria= async (req: Request, res: Response) => {

        var id = req.params.id
    
        //let { nombre, unidad, cargo, extension }=req.body as ExtensionModel;
    
        connectionmysql.query("call  sp_categoria_delete(?)",[id],
            function(error,result,fields){
                if(error){
                    throw error;
                }else{
                    res.status(200).json(result[0]);
                    message: 'Categoria Eliminada con éxito'
                }
            
        });
    
    }

}


