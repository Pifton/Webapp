const express = require('express')
const { Pool } = require('pg');
const app = express()
const port = 3000

const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://rayane1:Sangoku93@localhost:5432/patissierDB')

app.use(express.json());

db.one('SELECT $1 AS value', 123)
    .then((data) => {
    console.log('DATA:', data.value)
    })
    .catch((error) => {
    console.log('ERROR:', error)
})

/*db.one('SELECT COUNT(*)::int FROM "User"').then((data) => {
    console.log('DATA test:', data.count)
    for (let i = 1; i <= data.count ; i++) {
        console.log(i);
        db.one(`SELECT * FROM "User" WHERE "ID" = ${i}`)
    }
    })
    .catch((error) => {
    console.log('ERROR:', error)
})*/

db.any('SELECT * FROM "User"').then((users) => {
    console.log('DATA test:', users.length);
    for (let i = 0; i <= users.length ; i++) {
        console.log(users[i]);
    }
    })
    .catch((error) => {
    console.log('ERROR:', error)
})

app.get('/users', (req, res) =>{
    db.any('SELECT * FROM "User"').then((users) => {
        res.json({
            message: `${users.length} résultat récupéré`,
            data: users,
        });
    })
    .catch((error) => {
        res.status(500).json({
            error: error.message,
        });
    });
});

app.post('/users/register', (req, res) =>{
    const {mail, password, role} = req.body;

    db.any('INSERT INTO "User" (mail, password, role) VALUES ($1, $2, $3)', [mail, password, role])
        .then(() => {
            res.json({
                message: `résultat récupéré`,
                data: {mail, password, role},
            }); 
    })
    .catch((error) => {
        res.status(500).json({
            error: error.message,
        });
    });
});
app.post('/users/login', (req, res) =>{
    const {mail, password} = req.body;

    db.any('INSERT INTO "User" (mail, password, role) VALUES ($1, $2, $3)', [mail, password, role])
        .then(() => {
            res.json({
                message: `résultat récupéré`,
                data: {mail, password, role},
            }); 
    })
    .catch((error) => {
        res.status(500).json({
            error: error.message,
        });
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})



/*const pool = new Pool({
    user: 'rayane1',
    host: 'localhost',
    database: 'patissierDB',
    password: 'Sangoku93',
    port: 5432,
  });
  */

/*app.get('/users', async (req, res) => {
try {
    const query = 'SELECT * FROM "Users";';
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
} catch (err) {
    console.error(err);
    res.status(500).send('failed');
}
});*/
/*
app.use(express.json());
async function createUserTable() {
    try{
        const query =`
            CREATE TABLE IF NOT EXISTS Hello(
                id SERIAL PRIMARY KEY,
                mail TEXT,
                password TEXT,
                role_c role
            );
        `;
        await pool.query(query);
        console.log('User table created');
        } 
    catch (err) {
    console.error(err);
    console.error('User table creation failed');
    }
}
*
createUserTable();
*/


  /*
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})*/
