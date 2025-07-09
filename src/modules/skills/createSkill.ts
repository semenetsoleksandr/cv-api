import { Request, Response } from "express";

import { db } from "../../services/sqlite-db";
import {ISkill} from "../../services/types";

export const createSkillRoute = async (req: Request, res: Response) => {
    const column = ["skill"]
    const newSkill = await db.addDataToBD<ISkill>(db.tableSkills, column, [req.body.skill]);
    res.status(201).json(newSkill);
};
