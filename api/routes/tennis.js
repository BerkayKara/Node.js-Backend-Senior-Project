const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");

//Get all tennis courts
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM tennis', (err, rows, fields) => {
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
    var sql = "SET @id = ?; SET @court = ? ;SET @campus = ?;CALL insertTennisProcedure(@id, @court,@campus);";
    mysqlConnection.query(sql, [tennis.id, tennis.court, tennis.campus], (err, rows, fields) => {
        if (!err)
            res.send('Inserted tennis id: ' + tennis.id);
        else
            console.log(err);
    });
});


//Update a tennis court
router.put('/', (req, res) => {
    let tennis = req.body;
    var sql = "SET @id = ?; SET @court = ?; SET @campus = ?;CALL updateTennisProcedure(@id, @court,@campus);";
    mysqlConnection.query(sql, [tennis.id, tennis.court, tennis.campus], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});



module.exports = router;
