const express = require("express");
const router = express.Router();
const session = require('express-session');
const mysqlConnection = require("../../config/db");

router.use(session({
    secret: 'secret', 
    resave: false,
    saveUninitialized: true
}));

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