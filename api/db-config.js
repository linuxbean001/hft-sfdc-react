const pg = require('pg');
const url = 'postgres://rmrgzdnnfgifnq:148fa5eaf9894bc2f63b7b52e26b41bb22f47804b390b5f8903b0d151a8d891a@ec2-54-225-110-152.compute-1.amazonaws.com:5432/df6hp68fr5hino';

const pool = new pg.Pool({
    connectionString: url,
    ssl: true
});

module.exports = pool;