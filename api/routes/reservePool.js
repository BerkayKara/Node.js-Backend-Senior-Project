const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");

function isTaken(bilkentId,poolId){
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `bilsportdb`.`reservepool` WHERE `bilkentId` = ? AND `poolId` = ?;";
        mysqlConnection.query(sql, [bilkentId,poolId], (err, rows, fields) => {
            if (rows.length > 0){
                reject(-1);  
            }
            else{
                resolve(10);
            }
        });
    });
}


function checkQuota(poolId) {
    var quota ;
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `bilsportdb`.`pool` WHERE `id` = ?;";
        mysqlConnection.query(sql, [poolId], (err, rows, fields) => {
            if (rows[0].quota > 0){
                quota = rows[0].quota - 1;
                var sql = "UPDATE `bilsportdb`.`pool` SET `quota` = ? WHERE `id` = ?;";
                mysqlConnection.query(sql, [quota, poolId], (err, rows, fields) => {
                    if (!err){
                        resolve(10);
                    }
                    else{
                        console.log(err);
                        reject(-1);
                    }
                });
            }
            else{
                reject(-1);
            }
        });
    });
}


router.get('/', (req, res) => {
    mysqlConnection.query("SELECT * FROM reservepool", (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.get('/:bilkentId', (req, res) => {
    mysqlConnection.query("SELECT * FROM reservepool WHERE bilkentId = ?", [req.params.bilkentId], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.delete('/:id', (req, res) => {
    mysqlConnection.query("DELETE FROM reservepool  WHERE id = ?", [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});

router.post('/', (req, res) => {
    let participant = req.body;
    let checkTaken = isTaken(participant.bilkentId, participant.poolId);
    let quotaCheck = checkQuota(participant.poolId);

    quotaCheck.then((value) => {
        checkTaken.then((value) => {
            var sql = "INSERT INTO `bilsportdb`.`reservepool`(`bilkentId`, `poolId`) VALUES  (?,?);";
            mysqlConnection.query(sql, [participant.bilkentId, participant.poolId], (err, rows, fields) => {
                if (!err)
                     res.send('Inserted participant id: ' + participant.bilkentId);
                else
                    console.log(err);
            });
        }).catch((error) => {
            res.send("You have already taken this pool reservation");
        });
    }).catch((error) => {
        res.send("Quota is full");
    });
});

module.exports = router;