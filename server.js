//Creating the server 
//Berkay Kara

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

app.use(bodyParser.json());
app.use(session({
     secret: 'secret', 
     resave: false,
     saveUninitialized: true
}));


app.listen(8080, (err) => {
    console.log("Server is running at port 8080");
});

var mysqlConnection = mysql.createConnection({
    password: '',
    user: 'root',
    database: 'bilsportdb',
    host: 'localhost',
    multipleStatements: true,
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection Successfull');
    else
        console.log('DB connection failed');
});

// Login
app.post('/login', function (req, res) {
    console.log(req.body);
    var id = req.body.user.id;
    var password = req.body.user.password;
    mysqlConnection.query('SELECT * FROM account WHERE id = ? AND password = ?', [id, password], (err, rows, fields) => {
        if (!err) {
            if (rows.length > 0){
                req.session.bilkentId = id;
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
app.get('/bak', function(req, res) {
    if(req.session.id) return res.send("session info: "+req.session.bilkentId);
    res.send("no session");
 });


// Logout
app.post('/logout', function(req, res) {
   req.session.destroy();
   res.end();
});



//Announcement********************************************************************

//Get all announcements
app.get('/announcements', (req, res) => {
    mysqlConnection.query('SELECT * FROM announcements', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});


//Get an announcement
app.get('/announcements/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM announcements WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
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
app.post('/announcement', (req, res) => {
    let announcement = req.body;
    console.log(announcement);
    var sql = "SET @text = ?; SET @date = ?;CALL insertAnnouncementProcedure(@text,@date);";
    mysqlConnection.query(sql, [announcement.text, announcement.date], (err, rows, fields) => {
        if (!err)
            res.send('Announcement Inserted');
        else
            console.log("err");
    });
});



//Update an announcement
app.put('/announcements', (req, res) => {
    let announcement = req.body;
    var sql = "SET @id = ?; SET @text = ?; SET @date = ?;CALL updateAnnouncementProcedure(@id, @text,@date);";
    mysqlConnection.query(sql, [announcement.id, announcement.text, announcement.date], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});

//Statistics***************************************************************

//Get all statistics
app.get('/statistics', (req, res) => {
    mysqlConnection.query('SELECT * FROM statistics', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
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


