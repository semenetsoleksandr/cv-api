import {Request, Response} from "express";

import {db} from "../../../services/sqlite-db";
import {ISkill} from "../../../services/types";

export const createSkillRoute = async (req: Request, res: Response) => {
    try {
        const column = ["skill"]
        const newSkill = await db.addDataToBD<ISkill>(db.tableSkills, column, [req.body.skill]);
        res.status(201).json(newSkill);
    } catch (error) {
        res.status(500).json({error: "Failed to create skill"})
    }

};
