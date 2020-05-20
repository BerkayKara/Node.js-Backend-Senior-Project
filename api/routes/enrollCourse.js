const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");

function isTaken(bilkentId,id){
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `bilsportdb`.`mycourse` WHERE `bilkentId` = ? AND `courseId` = ?;";
        mysqlConnection.query(sql, [bilkentId,id], (err, rows, fields) => {
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
        var q;
        var sql1 = "SELECT quota FROM `bilsportdb`.`course` where id = ?;";
        mysqlConnection.query(sql1, [id], (err, rows, fields) => {
            if (!err){
                q = rows[0].quota;
                console.log(q);
                q = q - 1;
                var sql = "UPDATE `bilsportdb`.`course` SET `quota` = ? WHERE `id` = ?;";
                mysqlConnection.query(sql, [q, id], (err, rows, fields) => {
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
                console.log(err);
            }
        });
    });
}


function checkStatus(bilkentId){
    return new Promise((resolve, reject) => {
        var q;
        var sql1 = "SELECT status FROM `bilsportdb`.`account` where bilkentId = ?;";
        mysqlConnection.query(sql1, [bilkentId], (err, rows, fields) => {
            if (!err){
                if(rows[0].status == "student"){
                    resolve(10);
                }
                else{
                    reject(-1);                   
                }
            }
            else{
                console.log(err);
            }
        });
    });
}


router.get('/', (req, res) => {
    var dbName = req.body.name + req.body.campus + req.body.teamquota;
    mysqlConnection.query("SELECT * FROM mycourse", (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.get('/:bilkentId', (req, res) => {
    mysqlConnection.query("SELECT * FROM mycourse WHERE bilkentId = ?", [req.params.bilkentId], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.delete('/:id', (req, res) => {
    mysqlConnection.query("DELETE FROM mycourse WHERE id = ?", [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});

router.post('/', (req, res) => {
    let participant = req.body;
    let checkTaken = isTaken(participant.bilkentId, participant.courseId);
    let quotaCheck = checkQuota(participant.courseId,participant.quota);
    let statusCheck = checkStatus(participant.bilkentId);

    statusCheck.then((value) => {
        quotaCheck.then((value) => {
            checkTaken.then((value) => {
                var sql = "INSERT INTO `bilsportdb`.`mycourse`(`bilkentId`,`courseId`,`name`,`instructor`,`schedule`,`level`)VALUES(?,?,?,?,?,?);";
                mysqlConnection.query(sql, [participant.bilkentId,participant.courseId, participant.name,participant.instructor,participant.schedule,participant.level], (err, rows, fields) => {
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

    }).catch((value)=>{
        var sql = "INSERT INTO `bilsportdb`.`payments`(`bilkentId`,`paymentId`,`courseId`) VALUES(?,?,?);";
        mysqlConnection.query(sql, [participant.bilkentId, participant.paymentId, participant.courseId], (err, rows, fields) => {
            if (!err){
                res.send("Please Pay for this course");
            }
            else{
                console.log(err);
            }
        });

    });  
});

module.exports = router;