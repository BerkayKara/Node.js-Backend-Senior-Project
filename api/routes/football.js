const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");


//Get all football fields
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM football where available = true', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});




//Get a football field by field name
router.get('/:field', (req, res) => {
    mysqlConnection.query('SELECT * FROM football WHERE field = ?', [req.params.field], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});


//Delete a football field
router.delete('/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM football WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});

//Insert a football field
router.post('/', (req, res) => {
    let football = req.body;
    var sql = "INSERT INTO `bilsportdb`.`football`(`field`,`available`,`time`)VALUES(?,?,?);";
    mysqlConnection.query(sql, [football.field, football.available, football.time ], (err, rows, fields) => {
        if (!err)
            res.send('Inserted football field: ' + football.field);
        else
            console.log(err);
    });
});


//Update an football field
router.put('/:id', (req, res) => {
    let football = req.body;
    var sql = "UPDATE `bilsportdb`.`football` SET `field` = ?,`available` = ?, `time` = ? WHERE `id` = ?;";
    mysqlConnection.query(sql, [football.field, football.available, football.time,  req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});



module.exports = router;
