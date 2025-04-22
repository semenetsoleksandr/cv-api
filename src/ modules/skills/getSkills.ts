import {SkillsBD} from "../../services/sqlite-db";

const db = new SkillsBD();

export const getSkillRoute =  async (req:any, res:any) => {
  const skills = await db.getSkillsFromBD();
  res.status(200).send(skills);
};
