import { Request, Response } from 'express';
import {db} from "../../services/sqlite-db";


export const getMessagesRoute = async (req: Request, res: Response) => {
    const message = await db.getMessagessFromBD();
    res.status(200).send(message);
};
