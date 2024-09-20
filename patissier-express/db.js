const pgp = require('pg-promise')();
const db = pgp('postgres://rayane:123456@localhost:5432/patisseriedb');

module.exports = db;