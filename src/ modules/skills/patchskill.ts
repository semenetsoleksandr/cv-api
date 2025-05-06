import {SkillsBD} from "../../services/sqlite-db";

const db = new SkillsBD();

export const patchSkillRoute = async (req: any, res: any) => {
    const editSkill = await db.patchSkill(req.params.id, req.body.skill);
    res.sendStatus(200).json(editSkill)
}
