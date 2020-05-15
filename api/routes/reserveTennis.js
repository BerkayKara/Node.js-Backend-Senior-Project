const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");

function isTaken(bilkentId,tennisId){
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `bilsportdb`.`reservetennis` WHERE `bilkentId` = ? AND `tennisId` = ?;";
        mysqlConnection.query(sql, [bilkentId,tennisId], (err, rows, fields) => {
            if (rows.length > 0){
                reject(-1);  
            }
            else{
                resolve(10);
            }
        });
    });
}


function checkAvailable(tennisId) {
    var available ;
    return new Promise((resolve, reject) => {
        var sql = "SELECT available FROM `bilsportdb`.`tennis` WHERE `id` = ?;";
        mysqlConnection.query(sql, [tennisId], (err, rows, fields) => {
            if (rows[0] != 0){
                available = false;
                var sql = "UPDATE `bilsportdb`.`tennis` SET `available` = ? WHERE `id` = ?;";
                mysqlConnection.query(sql, [available, tennisId], (err, rows, fields) => {
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
    mysqlConnection.query("SELECT * FROM reservetennis", (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.get('/:bilkentId', (req, res) => {
    mysqlConnection.query("SELECT * FROM reservetennis WHERE bilkentId = ?", [req.params.bilkentId], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.delete('/:id', (req, res) => {
    mysqlConnection.query("DELETE FROM reservetennis  WHERE id = ?", [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});

router.post('/', (req, res) => {
    let participant = req.body;
    let checkTaken = isTaken(participant.bilkentId, participant.tennisId);
    let availableCheck = checkAvailable(participant.tennisId);

    availableCheck.then((value) => {
        checkTaken.then((value) => {
            var sql = "INSERT INTO `bilsportdb`.`reservetennis`(`bilkentId`, `tennisId`) VALUES  (?,?);";
            mysqlConnection.query(sql, [participant.bilkentId, participant.tennisId], (err, rows, fields) => {
                if (!err)
                     res.send('Inserted participant id: ' + participant.bilkentId);
                else
                    console.log(err);
            });
        }).catch((error) => {
            res.send("You have already taken this tennis reservation");
        });
    }).catch((error) => {
        res.send("Court is full");
    });
});

module.exports = router;