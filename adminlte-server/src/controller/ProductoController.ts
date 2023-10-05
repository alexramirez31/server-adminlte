import { Request, Response } from "express";
import { connectionmysql } from '..';
import { ProductoModel } from '../models/producto.model';
import * as path from 'path';
import * as fs from 'fs'
// const path= require('path');
//  const fs= require('fs').promises;
export class ProductoController {

    //listado de Productos
    static obtenerProductos = async (req: Request, res: Response) => {

        connectionmysql.query("call  sp_obtener_productos()",[],
            function(error,result,fields){
                if(error){
                    throw error;
                }else{
                    res.status(200).json(result.slice(0,2));
                }
            
        });

    }


    //Agregar Producto
    static newProducto= async (req: Request, res: Response) => {

        let {id_categoria,nombre,imagen,stock,precio_compra,precio_venta}=req.body as ProductoModel;
        let id=0;
        let imagenruta= 'uploads/'+''+imagen

        connectionmysql.query("call  sp_producto_guardar(?,?,?,?,?,?,?)",[id,id_categoria,nombre,imagenruta,stock,precio_compra,precio_venta],
            function(error,result,fields){
                if(error){
                    throw error;
                }else{
                    res.status(200).json(result[0]);
                    message: 'Extensión agregada con éxito'
                }
            
        });
    
    }

   //Obtener Producto id
   static obtenerProductoID = async (req: Request, res: Response) => {
    var id = req.params.id 
    connectionmysql.query("call  sp_productos_obtener_id(?)",[id],
        function(error,result,fields){
            if(error){
                throw error;
            }else{
                res.status(200).json(result[0]);
            }
        
    });
}


    //Eliminar producto
    static deleteProducto = async (req: Request, res: Response) => {
        var id = req.params.id
        let resultado = await ProductoController.deleteFile(id);
        
        if (resultado) {
            connectionmysql.query("call  sp_producto_delete(?)", [id],
                function (error, result, fields) {
                    if (error) {
                        throw error;
                    } else {
                        res.status(200).json(result[0]);
                        message: 'Producto  Eliminada con éxito'
                    }
                });
        }
    }

    static deleteFile= (id): Promise<boolean>=>{
        return new Promise((res, rej) => {
            connectionmysql.query('select imagen from producto where id=?',[id],(err,rows,fields)=>{
                let [{imagen}]=rows;
                fs.exists(path.resolve('./'+imagen), (exist) => {
                    if (exist){
                        fs.unlink(path.resolve('./'+imagen), (err) => {
                            if (err)
                                rej(err);
                            else 
                                res(true);
                        });
                    }else{
                        res(true);
                    }
              
                });
            });
        });
    }

    //Editar Producto
    //Agregar Producto
      static editProducto= async (req: Request, res: Response) => {
        var id = req.params.id
        let resultado = await ProductoController.deleteFile(id);

        if (resultado){
            let {id_categoria,nombre,imagen,stock,precio_compra,precio_venta}=req.body as ProductoModel;
            let imagenruta= 'uploads/'+''+imagen
    
            connectionmysql.query("call  sp_producto_guardar(?,?,?,?,?,?,?)",[id,id_categoria,nombre,imagenruta,stock,precio_compra,precio_venta],
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

}

export default ProductoController;