const mysql = require('mysql');

const connection = mysql.createConnection({
     host : 'localhost',
     user: 'user',
     password: 'password',
     database: 'database'
});
module.exports = connection;