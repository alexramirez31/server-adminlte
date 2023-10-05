
import { Router } from "express";
const router = Router();

import { CategoriaController } from "../controller/CategoriaController";

//router.post('/persona/guardar', tmpPersonaController.tmpPersonaGuardar);
 router.post('/obtener', CategoriaController.obtenerCategorias);

 router.post('/agregar', CategoriaController.newCategoria);

 router.delete('/delete/:id', CategoriaController.deleteCategoria);

 router.post('/obtener/:id', CategoriaController.obtenerCategoriaId);

 router.post('/editar/:id', CategoriaController.editarCategoria);
export default router;