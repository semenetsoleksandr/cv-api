import { Request, Response } from 'express';
import {db} from "../../services/sqlite-db";

export const removeSkillRoute = async (req:Request , res:Response) => {
    await db.delIdFromDB(req.params.id);
    res.sendStatus(204);
};
