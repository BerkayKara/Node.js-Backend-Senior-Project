const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");


router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM payments', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.get('/:bilkentId', (req, res) => {
    mysqlConnection.query('SELECT * FROM payments WHERE bilkentId = ?', [req.params.bilkentId], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});


router.delete('/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM payments WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});


router.put('/:id', (req, res) => {
    let payment = req.body;
    var sql = "UPDATE `bilsportdb`.`payments` SET `bilkentId` = ?, `paymentId` = ?, `courseId` = ? WHERE `id` = ?;";
    mysqlConnection.query(sql, [payment.bilkentId, payment.paymentId, payment.courseId,  req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});



module.exports = router;
