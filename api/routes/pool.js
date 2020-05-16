const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");


//Get all pool lanes
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM pool where quota != 0', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});



//Get a pool lane by lane
router.get('/:lane', (req, res) => {
    mysqlConnection.query('SELECT * FROM pool WHERE lane =  ?', [req.params.lane], (err, rows, fields) => {
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
    var sql = "INSERT INTO `bilsportdb`.`pool`(`lane`,`quota`,`time`)VALUES(?,?,?);";
    mysqlConnection.query(sql, [pool.lane, pool.quota, pool.time], (err, rows, fields) => {
        if (!err)
            res.send('Pool Inserted');
        else
            console.log(err);
    });
});


//Update a pool lane
router.put('/', (req, res) => {
    let pool = req.body;
    var sql = "UPDATE `bilsportdb`.`pool` SET `lane` = ?,`quota` = ?, `time` = ? WHERE `id` = ?;";
    mysqlConnection.query(sql, [pool.lane, pool.quota, pool.time,pool.id], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});

module.exports = router;
