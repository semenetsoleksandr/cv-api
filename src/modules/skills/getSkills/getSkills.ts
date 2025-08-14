import {Request, Response} from "express";
import {db} from "../../../services/sqlite-db";
import {ISkill} from "../../../services/types";

export const getSkillRoute = async (req: Request, res: Response) => {
    try {
        const skills: ISkill[] = await db.getFromDB<ISkill>(db.tableSkills);
        res.status(200).send(skills);
    } catch (error) {
        res.status(500).json({error: "Failed to get skills"})
    }

};
