import {Database} from 'sqlite3';
import {promisify} from 'node:util';
import {IMessage, ISkill} from './types';

export class CvDB {
    db: Database;
    runQuery: (sql: string, params?: object | any[]) => Promise<void>;
    allQuery: <T> (sql: string, params?: any[]) => Promise<T[]>;
    tableSkills: string = 'skillsDB';
    tableMessages: string = "messagesDB"

    constructor() {
        this.db = new Database('../CV.db', (err) => {
            if (err) {
                console.log(err.message);
            }
            console.log('connect');
        });
        this.runQuery = promisify(this.db.run.bind(this.db));
        this.allQuery = promisify(this.db.all.bind(this.db)) as <T>(
            sql: string,
            params?: string[]
        ) => Promise<T[]>;
        this.init();
    }


    async init() {
        await this.runQuery(
            `CREATE TABLE IF NOT EXISTS ${this.tableSkills}
             (
                 id
                 INTEGER
                 PRIMARY
                 KEY
                 AUTOINCREMENT,
                 skill
                 TEXT
             )`,
        );
        await this.runQuery(
            `CREATE TABLE IF NOT EXISTS ${this.tableMessages}
             (
                 id
                 INTEGER
                 PRIMARY
                 KEY
                 AUTOINCREMENT,
                 username
                 TEXT,
                 email
                 TEXT,
                 message
                 TEXT
             )`,
        );
    }


    async getFromBD<T>(tableName: string): Promise<T[]> {
        try {
            return await this.allQuery<T>(`SELECT *
                                           FROM ${tableName}
            `, []);
        } catch (err) {
            console.log((err as Error).message);
            return [];
        }
    }

    async addDataToBD<T>(tableName: string, columns: string[], values: string[]): Promise<T | undefined> {
        try {
            const colList = columns.join(',')
            const placeholders = columns.map(i => '?').join(',')
            // unfortunately we can't use promisify to be able to access this.lastID property in result :(
            return new Promise((resolve, reject) => {
                this.db.run(
                    `INSERT INTO ${tableName} (${colList})
                     VALUES (${placeholders})`,
                    values,
                    function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            const result: any = {id: this.lastID};
                            columns.forEach((col, ind) => {
                                result[col] = values[ind]
                            })
                            resolve(result as T);// Return inserted object with ID
                        }
                    },
                );
            });
        } catch (err) {
            console.log((err as Error).message);
        }
    }


    async delIdFromDB<T>(tableName: string, id: T): Promise<void> {
        try {
            return await this.runQuery(`DELETE
                                        FROM ${tableName}
                                        WHERE id = ?`, [id]);
        } catch (err) {
            console.log((err as Error).message);
        }
    }

    async patchSkill<T>(id: number | string, skill: string): Promise<void> {
        try {
            return await this.runQuery(`UPDATE ${this.tableSkills}
                                        SET skill = ?
                                        WHERE id = ?`, [skill, id]);
        } catch (err) {
            console.log((err as Error).message);
        }
    }
}

export const db = new CvDB();
