import sqlite3 from 'sqlite3';
import { promisify } from 'node:util';
export class SkillsBD {
    constructor() {
        this.tableName = 'skillsBD';
        this.db = new sqlite3.Database('../skills.db', (err) => {
            if (err) {
                console.log(err.message);
            }
            console.log('connect');
        });
        this.runQuery = promisify(this.db.run.bind(this.db));
        this.allQuery = promisify(this.db.all.bind(this.db));
        this.init();
        //this.delTable()
    }
    async init() {
        await this.runQuery(`CREATE TABLE IF NOT EXISTS ${this.tableName}
             (
                 id    INTEGER PRIMARY KEY AUTOINCREMENT,
                 skill TEXT NOT NULL
             )`);
    }
    async getSkillsFromBD() {
        try {
            return await this.allQuery(`SELECT *
                                        FROM ${this.tableName}`, []);
        }
        catch (err) {
            console.log(err.message);
            return [];
        }
    }
    async addSkillToBD(skill) {
        try {
            await this.runQuery(`INSERT INTO ${this.tableName} (skill)
                                 VALUES (?)`, [skill]);
            return { id: id.lastID, skill };
        }
        catch (err) {
            console.log(err.message);
        }
    }
    async delIdFromDB(id) {
        try {
            return await this.runQuery(`DELETE
                                        FROM ${this.tableName}
                                        WHERE id = ?`, [id]);
        }
        catch (err) {
            console.log(err.message);
        }
    }
}
