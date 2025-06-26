import { Request, Response } from 'express';
import { db } from '../../services/sqlite-db';

export const createMessageRoute = async (req: Request, res: Response) => {
    const newMessage = await db.addMessageToBD(req.body.username, req.body.email, req.body.message);
    res.status(201).json(newMessage);
};
