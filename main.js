import cors from 'cors';
import express from 'express';
import {addSkillToBD, getSkillsFromBD, delIdFromDB} from "./sql.js";

const app = express();

app.use(cors()); // Разрешает все запросы

const skills = await getSkillsFromBD()

async function main() {
    app.use(express.json())
    app.get('/skills/', (req, res) => {
        res.send(skills).status(200)
    })
    app.post('/skills', (req, res) => {
        const {skill} = req.body;
        let lastId = getLastId() + 1
        let newSkill = {"id": lastId, "skill": skill}
        let newSkillForDB = Object.values(req.body).toString()
        addSkillToBD(lastId, newSkillForDB)
        skills.push(newSkill);
        res.status(201).json({skills});
    })
    app.delete('/skills/:id', (req, res) => {
        const id = req.params.id
        delIdFromDB(id)
        for (let i in skills) {
            if (skills[i].id == id) {
                skills.splice(i, 1)
            }
        }
        res.send(skills)

    })
    app.listen(8080, () => {
        console.log('server is run on port 8080')
    })
}

function getLastId() {
    let values = []
    for (let i in skills) {
        values.push(skills[i].id)
    }
    return Math.max(...values)
}

main().catch(console.error);
getLastId()
