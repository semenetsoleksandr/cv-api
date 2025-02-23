import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('skills.db', (err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('connect')
})

// function createTable() {
//     db.run("CREATE TABLE skillsBD (id INT PRIMARY KEY, skill TEXT)", (err) => {
//         if (err) {
//             console.log(err.message);
//         }
//         console.log('Create table')
//     })
// }

export function addSkillToBD(newId, newsSill) {
    db.run("INSERT INTO skillsBD (id, skill) VALUES (?,?)", [newId, newsSill], (err) => {
        if (err) {
            console.log(err.message)
        }
        console.log('add skill')
    })
}

export function delIdFromDB(id) {
    db.run('DELETE FROM skillsBD WHERE id = ?', id, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('del skill');
    });
}


export function getSkillsFromBD() {
    return new Promise((resolve, _reject) => {
        db.all('SELECT * FROM skillsBD', [], (err, rows) => {
            if (err) {
                console.log(err.message);
            }
            const i = []
            rows.forEach((row) => {
                i.push(row)
            })
            resolve(i)
        })
    })
}

// export function closeBD() {
//     db.close((err) => {
//         if (err) {
//             console.log(err.message)
//         }
//         console.log('disconnect from db')
//     })
// }

