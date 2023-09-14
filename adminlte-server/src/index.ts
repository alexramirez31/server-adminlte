import { createConnection } from "typeorm";
import { Request, Response } from "express";
import * as express from "express";
import * as cors from 'cors';
import * as helmet from "helmet";
import routes from "./routes";
import * as mysql from 'mysql'

const PORT = process.env.PORT || 3000;


let config = {
  host    : 'localhost',
  name: 'development',
  //port: 3306,
  user    : 'root',
  password: 'admin123',
  database: 'db_control'
};

export const connectionmysql = mysql.createConnection(config);

createConnection().then(async connection => {

  connectionmysql.connect((err) => {
    if (err == null)
      console.log('Exito conectarse con msql');
    else
      console.log('Error al conectarse con msql', err);
  });
  // create express app
  const app = express();

  //middlewares
  app.use(cors());
  app.use(helmet());
  app.use(express.json());

  //Rutas

  app.use('/', routes);

  // start express server

  app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

}).catch(error => console.log(error));
