import { Request, Response } from 'express';
import {db} from "../../services/sqlite-db";
import {IMessage} from "../../services/types";


export const getMessagesRoute = async (req: Request, res: Response) => {
    const message: IMessage[] = await db.getFromBD<IMessage>(db.tableMessages);
    res.status(200).send(message);
};
