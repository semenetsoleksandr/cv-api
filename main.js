import cors from 'cors';
import express from 'express';
import { SkillsDb } from './sql.js';

const app = express();

app.use(cors()); // Разрешает все запросы

const db = new SkillsDb();

async function main() {
    app.use(express.json());
    app.get('/skills', async (req, res) => {
        const skills = await db.getSkills();
        res.json({ skills });
    });
    app.post('/skills', async (req, res) => {
        const newSkill = await db.addSkill(req.body.skill);
        res.status(201).json(newSkill);
    });
    app.delete('/skills/:id', async (req, res) => {
        await db.deleteSkill(req.params.id);
        res.sendStatus(204);
    });
    app.listen(8080, () => {
        console.log('server is run on port 8080');
    });
}

main().catch(console.error);
