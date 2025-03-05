import sqlite3 from 'sqlite3';
import {promisify} from 'node:util'

export class SkillsBD {
    db;
    tableName = 'skillsBD'

    constructor(props) {
        this.db = new sqlite3.Database('skills.db', (err) => {
            if (err) {
                console.log(err.message);
            }
            console.log('connect')
        })
        this.init()
        //this.delTable()
    }


    async init() {
        await this.db.run(
            `CREATE TABLE IF NOT EXISTS skillsBD
             (
                 id    INTEGER PRIMARY KEY AUTOINCREMENT,
                 skill TEXT
             )`
        );
    }

    async delTable() {
        await this.db.run(
            `DROP TABLE skillsBD;`
        );
    }

    async addSkillToBD(newSkill) {
        try {
            const asyncRun = promisify(this.db.run).bind(this.db);
            await asyncRun('INSERT INTO skillsBD (skill) VALUES (?)', [newSkill])
            return {id: id.lastID, newSkill}
        } catch (err) {
            console.log('ttt')
        }
    }

    async delIdFromDB(id) {
        try {
            const asyncRun = promisify(this.db.run).bind(this.db)
            return await asyncRun('DELETE FROM skillsBD WHERE id = ?', [id])
        } catch (err) {
            console.log(err.message)
        }
    }

    async getSkillsFromBD() {
        try {
            const asyncAll = promisify(this.db.all).bind(this.db)
            return await asyncAll('SELECT * FROM skillsBD', [])
        } catch (err) {
            console.log(err.message)
        }

    }

}

