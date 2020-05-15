const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");

//Get all tennis courts
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM tennis where available = true', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

//Get a tennis court
router.get('/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM tennis WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

//Get a tennis court by court no
router.get('/:courtNo', (req, res) => {
    mysqlConnection.query('SELECT * FROM tennis WHERE courtNo = ?', [req.params.courtNo], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

//Delete a tennis court
router.delete('/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM tennis WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});


//Insert a tennis court
router.post('/', (req, res) => {
    let tennis = req.body;
    var sql = "INSERT INTO `bilsportdb`.`tennis`(`courtNo`,`available`,`time`)VALUES(?,?,?);";
    mysqlConnection.query(sql, [tennis.courtNo, tennis.available,tennis.time], (err, rows, fields) => {
        if (!err)
            res.send('Inserted tennis court : ' + tennis.courtNo);
        else
            console.log(err);
    });
});


//Update a tennis court
router.put('/', (req, res) => {
    let tennis = req.body;
    var sql = "UPDATE `bilsportdb`.`tennis`SET `courtNo` = ?,`available` = ?,`time` = ? WHERE `id` = ?;";
    mysqlConnection.query(sql, [tennis.courtNo, tennis.available,tennis.time, tennis.id], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});



module.exports = router;
