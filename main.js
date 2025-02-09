import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors()); // Разрешает все запросы
let skills = [
    {"id": 1, "skill": "HTML"},
    {"id": 2, "skill": "CSS"},
    {"id": 3, "skill": "JavaScript"},
    {"id": 4, "skill": "Git"},
]

let lastId = skills.length + 1

async function main() {
    app.use(express.json())
    app.get('/skills/', (req, res) => {
        res.send(skills).status(200)
    })
    app.post('/skills', (req, res) => {
        const {skill} = req.body;
        let newSkill = {"id": lastId, "skill": skill}
        skills.push(newSkill);
        res.status(201).json({skills});
        lastId += 1;
    })
    app.delete('/skills/:id', (req, res) => {
        const id = req.params.id
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

//function addNewSkill(id,skill) {
// let newId = skills.length + 1
// let newSkill = {"id": id, "skill": skill}
// skills.push((newSkill))
//}

main()

