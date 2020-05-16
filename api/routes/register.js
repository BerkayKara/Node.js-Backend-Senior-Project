const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");


//Get all unregistered accounts
router.get('/',(req,res) => {
    mysqlConnection.query('SELECT * FROM register', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
    
});

//Get an unregistered account
router.get('/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM register WHERE id = ?', [req.params.id], (err, rows, fields) => {
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


//Insert an unregistered account (when user clicks register button) 
router.post('/', (req, res) => {
    var status = findStatus(req.body.email); 
    var sql = "SET @name = ?; SET @surname = ?; SET @bilkentId = ?; SET @email = ?; SET @password = ?; SET @status = ?; CALL insertRegisterProcedure(@name, @surname, @bilkentId, @email, @password, @status);";
    mysqlConnection.query(sql, [req.body.name, req.body.surname, req.body.bilkentId, req.body.email, req.body.password, status], (err, rows, fields) => {
        if (!err)
            res.send('Inserted unregistered account bilkent id: ' + req.body.bilkentId);
        else
            res.send(err.sqlMessage);
        console.log(err);
        
    });
});

module.exports = router;