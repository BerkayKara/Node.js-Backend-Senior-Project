const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");


router.get('/', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM appointment', (err, rows, fields) => {
        if (!err){
            res.send(rows);
        }   
        else
            console.log(err);
    });
});

router.get('/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM appointment WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err){
            res.send(rows);
        }     
        else{
            console.log(err);
        }          
    });
});

router.delete('/', (req, res) => {
    console.log(req.body);
    mysqlConnection.query('DELETE FROM appointment WHERE id = ?', [req.body.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});

router.post('/', (req, res) => {
    var sql = "INSERT INTO `bilsportdb`.`appointment`(`name`,`place`,`time`,`available`)VALUES(?,?,?,?);";
    mysqlConnection.query(sql, [req.body.name, req.body.place, req.body.time, 1], (err, rows, fields) => {
        if (!err)
            res.send('Appointment Inserted');
        else
            console.log(err);
    });
});

router.put('/:id', (req, res) => {
    var sql = "UPDATE `bilsportdb`.`appointment` SET `name` = ?,`place` = ?,`time` = ?, `available` = ? WHERE `id` = ?;";
    mysqlConnection.query(sql, [req.body.name,req.body.place,req.body.time, req.body.available, req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});

module.exports = router;