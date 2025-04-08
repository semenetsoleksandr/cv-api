import sqlite3, {Database} from 'sqlite3';
import {promisify} from 'node:util'

interface ISkill {
    id: string;
    skill: string;
}

type CreateSkillRequest = Omit<ISkill, 'id'>


export class SkillsBD {
    db:Database;
    runQuery: (sql: string) => Promise<void>
    allQuery: (sql: string) => Promise<ISkill[]>
    tableName:string = 'skillsBD'

    constructor() {
        this.db = new sqlite3.Database('../skills.db', (err) => {
            if (err) {
                console.log(err.message);
            }
            console.log('connect')
        })
        this.runQuery = promisify(this.db.run.bind(this.db))
        this.allQuery = promisify(this.db.all.bind(this.db))
        this.init()
        //this.delTable()
    }


    async init()  {
        await this.runQuery(
            `CREATE TABLE IF NOT EXISTS ${this.tableName}
             (
                 id    INTEGER PRIMARY KEY AUTOINCREMENT,
                 skill TEXT NOT NULL
             )`
        );
    }
    async getSkillsFromBD():Promise<ISkill[]>  {
        try {
            return await this.allQuery(`SELECT *
                                        FROM ${this.tableName}`,[])
        } catch (err) {
            console.log(err.message)
            return [];
        }
    }
    async addSkillToBD(skill: CreateSkillRequest ):Promise<ISkill| undefined>{
        try {
            await this.runQuery(`INSERT INTO ${this.tableName} (skill)
                                 VALUES (?)`, [skill])
            return {id: id.lastID, skill}
        } catch (err) {
            console.log(err.message)

        }
    }

    async delIdFromDB<T>(id:T): Promise<void> {
        try {
            return  await this.runQuery(`DELETE
                                        FROM ${this.tableName}
                                        WHERE id = ?`, [id])
        } catch (err) {
            console.log(err.message)
        }
    }
}

