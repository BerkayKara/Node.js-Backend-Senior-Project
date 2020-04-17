//Creating the server 
//Berkay Kara

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const path = require('path') ;
var dateFormat = require('dateformat');
var moment = require('moment');



const multer = require('multer');

const storage  = multer.diskStorage({//public te store et bütün fotoları
    destination: './public/uploads/',
    filename: function(req, file, cb){
        cb(null,file.originalname + '-' + path.extname(file.originalname));
    }
});


const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' ||file.mimetype === 'image/png'||file.mimetype === 'image/jpg'){
        cb(null,true);
    }
    else{
        cb(new Error("File Type is wrong"),false);
    }
};


const upload = multer({// multer storage ı yukardaki olsun
    storage: storage,
    limits:{
        fileSize: 1024*1024*10//10MB
    },
    fileFilter: fileFilter

}).single('image');

// //Check File Type
// function checkFileType(file,cb){
//     // Allowed extentions
//     const filetypes = /jpeg|jpg|png|gif|jfif/;
//     //check extention
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     //check mime
//     const mimetype = filetypes.test(file.mimetype);

//     if (mimetype && extname){
//         return cb(null,true);
//     } else {
//         cb('Error: Images Only!');
//     }
// }




app.post('/upload', upload, (req,res,err) => {
    console.log(req.file);
    res.send(req.file.path);
    // upload(req,res,(err) => {
    //     if (err){
    //         res.render('index', {//tekrar resim yükleme sayfasına yönlendir
    //             msg: err
    //         });
    //     } else {
    //         if (req.file == undefined){
    //             res.render('index', {
    //                 msg: 'Error: No File Selected'
    //             });
    //         } else {
    //             console.log(req.file);
    //             res.render('index', {
    //                 msg: 'File Uploaded!',
    //                 file: `ùploads/${req.file.filename}`
    //             });

    //         }
    //         console.log(req.file);
            
    //     }

    // })

});

app.use(bodyParser.json());


app.use(session({
     secret: 'secret', 
     resave: false,
     saveUninitialized: true
}));


app.listen(8081, (err) => {
    console.log("Server is running at port 8081");
});

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

// Login
app.post('/login', function (req, res) {
    console.log(req.body.user.bilkentId);
    let bilkentId = req.body.user.bilkentId;
    let password = req.body.user.password;
    mysqlConnection.query('SELECT * FROM account WHERE bilkentId = ? AND password = ?', [bilkentId, password], (err, rows, fields) => {
        if (!err) {
            if (rows.length > 0){
                req.session.bilkentId = bilkentId;
                res.send(rows);
            }    
            else
                res.send(404);
        }
        else {
            res.send(err);
        }
    });
}
);

//display session
app.get('/sessionInfo', function(req, res) {
    if(req.session.id) return res.send("session info: "+req.session.bilkentId);
    res.send("no session");
 });


// Logout
app.post('/logout', function(req, res) {
   req.session.destroy();
   res.end();
});

//Get unregistered accounts
app.get('/register',(req,res) => {
    mysqlConnection.query('SELECT * FROM register', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
    
});

//Get an unregistered account
app.get('/register/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM register WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});


//Insert an unregistered account (when user clicks register button) 
app.post('/register', (req, res) => {
    var sql = "SET @name = ?; SET @surname = ?; SET @bilkentId = ?; SET @email = ?; SET @password = ?; SET @status = ?; CALL insertRegisterProcedure(@name, @surname, @bilkentId, @email, @password, @status);";
    mysqlConnection.query(sql, [req.body.name, req.body.surname, req.body.bilkentId, req.body.email, req.body.password, req.body.status], (err, rows, fields) => {
        if (!err)
            res.send('Inserted unregistered account bilkent id: ' + req.body.bilkentId);
        else
            res.send(err.sqlMessage);
        console.log(err);
        
    });
});

//Insert an account (when admin approves an unregistered account)
app.post('/account', (req, res) => {
    var sql = "SET @name = ?; SET @surname = ?; SET @bilkentId = ?; SET @email = ?; SET @password = ?; SET @status = ?; CALL insertAccountProcedure(@name, @surname, @bilkentId, @email, @password, @status);";
    mysqlConnection.query(sql, [req.body.name, req.body.surname, req.body.bilkentId, req.body.email, req.body.password, req.body.status], (err, rows, fields) => {
        if (!err)
            res.send('Inserted account id: ' + req.body.bilkentId);
        else
            res.send(err.sqlMessage);
        
        console.log(err);
    });
});


//Get an deneme
app.get('/deneme/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM deneme WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err){
            
            let current_datetime = new Date();
            console.log(current_datetime);
            let formatted_date = current_datetime.getDate() + "-" + "0" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear();
            console.log(formatted_date);

            console.log(rows[0].constructor.name);

            var now = formatted_date;
            var start = rows[0].date1;
            var end = rows[0].date2;

            var flag = dateCompare(now,start,end);
            if (flag == true){
                res.send(true);
            }
            else {
                res.send("Date Error")
            }
        }     
        else{
            console.log(err);
        }
            
    });
});

