import { Router } from "express";
import auth from "./auth";
import usuario from "./usuario";
import extencion from "./extension";
import categoria from "./categoria";
import producto from "./producto";
const routes = Router();


// localhost:3000/auth/login
routes.use('/auth', auth);


// localhost:3000/usuario
routes.use('/usuarios', usuario);

//localhost:3000/extension
routes.use('/extensiones', extencion);

routes.use('/categorias', categoria);

routes.use('/productos',producto);


export default routes;