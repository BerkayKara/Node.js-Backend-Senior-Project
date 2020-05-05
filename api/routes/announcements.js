const express = require("express");
const router = express.Router();


const mysql = require('mysql');
const bodyParser = require('body-parser');

var mysqlConnection = mysql.createConnection({ 
    password: '',
    user: 'root',
    database: 'bilsportdb',
    host: 'localhost',
    multipleStatements: true,
    dateStrings: true

});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection Successfull');
    else
        console.log('DB connection failed');
});



function dateCompare(id,today,start,end){

    console.log(typeof(start));

    //For today
    var now = today.split('-');
    var yearNow = parseInt(now[2]);
    var monthNow = parseInt(now[1]);
    var dayNow = parseInt(now[0]);

    //For date 1
    var dateStart =  start.split('/');
    var yearStart = parseInt(dateStart[0]);
    var monthStart = parseInt(dateStart[1]);
    var dayStart = parseInt(dateStart[2]);

    //For date 2
    var dateEnd =  end.split('/');
    var yearEnd = parseInt(dateEnd[0]);
    var monthEnd = parseInt(dateEnd[1]);
    var dayEnd = parseInt(dateEnd[2]);

    

    var n = new Date(yearNow,monthNow -1, dayNow +1);
    console.log(n);
    var s = new Date(yearStart,monthStart -1, dayStart +1);
    console.log(s);
    var e = new Date(yearEnd,monthEnd -1, dayEnd +1);
    console.log(e);

    if(s <= n && n <= e){
        var compare = true   
    }
    else {
        var compare = false
    }
    console.log("here")
    console.log(compare);
    if(compare){
        var sql = "UPDATE `bilsportdb`.`announcements` SET `display` = 1 WHERE `id` = ?;";

        mysqlConnection.query(sql,[id] ,(err, rows, fields) => {
            if (!err)
                console.log("updated");
            else
                console.log(err);
        });
    }
     
}




//Get all announcements
router.get('/', (req, res, next) => {
    let current_datetime = new Date();
    console.log(current_datetime);
    let formatted_date = current_datetime.getDate() + "-" + "0" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear();
    console.log(formatted_date);
    mysqlConnection.query('SELECT * FROM announcements', (err, rows, fields) => {
        if (!err){
            for (var i = 0; i < rows.length; i++) {
                var now = formatted_date;
                var start = rows[i].startdate;
                var end =  rows[i].enddate;
                dateCompare(rows[i].id,now,start,end);
            }
        }   
        else
            console.log(err);
    });

    //getting announcements which will be displayed (display 1)
    mysqlConnection.query('SELECT * FROM announcements where display = 1', (err, rows, fields) => {
        if (!err){
            res.send(rows);
        }   
        else
            console.log(err);
    });


});


//Get an announcement
router.get('/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM announcements WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err){
            res.send(rows);
        }     
        else{
            console.log(err);
        }
            
    });
});

//Delete an announcement
router.delete('/:id', (req, res) => {
    console.log(req.params);
    mysqlConnection.query('DELETE FROM announcements WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});

//Insert an announcement
router.post('/', (req, res) => {
    let announcement = req.body;
    console.log(announcement);
    let display = 0;
    var sql = "INSERT INTO `bilsportdb`.`announcements`(`title`, `text`, `photopath`, `startdate`, `enddate`, `display`)VALUES  (?,?,?,?,?,?);";
    mysqlConnection.query(sql, [announcement.title, announcement.text, announcement.photopath, announcement.startdate, announcement.enddate, display], (err, rows, fields) => {
        if (!err)
            res.send('Announcement Inserted');
        else
            console.log(err);
    });
});



//Update an announcement
router.put('/', (req, res) => {
    let announcement = req.body;
    let display = 0;
    var sql = "SET @id = ?; SET @title = ?; SET @text = ?; SET @photopath = ?; SET @startdate = ?; SET @enddate = ?; SET @display = ?; CALL updateAnnouncementProcedure(@id,@title, @text, @photopath, @startdate, @enddate, @display);";
    mysqlConnection.query(sql, [announcement.id, announcement.title, announcement.text, announcement.photopath, announcement.startdate, announcement.enddate, display], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});


module.exports = router;
