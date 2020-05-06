const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");


//Get all pool lanes
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM pool', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

//Get a pool lane
router.get('/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM pool WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

//Delete a pool lane
router.delete('/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM pool WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});

//Insert a pool lane
router.post('/', (req, res) => {
    let pool = req.body;
    var sql = "SET @id = ?; SET @lane = ? ;SET @quota = ?;CALL insertPoolProcedure(@id,@lane,@quota);";
    mysqlConnection.query(sql, [pool.id, pool.lane, pool.quota], (err, rows, fields) => {
        if (!err)
            res.send('Inserted pool id: ' + pool.id);
        else
            console.log(err);
    });
});


//Update a pool lane
router.put('/', (req, res) => {
    let pool = req.body;
    var sql = "SET @id = ?; SET @lane = ?; SET @quota = ?;CALL updatePoolProcedure(@id, @lane,@quota);";
    mysqlConnection.query(sql, [pool.id, pool.lane, pool.quota], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});




module.exports = router;
