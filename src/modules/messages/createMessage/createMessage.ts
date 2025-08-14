import {Request, Response} from "express";
import {db} from "../../../services/sqlite-db";
import {IMessage} from "../../../services/types";

export const createMessageRoute = async (req: Request, res: Response) => {
    try {
        const columns = ["username", "email", "message"]
        const newMessage = await db.addDataToBD<IMessage>(db.tableMessages, columns, [req.body.username, req.body.email, req.body.message]);
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({error: "Failed to create message"})
    }
};
