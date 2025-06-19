import { Request, Response } from 'express';
import {db} from "../../services/sqlite-db";


export const getSkillRoute = async (req: Request, res: Response) => {
    const skills = await db.getSkillsFromBD();
    res.status(200).send(skills);
};
