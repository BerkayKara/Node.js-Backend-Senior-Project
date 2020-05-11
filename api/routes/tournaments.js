const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");


function deleteTournamentTable(){
    return new Promise((resolve, reject) => {
        var sql = "DROP TABLE IF EXISTS " + tournamentName;
        mysqlConnection.query(sql,  (err, rows, fields) => {});
        resolve(10);
    }); 

}


//Get all tournaments
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM tournaments', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

//Get a tournament
router.get('/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM tournaments WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

//Delete a tournament
router.delete('/:id', (req, res) => {
    var id = req.params.id;
    var teamName;
    var sql = "SELECT `tournaments`.`name`,`tournaments`.`campus` FROM `bilsportdb`.`tournaments` WHERE id = ?;";
    mysqlConnection.query(sql, [id], (err, rows, fields) => {
        if (!err){
            teamName = rows[0].name + rows[0].campus;
        }
        else
            console.log(err);
    });
    let deleteCheck = deleteTournamentTable(teamName);
    deleteCheck.then((value) => {
        mysqlConnection.query('DELETE FROM tournaments WHERE id = ?', [id], (err, rows, fields) => {
            if (!err)
                res.send('Deleted successfully');
            else
                console.log(err);
        });
    }).catch((error) => {
        console.log(deleteCheck);
        res.send("Cannot delete tournament");
    });    

    
});

function createTable(name,campus, teamquota) {
    var tournamentName = name + campus;
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


router.post('/', (req, res) => {
    let tableCheck = createTable(tournament.name,tournament.campus,tournament.teamquota);
    tableCheck.then((value) => {
        var sql = "INSERT INTO `bilsportdb`.`tournaments`(`name`, `campus`, `teamquota`) VALUES(?,?,?);";
        mysqlConnection.query(sql, [tournament.name, tournament.campus, tournament.teamquota], (err, rows, fields) => {
            if (!err)
                res.send('Inserted tournament: ' + tournament.name + tournament.campus);
            else
                console.log(err);
        });
    }).catch((error) => {
        console.log(tableCheck);
        res.send("Cannot create table");
    });    
});


router.put('/:id', (req, res) => {
    let tournament = req.body;
    var sql = "UPDATE `bilsportdb`.`tournaments` SET `name` = ?, `campus` = ?, `teamquota` = ? WHERE `id` = ?;";
    mysqlConnection.query(sql, [tournament.name, tournament.campus, tournament.teamquota, req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});

module.exports = router;