const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");

//Get all squash courts
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM squash', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

//Get a squash court
router.get('/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM squash WHERE id = ?', [req.params.id], (err, rows, fields) => {
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
    var sql = "SET @id = ?; SET @courtNo = ? ;SET @available = ?;CALL insertSquashProcedure(@id,@courtNo,@available);";
    mysqlConnection.query(sql, [squash.id, squash.courtNo, squash.available], (err, rows, fields) => {
        if (!err)
            res.send('Inserted squash id: ' + squash.id);
        else
            console.log(err);
    });
});


//Update a squash court
router.put('/', (req, res) => {
    let squash = req.body;
    var sql = "SET @id = ?; SET @courtNo = ?; SET @available = ?;CALL updateSquashProcedure(@id, @courtNo,@available);";
    mysqlConnection.query(sql, [squash.id, squash.courtNo, squash.available], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});




module.exports = router;
