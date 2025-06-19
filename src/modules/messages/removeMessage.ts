import {db} from "../../services/sqlite-db";

export const removeMessageRoute = async (req:any , res:any) => {
    await db.delIdFromDB(req.params.id);
    res.sendStatus(204);
};
