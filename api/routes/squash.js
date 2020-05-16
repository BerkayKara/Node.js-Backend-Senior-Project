const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");

//Get all squash courts
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM squash where available = true', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});




//Get a squash court by name
router.get('/:courtNo', (req, res) => {
    mysqlConnection.query('SELECT * FROM squash WHERE courtNo = ?', [req.params.courtNo], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});


//Delete a squash court
router.delete('/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM squash WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});

//Insert a squash court
router.post('/', (req, res) => {
    let squash = req.body;
    var sql = "INSERT INTO `bilsportdb`.`squash`(`courtNo`,`available`,`time`)VALUES(?,?,?)    ";
    mysqlConnection.query(sql, [squash.courtNo, squash.available, squash.time], (err, rows, fields) => {
        if (!err)
            res.send('Inserted squash courtNo: ' + squash.courtNo);
        else
            console.log(err);
    });
});


//Update a squash court
router.put('/', (req, res) => {
    let squash = req.body;
    var sql = "UPDATE `bilsportdb`.`squash` SET `courtNo` = ?,`available` = ?,`time` = ? WHERE `id` = ?;";
    mysqlConnection.query(sql, [squash.courtNo, squash.available, squash.time], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});




module.exports = router;
