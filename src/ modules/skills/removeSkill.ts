import {db} from "../../services/sqlite-db";

export const removeSkillRoute = async (req:any , res:any) => {
    await db.delIdFromDB(req.params.id);
    res.sendStatus(204);
};
