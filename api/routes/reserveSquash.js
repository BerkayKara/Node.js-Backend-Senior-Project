const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");

function isTaken(bilkentId,squashId){
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `bilsportdb`.`reservesquash` WHERE `bilkentId` = ? AND `squashId` = ?;";
        mysqlConnection.query(sql, [bilkentId,squashId], (err, rows, fields) => {
            if (rows.length > 0){
                reject(-1);  
            }
            else{
                resolve(10);
            }
        });
    });
}


function checkAvailable(squashId) {
    var available ;
    return new Promise((resolve, reject) => {
        var sql = "SELECT available FROM `bilsportdb`.`squash` WHERE `id` = ?;";
        mysqlConnection.query(sql, [squashId], (err, rows, fields) => {
            if (rows[0] != 0){
                available = false;
                var sql = "UPDATE `bilsportdb`.`squash` SET `available` = ? WHERE `id` = ?;";
                mysqlConnection.query(sql, [available, squashId], (err, rows, fields) => {
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
    mysqlConnection.query("SELECT * FROM reservesquash", (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.get('/:bilkentId', (req, res) => {
    mysqlConnection.query("SELECT * FROM reservesquash WHERE bilkentId = ?", [req.params.bilkentId], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.delete('/:id', (req, res) => {
    mysqlConnection.query("DELETE FROM reservesquash  WHERE id = ?", [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});

router.post('/', (req, res) => {
    let participant = req.body;
    let checkTaken = isTaken(participant.bilkentId, participant.squashId);
    let availableCheck = checkAvailable(participant.squashId);

    availableCheck.then((value) => {
        checkTaken.then((value) => {
            var sql = "INSERT INTO `bilsportdb`.`reservesquash`(`bilkentId`, `squashId`) VALUES  (?,?);";
            mysqlConnection.query(sql, [participant.bilkentId, participant.squashId], (err, rows, fields) => {
                if (!err)
                     res.send('Inserted participant id: ' + participant.bilkentId);
                else
                    console.log(err);
            });
        }).catch((error) => {
            res.sendStatus(403)
        });
    }).catch((error) => {
        res.sendStatus(403)
    });
});

module.exports = router;