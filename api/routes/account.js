const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");



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