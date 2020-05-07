const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../../config/db");

function checkEmail(email){
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `bilsportdb`.`t_basketball3` WHERE `email` = ?;";
        mysqlConnection.query(sql, [email], (err, rows, fields) => {
            if (rows.length > 0){
                console.log(rows.length);
                reject(-1);  
            }
            else{
                console.log(rows.length);
                resolve(10);
            }
        });
    });
}

function checkId(bilkentId){
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `bilsportdb`.`t_basketball3` WHERE `bilkentId` = ?;";
        mysqlConnection.query(sql, [bilkentId], (err, rows, fields) => {
            if (rows.length > 0){
                console.log(rows.length);
                reject(-1);  
            }
            else{
                console.log(rows.length);
                resolve(10);
            }
        });
    });
}

function checkTeamQuota(team) {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `bilsportdb`.`t_basketball3` WHERE `team` = ?;";
        mysqlConnection.query(sql, [team], (err, rows, fields) => {
            if (rows.length < 3){
                console.log(rows.length);
                resolve(10);
            }
            else{
                console.log(rows.length);
                reject(-1);
            }
        });
    });
}


router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM t_basketball3 ORDER BY team', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.get('/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM t_basketball3 WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.delete('/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM t_basketball3 WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});

router.post('/', (req, res) => {
    let participant = req.body;
    let quotaCheck = checkTeamQuota(req.body.team);
    let idCheck = checkId(req.body.bilkentId);
    let emailCheck = checkEmail(req.body.email);

    emailCheck.then((value) => {
        idCheck.then((value) => {
            quotaCheck.then( (value) => {
                var sql = "INSERT INTO `bilsportdb`.`t_basketball3`(`bilkentId`, `email`, `ge`,`team`) VALUES  (?,?,?,?);";
                mysqlConnection.query(sql, [participant.bilkentId, participant.email, participant.ge, participant.team], (err, rows, fields) => {
                    if (!err)
                        res.send('Inserted participant id: ' + participant.bilkentId);
                    else
                        console.log(err);
                });
            }).catch((error) => {
                console.log(quotaCheck);
                res.send("Team Quota is full! This tournament is a 3x3 tournament");
            });
        }).catch((error) => {
            console.log(idCheck);
            res.send("This Bilkent Id exists.");
        });
    }).catch((error) => {
        console.log(idCheck);
        res.send("This E-mail exists.");
    });    
});


module.exports = router;