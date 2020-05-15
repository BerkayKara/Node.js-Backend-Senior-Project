const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");

function isTaken(bilkentId,footballId){
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `bilsportdb`.`reservefootball` WHERE `bilkentId` = ? AND `footballId` = ?;";
        mysqlConnection.query(sql, [bilkentId,footballId], (err, rows, fields) => {
            if (rows.length > 0){
                reject(-1);  
            }
            else{
                resolve(10);
            }
        });
    });
}


function checkAvailable(footballId) {
    var available ;
    return new Promise((resolve, reject) => {
        var sql = "SELECT available FROM `bilsportdb`.`football` WHERE `id` = ?;";
        mysqlConnection.query(sql, [footballId], (err, rows, fields) => {
            if (rows[0] != 0){
                available = false;
                var sql = "UPDATE `bilsportdb`.`football` SET `available` = ? WHERE `id` = ?;";
                mysqlConnection.query(sql, [available, footballId], (err, rows, fields) => {
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
    mysqlConnection.query("SELECT * FROM reservefootball", (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.get('/:bilkentId', (req, res) => {
    mysqlConnection.query("SELECT * FROM reservefootball WHERE bilkentId = ?", [req.params.bilkentId], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.delete('/:id', (req, res) => {
    mysqlConnection.query("DELETE FROM reservefootball  WHERE id = ?", [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});

router.post('/', (req, res) => {
    let participant = req.body;
    let checkTaken = isTaken(participant.bilkentId, participant.footballId);
    let availableCheck = checkAvailable(participant.footballId);

    availableCheck.then((value) => {
        checkTaken.then((value) => {
            var sql = "INSERT INTO `bilsportdb`.`reservefootball`(`bilkentId`, `footballId`) VALUES  (?,?);";
            mysqlConnection.query(sql, [participant.bilkentId, participant.footballId], (err, rows, fields) => {
                if (!err)
                     res.send('Inserted participant id: ' + participant.bilkentId);
                else
                    console.log(err);
            });
        }).catch((error) => {
            res.send("You have already taken this football reservation");
        });
    }).catch((error) => {
        res.send("Court is full");
    });
});

module.exports = router;