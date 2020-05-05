const express = require("express");
const router = express.Router();


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

//Insert an account (when admin approves an unregistered account)
router.post('/', (req, res) => {
    var sql = "SET @name = ?; SET @surname = ?; SET @bilkentId = ?; SET @email = ?; SET @password = ?; SET @status = ?; CALL insertAccountProcedure(@name, @surname, @bilkentId, @email, @password, @status);";
    mysqlConnection.query(sql, [req.body.name, req.body.surname, req.body.bilkentId, req.body.email, req.body.password, req.body.status], (err, rows, fields) => {
        if (!err)
            res.send('Inserted account id: ' + req.body.bilkentId);
        else
            res.send(err.sqlMessage);
        
        console.log(err);
    });
});

module.exports = router;