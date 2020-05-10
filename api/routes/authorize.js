const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");

//authorize an account as admin
router.put('/', (req, res) => {
    const status = "admin"
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