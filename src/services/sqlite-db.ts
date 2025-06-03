import { Database } from 'sqlite3';
import { promisify } from 'node:util';
import { ISkill } from './types';

export class SkillsBD {
    db: Database;
    runQuery: (sql: string, params?: object | any[]) => Promise<void>;
    allQuery: (sql: string, params?: object | any[]) => Promise<ISkill[]>;
    tableName: string = 'skillsBD';

    constructor() {
        this.db = new Database('../skills.db', (err) => {
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
        await this.runQuery(
            `CREATE TABLE IF NOT EXISTS ${this.tableName}
             (
                 id
                 INTEGER
                 PRIMARY
                 KEY
                 AUTOINCREMENT,
                 skill
                 TEXT
                 NOT
                 NULL
             )`,
        );
    }

    async getSkillsFromBD(): Promise<ISkill[]> {
        try {
            return await this.allQuery(`SELECT *
                                        FROM ${this.tableName}`, []);
        } catch (err) {
            console.log((err as Error).message);
            return [];
        }
    }

    async addSkillToBD(skill: string): Promise<ISkill | undefined> {
        try {
            // unfortunately we can't use promisify to be able to access this.lastID property in result :(
            return new Promise((resolve, reject) => {
                this.db.run(
                    `INSERT INTO ${this.tableName} (skill)
                     VALUES (?)`,
                    [skill],
                    function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({ id: this.lastID, skill }); // Return inserted object with ID
                        }
                    },
                );
            });
        } catch (err) {
            console.log((err as Error).message);
        }
    }

    async delIdFromDB<T>(id: T): Promise<void> {
        try {
            return await this.runQuery(`DELETE
                                        FROM ${this.tableName}
                                        WHERE id = ?`, [id]);
        } catch (err) {
            console.log((err as Error).message);
        }
    }

    async patchSkill(id: number, skill: string) {
        try {
            return await this.runQuery(`UPDATE ${this.tableName}
                                        SET skill = ?
                                        WHERE id = ?`, [skill, id]);
        } catch (err) {
            console.log((err as Error).message);
        }
    }
}

export const db = new SkillsBD();
