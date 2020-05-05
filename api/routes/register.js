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



//Get all unregistered accounts
router.get('/',(req,res) => {
    mysqlConnection.query('SELECT * FROM register', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
    
});

//Get an unregistered account
router.get('/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM register WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

//Insert an unregistered account (when user clicks register button) 
router.post('/', (req, res) => {
    var sql = "SET @name = ?; SET @surname = ?; SET @bilkentId = ?; SET @email = ?; SET @password = ?; SET @status = ?; CALL insertRegisterProcedure(@name, @surname, @bilkentId, @email, @password, @status);";
    mysqlConnection.query(sql, [req.body.name, req.body.surname, req.body.bilkentId, req.body.email, req.body.password, req.body.status], (err, rows, fields) => {
        if (!err)
            res.send('Inserted unregistered account bilkent id: ' + req.body.bilkentId);
        else
            res.send(err.sqlMessage);
        console.log(err);
        
    });
});

module.exports = router;