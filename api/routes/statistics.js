const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");


//Get a statistic
router.get('/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM statistics WHERE id = ? order by id desc', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

//Delete a statistic
router.delete('/:id', (req, res) => {
    console.log(req.params);
    mysqlConnection.query('DELETE FROM statistics WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});

//Insert a statistic
router.post('/', (req, res) => {
    let statistics = req.body;
    var sql = "SET @id = ?; SET @km = ? ;SET @sett = ?;CALL insertStatisticProcedure(@id,@km,@sett);";
    mysqlConnection.query(sql, [statistics.id, statistics.km, statistics.sett], (err, rows, fields) => {
        if (!err)
            res.send('Inserted statistics id: ' + statistics.id);
        else
            console.log(err);
    });
});


//Update a statistic
router.put('/', (req, res) => {
    let statistics = req.body;
    var sql = "SET @id = ?; SET @km = ?; SET @sett = ?;CALL updateStatisticProcedure(@id, @km,@sett);";
    mysqlConnection.query(sql, [statistics.id, statistics.km, statistics.sett], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});




module.exports = router;
