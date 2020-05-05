const express = require("express");
const router = express.Router();
const session = require('express-session');

router.use(session({
    secret: 'secret', 
    resave: false,
    saveUninitialized: true
}));


const mysql = require('mysql');



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

// Login
router.post('/', function (req, res) {
    console.log(req.body);
    let bilkentId = req.body.user.bilkentId;
    let password = req.body.user.password;
    mysqlConnection.query('SELECT * FROM account WHERE bilkentId = ? AND password = ?', [bilkentId, password], (err, rows, fields) => {
        if (!err) {
            if (rows.length > 0){
                req.session.bilkentId = bilkentId;
                res.send(rows);
            }    
            else
                res.send(404);
        }
        else {
            res.send(err);
        }
    });
}
);

module.exports = router;