//Get all deneme
app.get('/deneme', (req, res) => {

    let current_datetime = new Date();
    console.log(current_datetime);
    let formatted_date = current_datetime.getDate() + "-" + "0" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear();
    console.log(formatted_date);

    mysqlConnection.query('SELECT * FROM deneme', (err, rows, fields) => {
        if (!err){
            for (var i = 0; i < rows.length; i++) {
                var now = formatted_date;
                var start = rows[i].date1;
                var end =  rows[i].date2;
                var flag = dateCompare(now,start,end);
                if (flag == true){
                    res.send(rows[i]);
                }

            }
        }   
        else
            console.log(err);
    });
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




app.post('/deneme', (req, res) => {
    let deneme = req.body;
    

    let current_datetime = new Date();
    console.log(current_datetime);
    let formatted_date = current_datetime.getDate() + "-" + "0" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear();
    console.log(formatted_date);


    var now = formatted_date;
    var start = req.body.date1;
    var end = req.body.date2;

    console.log(now);
    console.log(start);
    console.log(end);
  

    
    dateCompare(now,start,end);

    var sql = "SET @id = ?; SET @date1 = ?; SET @date2 = ?; CALL insertDenemeProcedure(@id, @date1, @date2);";

    mysqlConnection.query(sql, [req.body.id, req.body.date1, req.body.date2], (err, rows, fields) => {
        if (!err)
            res.send('Deneme  Inserted');
        else
            console.log(err);
    });

    
});






//Announcement********************************************************************
//Get all announcements
app.get('/announcements', (req, res) => {
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
app.get('/announcements/:id', (req, res) => {
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
app.delete('/announcements/:id', (req, res) => {
    console.log(req.params);
    mysqlConnection.query('DELETE FROM announcements WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});

//Insert an announcement
app.post('/announcements', (req, res) => {
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
app.put('/announcements', (req, res) => {
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

//Statistics***************************************************************

//Get all statistics
app.get('/statistics', (req, res) => {
    statistics.getAll();
});


//Get a statistics
app.get('/statistics/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM statistics WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

//Delete a statistics
app.delete('/statistics/:id', (req, res) => {
    console.log(req.params);
    mysqlConnection.query('DELETE FROM statistics WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});

//Insert an statistics
app.post('/statistics', (req, res) => {
    let statistics = req.body;
    var sql = "SET @id = ?; SET @km = ? ;SET @sett = ?;CALL insertStatisticProcedure(@id,@km,@sett);";
    mysqlConnection.query(sql, [statistics.id, statistics.km, statistics.sett], (err, rows, fields) => {
        if (!err)
            res.send('Inserted statistics id: ' + statistics.id);
        else
            console.log(err);
    });
});


//Update an statistics
app.put('/statistics', (req, res) => {
    let statistics = req.body;
    var sql = "SET @id = ?; SET @km = ?; SET @sett = ?;CALL updateStatisticProcedure(@id, @km,@sett);";
    mysqlConnection.query(sql, [statistics.id, statistics.km, statistics.sett], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});



//Pool***************************************************************

//Get all pool lanes
app.get('/pool', (req, res) => {
    mysqlConnection.query('SELECT * FROM pool', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

//Get a pool lane
app.get('/pool/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM pool WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

//Delete a pool lane
app.delete('/pool/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM pool WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});

//Insert a pool lane
app.post('/pool', (req, res) => {
    let pool = req.body;
    var sql = "SET @id = ?; SET @lane = ? ;SET @quota = ?;CALL insertPoolProcedure(@id,@lane,@quota);";
    mysqlConnection.query(sql, [pool.id, pool.lane, pool.quota], (err, rows, fields) => {
        if (!err)
            res.send('Inserted pool id: ' + pool.id);
        else
            console.log(err);
    });
});


//Update an pool
app.put('/pool', (req, res) => {
    let pool = req.body;
    var sql = "SET @id = ?; SET @lane = ?; SET @quota = ?;CALL updatePoolProcedure(@id, @lane,@quota);";
    mysqlConnection.query(sql, [pool.id, pool.lane, pool.quota], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});




//Squash***************************************************************

//Get all squash courts
app.get('/squash', (req, res) => {
    mysqlConnection.query('SELECT * FROM squash', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

//Get a squash court
app.get('/squash/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM squash WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});


//Delete a squash court
app.delete('/squash/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM squash WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});

//Insert a squash court
app.post('/squash', (req, res) => {
    let squash = req.body;
    var sql = "SET @id = ?; SET @courtNo = ? ;SET @available = ?;CALL insertSquashProcedure(@id,@courtNo,@available);";
    mysqlConnection.query(sql, [squash.id, squash.courtNo, squash.available], (err, rows, fields) => {
        if (!err)
            res.send('Inserted squash id: ' + squash.id);
        else
            console.log(err);
    });
});


//Update an squash
app.put('/squash', (req, res) => {
    let squash = req.body;
    var sql = "SET @id = ?; SET @courtNo = ?; SET @available = ?;CALL updateSquashProcedure(@id, @courtNo,@available);";
    mysqlConnection.query(sql, [squash.id, squash.courtNo, squash.available], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});






//Tennis***************************************************************

//Get all tennis courts
app.get('/tennis', (req, res) => {
    mysqlConnection.query('SELECT * FROM tennis', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

//Get a tennis court
app.get('/tennis/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM tennis WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});


//Delete a tennis court
app.delete('/tennis/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM tennis WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});


//Insert a tennis court
app.post('/tennis', (req, res) => {
    let tennis = req.body;
    var sql = "SET @id = ?; SET @court = ? ;SET @campus = ?;CALL insertTennisProcedure(@id, @court,@campus);";
    mysqlConnection.query(sql, [tennis.id, tennis.court, tennis.campus], (err, rows, fields) => {
        if (!err)
            res.send('Inserted tennis id: ' + tennis.id);
        else
            console.log(err);
    });
});


//Update a tennis court
app.put('/tennis', (req, res) => {
    let tennis = req.body;
    var sql = "SET @id = ?; SET @court = ?; SET @campus = ?;CALL updateTennisProcedure(@id, @court,@campus);";
    mysqlConnection.query(sql, [tennis.id, tennis.court, tennis.campus], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});



//Footbal**********************************************

//Get all football fields
app.get('/football', (req, res) => {
    mysqlConnection.query('SELECT * FROM football', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

//Get a football field
app.get('/football/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM football WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});


//Delete a football field
app.delete('/football/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM football WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});

//Insert a football field
app.post('/football', (req, res) => {
    let football = req.body;
    var sql = "SET @id = ?; SET @field = ? ;SET @available = ?;CALL insertFootballProcedure(@id,@field,@available);";
    mysqlConnection.query(sql, [football.id, football.field, football.available], (err, rows, fields) => {
        if (!err)
            res.send('Inserted football id: ' + football.id);
        else
            console.log(err);
    });
});


//Update an football field
app.put('/football', (req, res) => {
    let football = req.body;
    var sql = "SET @id = ?; SET @field = ?; SET @available = ?;CALL updateFootballProcedure(@id, @field,@available);";
    mysqlConnection.query(sql, [football.id, football.field, football.available], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});


//Tournaments***********************************************



//table tennis participants



//Get all table tennis participant
app.get('/tabletennis', (req, res) => {
    mysqlConnection.query('SELECT * FROM tennis', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

//Get a table tennis participant
app.get('/tabletennis/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM tennis WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});


//Delete a  table tennis participant
app.delete('/tabletennis/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM tennis WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    });
});


//Insert a table tennis participant
app.post('/tabletennis', (req, res) => {
    let tabletennis = req.body;
    var sql = "SET @id = ?; SET @court = ? ;SET @campus = ?;CALL insertTennisProcedure(@id, @court,@campus);";
    mysqlConnection.query(sql, [tabletennis.id, tabletennis.court, tabletennis.campus], (err, rows, fields) => {
        if (!err)
            res.send('Inserted table tennis participant id: ' + tabletennis.id);
        else
            console.log(err);
    });
});


//Update a table tennis participant
app.put('/tabletennis', (req, res) => {
    let tabletennis = req.body;
    var sql = "SET @id = ?; SET @court = ?; SET @campus = ?;CALL updateTennisProcedure(@id, @court,@campus);";
    mysqlConnection.query(sql, [tennis.id, tennis.court, tennis.campus], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});













/////insert masa tenisi yanlış
// announcement takvim ayarlanıcak
// turnuva sadece participant eklendi takımlı turnuvalar ne olucak