import cors from 'cors';
import express from 'express';
import { SkillsBD } from "./sql.js";
const app = express();
app.use(cors());
const db = new SkillsBD();
async function main() {
    app.use(express.json());
    app.get('/skills/', async (req, res) => {
        const skills = await db.getSkillsFromBD();
        res.send(skills).status(200);
    });
    app.post('/skills', async (req, res) => {
        const newSkill = await db.addSkillToBD(req.body.skill);
        res.status(201).json(newSkill);
    });
    app.delete('/skills/:id', async (req, res) => {
        await db.delIdFromDB(req.params.id);
        res.sendStatus(204);
    });
    app.listen(8080, () => {
        console.log('server is run on port 8080');
    });
}
main().catch(console.error);
