const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../../config/db");

function checkEmail(email){
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `bilsportdb`.`t_squash` WHERE `email` = ?;";
        mysqlConnection.query(sql, [email], (err, rows, fields) => {
            if (rows.length > 0){
                console.log(rows.length);
                reject(-1);  
            }
            else{
                console.log(rows.length);
                resolve(10);
            }
        });
    });
}

function checkId(bilkentId){
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM `bilsportdb`.`t_squash` WHERE `bilkentId` = ?;";
        mysqlConnection.query(sql, [bilkentId], (err, rows, fields) => {
            if (rows.length > 0){
                console.log(rows.length);
                reject(-1);  
            }
            else{
                console.log(rows.length);
                resolve(10);
            }
        });
    });
}

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM t_squash', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.get('/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM t_squash WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

router.delete('/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM t_squash WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});

router.post('/', (req, res) => {
    let participant = req.body;
    let idCheck = checkId(req.body.bilkentId);
    let emailCheck = checkEmail(req.body.email);

    emailCheck.then((value) => {
        idCheck.then((value) => {
            var sql = "INSERT INTO `bilsportdb`.`t_squash`(`bilkentId`, `email`, `ge`) VALUES  (?,?,?);";
            mysqlConnection.query(sql, [participant.bilkentId, participant.email, participant.ge], (err, rows, fields) => {
                if (!err)
                    res.send('Inserted participant id: ' + participant.bilkentId);
                else
                    console.log(err);
            });
        }).catch((error) => {
            console.log(idCheck);
            res.send("This Bilkent Id exists.");
        });
    }).catch((error) => {
        console.log(idCheck);
        res.send("This E-mail exists.");
    });    


});

/*
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
*/


module.exports = router;