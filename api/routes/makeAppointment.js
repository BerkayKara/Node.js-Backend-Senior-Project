const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");

function isTaken(bilkentId,appointmentId){
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `bilsportdb`.`myappointment` WHERE `bilkentId` = ? AND `appointmentId` = ?;";
        mysqlConnection.query(sql, [bilkentId,appointmentId], (err, rows, fields) => {
            if (rows.length > 0){
                reject(-1);  
            }
            else{
                resolve(10);
            }
        });
    });
}

function checkQuota(id) {
    return new Promise((resolve, reject) => {
        var sql = "UPDATE `bilsportdb`.`appointment` SET `available` = ? WHERE `id` = ?;";
        mysqlConnection.query(sql, [false, id], (err, rows, fields) => {
            if (!err){
                resolve(10);
            }
            else{
                console.log(err);
                reject(-1);
            }
            });
    });
}

router.get('/', (req, res) => {
    var dbName = req.body.name + req.body.campus + req.body.teamquota;
    mysqlConnection.query("SELECT * FROM myappointment", (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.get('/:bilkentId', (req, res) => {
    mysqlConnection.query("SELECT * FROM myappointment WHERE bilkentId = ?", [req.params.bilkentId], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.delete('/:id', (req, res) => {
    mysqlConnection.query("DELETE FROM myappointment WHERE id = ?", [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});

router.post('/', (req, res) => {
    let participant = req.body;
    let checkTaken = isTaken(participant.bilkentId, participant.appointmentId);
    let quotaCheck = checkQuota(participant.appointmentId);

    quotaCheck.then((value) => {
        checkTaken.then((value) => {
            var sql = "INSERT INTO `bilsportdb`.`myappointment`(`bilkentId`, `appointmentId`,`name`,`place`,`time`)VALUES(?,?,?,?,?);";
            mysqlConnection.query(sql, [participant.bilkentId, participant.appointmentId, participant.name, participant.place, participant.time], (err, rows, fields) => {
                if (!err)
                     res.send('Inserted participant id: ' + participant.bilkentId);
                else
                    console.log(err);
            });
        }).catch((error) => {
            res.send("You have already taken this course");
        });
    }).catch((error) => {
        res.send("Course Quota is full");
    });
});

module.exports = router;