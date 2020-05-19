const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");


//Get all photos
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT name FROM file', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});


module.exports = router;
