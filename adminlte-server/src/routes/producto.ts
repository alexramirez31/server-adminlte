
import { Router } from "express";
const express = require('express');
const router = Router();
const path = require('path');
const multer = require('multer');

import { ProductoController } from "../controller/ProductoController";


// router.post('/persona/guardar', tmpPersonaController.tmpPersonaGuardar);
router.post('/uploads', express.static(path.join(__dirname,'uploads')));
const storage = multer.diskStorage({

    destination:(req,file,callback)=>{
        callback(null,'uploads')
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
});

const upload = multer({storage});


router.post('/file',upload.single('file'),(req,res,next)=>{
    const file = req.file;

    if(!file){
        const error = new  Error('No file');
        res.statusCode=400;
        
        return next(error);
    }
    res.send(file);
});
//  router.delete('/delete/:id', CategoriaController.deleteCategoria);

//  router.post('/obtener/:id', CategoriaController.obtenerCategoriaId);

//  router.post('/editar/:id', CategoriaController.editarCategoria);
export default router;