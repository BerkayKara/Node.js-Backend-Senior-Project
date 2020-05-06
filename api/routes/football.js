const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");


//Get all football fields
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM football', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

//Get a football field
router.get('/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM football WHERE id = ?', [req.params.id], (err, rows, fields) => {
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
    var sql = "SET @id = ?; SET @field = ? ;SET @available = ?;CALL insertFootballProcedure(@id,@field,@available);";
    mysqlConnection.query(sql, [football.id, football.field, football.available], (err, rows, fields) => {
        if (!err)
            res.send('Inserted football id: ' + football.id);
        else
            console.log(err);
    });
});


//Update an football field
router.put('/', (req, res) => {
    let football = req.body;
    var sql = "SET @id = ?; SET @field = ?; SET @available = ?;CALL updateFootballProcedure(@id, @field,@available);";
    mysqlConnection.query(sql, [football.id, football.field, football.available], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});



module.exports = router;
