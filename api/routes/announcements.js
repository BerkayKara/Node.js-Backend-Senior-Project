const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../config/db");
const imageToBase64 = require('image-to-base64');


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
    mysqlConnection.query('SELECT * FROM announcements order by id desc', (err, rows, fields) => {
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
    mysqlConnection.query('SELECT * FROM announcements where display = 1 order by id desc', (err, rows, fields) => {
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
    let announcement = {
        title: req.body.title,
        text: req.body.text,
        photoname: req.body.photoname,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
    };
    console.log(announcement);
    var base64 ;
    var sql = "SELECT * from file where name = ?";
    mysqlConnection.query(sql, [announcement.photoname], (err, rows, fields) => {
        if (!err)
            imageToBase64("C:/Users/Berkay Kara/Desktop/Backend/" + rows[0].path) // you can also to use url
            .then(
                (response) => {
                    console.log("C:/Users/Berkay Kara/Desktop/Backend/" + rows[0].path);
                    base64 = response; //cGF0aC90by9maWxlLmpwZw==
                    let display = 0;
                    //console.log(base64);
                    base64 = base64.replace(new RegExp(' ', 'g'), '+');

                    var sql = "INSERT INTO `bilsportdb`.`announcements`(`title`, `text`, `photoname`, `startdate`, `enddate`, `display`,`base64`)VALUES  (?,?,?,?,?,?,?);";
                    mysqlConnection.query(sql, [announcement.title, announcement.text, announcement.photoname, announcement.startdate, announcement.enddate, display,base64], (err, rows, fields) => {
                        if (!err){
                            console.log("ok");
                            res.sendStatus(200);
                        }                        
                        else{
                            console.log(" not ok");
                        }
                    });
                }
            )
            .catch(
                (error) => {
                    console.log(error); //Exepection error....
                }
            )
        else
            console.log(err);
    });

    
});

//Update an announcement
router.put('/', (req, res) => {
    let announcement = req.body;
    let display = 0;
    var sql = "SET @id = ?; SET @title = ?; SET @text = ?; SET @photoname = ?; SET @startdate = ?; SET @enddate = ?; SET @display = ?; CALL updateAnnouncementProcedure(@id,@title, @text, @photoname, @startdate, @enddate, @display);";
    mysqlConnection.query(sql, [announcement.id, announcement.title, announcement.text, announcement.photoname, announcement.startdate, announcement.enddate, display], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});

module.exports = router;