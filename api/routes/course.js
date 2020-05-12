const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");


router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM course', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.get('/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM course WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.delete('/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM course WHERE id = ?', [id], (err, rows, fields) => {
        if (!err)
          res.send('Deleted successfully');
        else
            console.log(err);
    });
    
});

router.post('/', (req, res) => {
    var sql = "INSERT INTO `bilsportdb`.`course`(`name`,`instructor`,`schedule`,`level`,`place`)VALUES(?,?,?,?,?);";
    mysqlConnection.query(sql, [req.body.name, req.body.instructor, req.body.schedule, req.body.level, req.body.place], (err, rows, fields) => {
        if (!err)
              res.send('Inserted course: ' + req.body.name + "\nLevel:" + req.body.level);
            else
                console.log(err);
        });
    
});


router.put('/:id', (req, res) => {
    let course = req.body;
    var sql = "UPDATE `bilsportdb`.`course` SET `name` = ?,`instructor` = ?,`schedule` = ?,`level` = ?,`place` = ?WHERE `id` = ?;";
    mysqlConnection.query(sql, [req.body.name, req.body.instructor, req.body.schedule, req.body.level, req.body.place, req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});

module.exports = router;