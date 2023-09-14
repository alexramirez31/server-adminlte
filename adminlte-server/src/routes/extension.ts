//pruebas personas
import { Router } from "express";

const router = Router();

import { ExtensionesController } from "../controller/ExtensionesController";

//router.post('/persona/guardar', tmpPersonaController.tmpPersonaGuardar);
router.post('/obtener', ExtensionesController.obtenerExtensiones);

router.post('/agregar', ExtensionesController.newExtension);

router.delete('/delete/:id', ExtensionesController.deleteExtension);

router.post('/obtener/:id', ExtensionesController.obtenerExtensionesId);

router.post('/editar/:id', ExtensionesController.editarExtension);
export default router;