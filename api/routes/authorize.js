const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");




router.get('/', (req, res) => {
    const status = "staff"
    var sql = "SELECT * from `bilsportdb`.`account` where status =?;";
    mysqlConnection.query(sql, [status], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            res.send(err);
        
        console.log(err);
    });
});

//authorize an account as admin
router.put('/', (req, res) => {
    const status = "admin"
    console.log(req.body);
    var sql = "UPDATE `bilsportdb`.`account` SET `status` = ? WHERE `bilkentId` = ? AND `email` = ?;";
    mysqlConnection.query(sql, [status, req.body.bilkentId, req.body.email], (err, rows, fields) => {
        if (!err)
            res.send('New Admin account id: ' + req.body.bilkentId);
        else
            res.send(err);
        
        console.log(err);
    });
});



module.exports = router;