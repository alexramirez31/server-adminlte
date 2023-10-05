import { Request, Response } from "express";
import { connectionmysql } from '..';

export class DashboardController {

    //listado de Productos
    static obtenerDashboard= async (req: Request, res: Response) => {

        connectionmysql.query("call sp_tablero_general()",[],
            function(error,result,fields){
                if(error){
                    throw error;
                }else{
                    res.status(200).json(result.slice(0,4));
                    
                }
            
        });

    }
}