const http = require('http');
const app = require('./app');
//const dbConfig = require('./api/db-config');
//const mongoose = require('mongoose');
//const pg = require('pg');

const path = require('path');

const port = process.env.PORT || 3300;

//mongoose.connect(dbConfig.url,  { useNewUrlParser: true })
/* const client = new pg.Client({
    connectionString: dbConfig.url,
    ssl: true
}); 

client.connect()
    .then(() => {
        console.log("Connected to Database");
        client.query('CREATE TABLE users (id SERIAL PRIMARY KEY, fName VARCHAR(40) NOT NULL, lName VARCHAR(40), email VARCHAR(100) UNIQUE NOT NULL, cell VARCHAR(40) UNIQUE NOT NULL,profession VARCHAR(40),address VARCHAR(1000),address2 VARCHAR(1000),city VARCHAR(50), state VARCHAR(50),zip INTEGER,username VARCHAR(100),created TIMESTAMP NOT NULL)', (err, res) => {
            console.log(res);
            if (err) {
                console.log(err);
            }
        });
    }).catch(err => {
        console.log(err);
        process.exit();
    });*/



const server = http.createServer(app);
server.listen(port, () => {
    console.log("xxxxxxx xxxxxxxxx server connnected to the port " + port);
})