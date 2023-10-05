
import { Router } from "express";
const express = require('express');
const router = Router();
const path = require('path');
const multer = require('multer');
import { uuid } from 'uuidv4';
import * as fs from 'fs'
import * as mime  from 'mime'

import { ProductoController } from "../controller/ProductoController";




// router.post('/persona/guardar', tmpPersonaController.tmpPersonaGuardar);
router.post('/uploads', express.static(path.join(__dirname,'uploads')));
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'uploads')
    },
    filename:(req,file,callback)=>{
        let ext = path.extname(file.originalname);
        ext = ext.length > 1 ? ext : '.' + mime.extension(file.mimetype);
        const fileName = uuid() + ext;
        console.log('filename: ', fileName); // <= vemos el resultado
        callback(null, fileName);

        //callback(null,file.originalname);
    }
});

const upload = multer({storage});

router.post('/file',upload.single('file'),(req,res,next)=>{
    const file = req['file'];
    
    if(!file){
        const error = new  Error('No file');
        res.statusCode=400;
        
        return next(error);
    }
    res.send(file);
});

router.post('/agregar', ProductoController.newProducto);

router.post('/editar/:id', ProductoController.editProducto);

router.delete('/delete/:id', ProductoController.deleteProducto);
//router.delete('/delete/:id', ProductController.adminCantonesObtener);

router.post('/obtener/', ProductoController.obtenerProductos);

router.post('/obtener/:id', ProductoController.obtenerProductoID);

//  router.post('/editar/:id', CategoriaController.editarCategoria);
export default router;