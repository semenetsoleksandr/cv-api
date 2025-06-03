import {db} from "../../services/sqlite-db";

export const patchSkillRoute = async (req: any, res: any) => {
    const editSkill = await db.patchSkill(req.params.id, req.body.skill);
    res.sendStatus(200).json(editSkill)
}
