import {SkillsBD} from "../../services/sqlite-db";

const db = new SkillsBD()

export const createSkillRoute = async (req: any, res: any) => {
    const newSkill = await db.addSkillToBD(req.body.skill);
    res.status(201).json(newSkill);
};
