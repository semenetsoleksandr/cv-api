import sqlite3 from 'sqlite3';
import { promisify } from 'node:util'

export class SkillsDb {
    db;
    allQuery;
    runQuery;
    tableName = 'skillsDB';

    constructor() {
        this.db = new sqlite3.Database('skills.db', (err) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log('connect');
            }
        });
        this.allQuery = promisify(this.db.all.bind(this.db));
        this.runQuery = promisify(this.db.run.bind(this.db));
        this.init();
    }

    async init() {
       await this.runQuery(
          `CREATE TABLE IF NOT EXISTS ${this.tableName} (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             skill TEXT NOT NULL
         )`
      );
    }

    async getSkills() {
        try {
            return await this.allQuery(`SELECT * FROM ${this.tableName}`, []);
        } catch (err) {
            console.log(err.message);
            return [];
        }
    }

    async addSkill(skill) {
        try {
            // unfortunately we can't use promisify to be able to access this.lastID property in result :(
            return new Promise((resolve, reject) => {
                this.db.run(
                    `INSERT INTO ${this.tableName} (skill) VALUES (?)`,
                    [skill],
                    function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({ id: this.lastID, skill }); // Return inserted object with ID
                        }
                    }
                );
            });
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }

    async deleteSkill(id) {
        try {
            return await this.runQuery(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
        } catch (err) {
            console.log(err.message);
        }
    }
}
