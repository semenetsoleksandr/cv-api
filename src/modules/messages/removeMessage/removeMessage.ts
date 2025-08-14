import { Request, Response } from "express";
import {db} from "../../../services/sqlite-db";

export const removeMessageRoute = async (req:Request , res:Response) => {
    try{
        await db.delIdFromDB(db.tableMessages, req.params.id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({error: "Failed to remove message"})
    }

};
