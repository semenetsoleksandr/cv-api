import {Request, Response} from "express";
import {db} from "../../../services/sqlite-db";
import {ISkill} from "../../../services/types";

export const patchSkillRoute = async (req: Request, res: Response) => {
    try {
        const editSkill = await db.patchSkill<ISkill>(req.params.id, req.body.skill);
        res.sendStatus(200).json(editSkill)
    } catch (error) {
        res.status(500).json({error: "Failed to patch skill"})
    }

};
