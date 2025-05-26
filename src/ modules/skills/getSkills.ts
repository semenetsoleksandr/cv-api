import {SkillsBD} from "../../services/sqlite-db";

import {db} from "../../services/sqlite-db";

export const getSkillRoute = async (req: any, res: any) => {
    const skills = await db.getSkillsFromBD();
    res.status(200).send(skills);
};
