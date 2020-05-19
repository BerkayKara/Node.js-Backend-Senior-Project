const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");

function createTable(name,campus, teamquota) {
    var tournamentName = name + campus + teamquota;
    if(teamquota == 1){
        return new Promise((resolve, reject) => {
            var sql = "DROP TABLE IF EXISTS " + tournamentName + "; CREATE TABLE IF NOT EXISTS " + tournamentName +" ( `id` int(11) NOT NULL AUTO_INCREMENT, `bilkentId` int(11) NOT NULL, `email` varchar(45) NOT NULL, `ge` tinyint(4) NOT NULL, PRIMARY KEY (`id`)) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;"
            mysqlConnection.query(sql,  (err, rows, fields) => {});
            var sql2 = "SELECT * FROM " + tournamentName
            mysqlConnection.query(sql2,  (err, rows, fields) => {
                if (!err)
                    resolve(10);
                else{
                    console.log(err);
                    reject(-1);
                }                  
            });
        });
    }
    else {
        return new Promise((resolve, reject) => {
            var sql = "DROP TABLE IF EXISTS " + tournamentName +" ;CREATE TABLE IF NOT EXISTS " + tournamentName + " (`id` int(11) NOT NULL AUTO_INCREMENT,`bilkentId` int(11) NOT NULL,`email` varchar(45) NOT NULL,`ge` tinyint(4) NOT NULL,`team` varchar(45) NOT NULL, PRIMARY KEY (`id`) ) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;"
            mysqlConnection.query(sql,  (err, rows, fields) => {});
            var sql2 = "SELECT * FROM " + tournamentName
            mysqlConnection.query(sql2,  (err, rows, fields) => {
                if (!err)
                    resolve(10);
                else{
                    console.log(err);
                    reject(-1);
                }
                    
            });

        });
    }    
}

function checkExist(name,campus,teamquota){
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `bilsportdb`.`tournaments` WHERE name = ? AND campus = ? AND teamquota = ?; ";
        mysqlConnection.query(sql, [name,campus,teamquota], (err, rows, fields) => {
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

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM tournaments', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.get('/:name', (req, res) => {
    mysqlConnection.query('SELECT * FROM tournaments WHERE name = ?', [req.params.name], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.delete('/', (req, res) => {
        mysqlConnection.query('DELETE FROM tournaments WHERE id = ?', [req.body.id], (err, rows, fields) => {
            if (!err)
                res.send('Deleted successfully');
            else
                console.log(err);
        });
});

router.post('/', (req, res) => {
    var tournament = req.body;
    let tableCheck = createTable(tournament.name,tournament.campus,tournament.teamquota);
    let existCheck = checkExist(tournament.name,tournament.campus,tournament.teamquota);
    existCheck.then((value) => {
        tableCheck.then((value) => {
            var sql = "INSERT INTO `bilsportdb`.`tournaments`(`name`, `campus`, `teamquota`) VALUES(?,?,?);";
            mysqlConnection.query(sql, [tournament.name, tournament.campus, tournament.teamquota], (err, rows, fields) => {
                if (!err)
                    res.send('Inserted tournament: ' + tournament.name + tournament.campus + tournament.teamquota);
                else
                    console.log(err);
            });
        }).catch((error) => {
            console.log(tableCheck);
            res.send("Cannot create table");
        });       
    }).catch((error) => {
        console.log(existCheck);
        res.send("This tournament exists");
    });    
});

router.put('/', (req, res) => {
    let tournament = req.body;
    var sql = "UPDATE `bilsportdb`.`tournaments` SET `name` = ?, `campus` = ?, `teamquota` = ? WHERE `id` = ?;";
    mysqlConnection.query(sql, [tournament.name, tournament.campus, tournament.teamquota, req.body.id], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});

module.exports = router;