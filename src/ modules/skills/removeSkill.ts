import {SkillsBD} from "../../services/sqlite-db";

const db = new SkillsBD()

export const removeSkillRoute = async (req:any , res:any) => {
    await db.delIdFromDB(req.params.id);
    res.sendStatus(204);
};
