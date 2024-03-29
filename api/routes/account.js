const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");



function deleteRegister(bilkentId){
    return new Promise((resolve, reject) => {
        var sql = "DELETE from register where bilkentId = ?";
        mysqlConnection.query(sql, [bilkentId], (err, rows, fields) => {
            if (!err){
                resolve(10);
            }
            else{
                 reject(-1);                   
            }
        });
    });

}


//Get all accounts
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM account', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});


function findStatus(email){

    var splittedEmail = email.split('@');
    var emailEnd = splittedEmail[1];

    if (emailEnd == "ug.bilkent.edu.tr"){
        return "student";
    }
    else if (emailEnd == "alumni.bilkent.edu.tr"){
        return "alumni";
    }
    else{
        return "staff";
    }

}


//Insert an account (when admin approves an unregistered account)
router.post('/', (req, res) => {
    var status = findStatus(req.body.email); 
    var regDelete = deleteRegister(req.body.bilkentId);

    regDelete.then((value) => {
        var sql = "SET @name = ?; SET @surname = ?; SET @bilkentId = ?; SET @email = ?; SET @password = ?; SET @status = ?; CALL insertAccountProcedure(@name, @surname, @bilkentId, @email, @password, @status);";
        mysqlConnection.query(sql, [req.body.name, req.body.surname, req.body.bilkentId, req.body.email, req.body.password, status], (err, rows, fields) => {
            if (!err)
                res.send('Inserted account id: ' + req.body.bilkentId);
            else
                res.send(err.sqlMessage);
            
            console.log(err);
        });
    }).catch((value) => {
        res.sendStatus(403);
    });

    
});



//Delete an account
router.delete('/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM account WHERE bilkentId = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});


//Update an account
router.put('/', (req, res) => {
    let account = req.body;
    var sql = "UPDATE `bilsportdb`.`account` SET `name` = ?, `surname` = ?, `bilkentId` = ?, `email` = ?, `password` = ?, `status` = ? WHERE `bilkentId` = ? AND `email` = ?; ";
    mysqlConnection.query(sql, [req.body.name, req.body.surname, req.body.bilkentId, req.body.email, req.body.password, req.body.status, req.body.bilkentId, req.body.email], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});




module.exports = router;