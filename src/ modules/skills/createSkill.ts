import { Request, Response } from 'express';

import {SkillsBD} from "../../services/sqlite-db";

import {db} from "../../services/sqlite-db";

export const createSkillRoute = async (req: Request, res: Response) => {
    const newSkill = await db.addSkillToBD(req.body.skill);
    res.status(201).json(newSkill);
};
