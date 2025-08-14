import { Request, Response } from "express";
import {db} from "../../../services/sqlite-db";
import {IMessage} from "../../../services/types";


export const getMessagesRoute = async (req: Request, res: Response) => {
    try {
        const message: IMessage[] = await db.getFromDB<IMessage>(db.tableMessages);
        res.status(200).send(message);
    } catch (error) {
        res.status(500).json({error: "Failed to get messages"})
    }
};
