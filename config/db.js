const mysql = require('mysql');
const bodyParser = require('body-parser');

var mysqlConnection = mysql.createConnection({ 
    password: '',
    user: 'root',
    database: 'bilsportdb',
    host: 'localhost',
    multipleStatements: true,
    dateStrings: true

});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection Successfull');
    else
        console.log('DB connection failed');
});


module.exports = mysqlConnection;