const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");

function isTaken(bilkentId,courseId){
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `bilsportdb`.`coursestaken` WHERE `bilkentId` = ? AND `courseId` = ?;";
        mysqlConnection.query(sql, [bilkentId,courseId], (err, rows, fields) => {
            if (rows.length > 0){
                reject(-1);  
            }
            else{
                resolve(10);
            }
        });
    });
}


function checkQuota(courseId) {
    var quota ;
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `bilsportdb`.`course` WHERE `id` = ?;";
        mysqlConnection.query(sql, [courseId], (err, rows, fields) => {
            if (rows[0].quota > 0){
                quota = rows[0].quota - 1;
                var sql = "UPDATE `bilsportdb`.`course` SET `quota` = ? WHERE `id` = ?;";
                mysqlConnection.query(sql, [quota, courseId], (err, rows, fields) => {
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
    var dbName = req.body.name + req.body.campus + req.body.teamquota;
    mysqlConnection.query("SELECT * FROM coursestaken", (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.get('/:bilkentId', (req, res) => {
    var dbName = req.body.name + req.body.campus + req.body.teamquota;
    mysqlConnection.query("SELECT * FROM coursestaken WHERE bilkentId = ?", [req.params.bilkentId], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.delete('/:id', (req, res) => {
    var dbName = req.body.name + req.body.campus;
    mysqlConnection.query("DELETE FROM coursestaken  WHERE id = ?", [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});

router.post('/', (req, res) => {
    let participant = req.body;
    let checkTaken = isTaken(participant.bilkentId, participant.courseId);
    let quotaCheck = checkQuota(participant.courseId);

    quotaCheck.then((value) => {
        checkTaken.then((value) => {
            var sql = "INSERT INTO `bilsportdb`.`coursestaken`(`bilkentId`, `courseId`) VALUES  (?,?);";
            mysqlConnection.query(sql, [participant.bilkentId, participant.courseId], (err, rows, fields) => {
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