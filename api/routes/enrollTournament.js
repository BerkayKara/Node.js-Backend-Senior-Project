const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");

function checkEmail(email,dbName){
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `bilsportdb`.`" + dbName + "` WHERE `email` = ?;";
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

function checkId(bilkentId,dbName){
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `bilsportdb`.`" + dbName + "` WHERE `bilkentId` = ?;";
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

function checkTeamQuota(team,dbName,teamquota) {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `bilsportdb`.`" + dbName + "` WHERE `team` = ?;";
        mysqlConnection.query(sql, [team], (err, rows, fields) => {
            if (rows.length < teamquota){
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
    var dbName = req.body.name + req.body.campus + req.body.teamquota;
    mysqlConnection.query("SELECT * FROM " + dbName, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.get('/:bilkentId', (req, res) => {
    var dbName = req.body.name + req.body.campus + req.body.teamquota;
    mysqlConnection.query("SELECT * FROM " + dbName + " WHERE bilkentId = ?", [req.params.bilkentId], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.delete('/:id', (req, res) => {
    var dbName = req.body.name + req.body.campus;
    mysqlConnection.query("DELETE FROM " + dbName + "  WHERE id = ?", [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});

router.post('/', (req, res) => {
    let participant = req.body;
    var dbName = req.body.name + req.body.campus + req.body.teamquota;
    let idCheck = checkId(req.body.bilkentId,dbName);
    let emailCheck = checkEmail(req.body.email,dbName);

    if(req.body.teamquota == 1){
        emailCheck.then((value) => {
            idCheck.then((value) => {
                var sql = "INSERT INTO `bilsportdb`.`" + dbName + "`(`bilkentId`, `email`, `ge`) VALUES  (?,?,?);";
                mysqlConnection.query(sql, [participant.bilkentId, participant.email, participant.ge], (err, rows, fields) => {
                    if (!err)
                        res.send('Inserted participant id: ' + participant.bilkentId);
                    else
                        console.log(err);
                });
            }).catch((error) => {
                console.log(idCheck);
                res.sendStatus(403)
            });
        }).catch((error) => {
            console.log(idCheck);
            res.sendStatus(403)
        });    

    }
    else{
        let quotaCheck = checkTeamQuota(req.body.team,dbName,req.body.teamquota);
        emailCheck.then((value) => {
            idCheck.then((value) => {
                quotaCheck.then( (value) => {
                    var sql = "INSERT INTO `bilsportdb`.`" + dbName + "`(`bilkentId`, `email`, `ge`,`team`) VALUES  (?,?,?,?);";
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
    }
    
});

module.exports = router;