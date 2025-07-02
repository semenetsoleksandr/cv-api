import { Request, Response } from 'express';
import {db} from "../../services/sqlite-db";
import {ISkill} from "../../services/types";

export const getSkillRoute = async (req: Request, res: Response) => {
    const skills: ISkill[] = await db.getFromBD<ISkill>(db.tableSkills);
    res.status(200).send(skills);
};
