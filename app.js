const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');


const announcementRoutes = require("./api/routes/announcements");
const statisticsRoutes = require("./api/routes/statistics");
const poolRoutes = require("./api/routes/pool");
const squashRoutes = require("./api/routes/squash");
const tennisRoutes = require("./api/routes/tennis");
const footballRoutes = require("./api/routes/football");
const registerRoutes = require("./api/routes/register");
const accountRoutes = require("./api/routes/account");
const loginRoutes = require("./api/routes/login");
const file = require("./api/routes/fileUpload");


app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","http://localhost:8081");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({}); 
    } next();

});

app.use("/announcements",announcementRoutes);
app.use("/statistics",statisticsRoutes);
app.use("/pool",poolRoutes);
app.use("/squash",squashRoutes);
app.use("/tennis",tennisRoutes);
app.use("/football",footballRoutes);
app.use("/register",registerRoutes);
app.use("/account",accountRoutes);
app.use("/login",loginRoutes);
app.use("/upload",file);

//Error Handling
app.use((req,res,next) =>{
    const error = new Error("Not Found");
    error.status(404);
    next(error);
});
//Display error
app.use((req,res,next) => {
    res.status(err.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
});







// //display session
// app.get('/sessionInfo', function(req, res) {
//     if(req.session.id){
//         return res.send("session info: "+req.session.bilkentId);
//     }
//     res.send("no session");
//  });


// // Logout
// app.post('/logout', function(req, res) {
//    req.session.destroy();
//    res.end();
// });







// //Get all table tennis participant
// app.get('/tabletennis', (req, res) => {
//     mysqlConnection.query('SELECT * FROM tennis', (err, rows, fields) => {
//         if (!err)
//             res.send(rows);
//         else
//             console.log(err);
//     });
// });

// //Get a table tennis participant
// app.get('/tabletennis/:id', (req, res) => {
//     mysqlConnection.query('SELECT * FROM tennis WHERE id = ?', [req.params.id], (err, rows, fields) => {
//         if (!err)
//             res.send(rows);
//         else
//             console.log(err);
//     });
// });


// //Delete a  table tennis participant
// app.delete('/tabletennis/:id', (req, res) => {
//     mysqlConnection.query('DELETE FROM tennis WHERE id = ?', [req.params.id], (err, rows, fields) => {
//         if (!err)
//             res.send('Deleted successfully');
//         else
//             console.log(err);
//     });
// });


// //Insert a table tennis participant
// app.post('/tabletennis', (req, res) => {
//     let tabletennis = req.body;
//     var sql = "SET @id = ?; SET @court = ? ;SET @campus = ?;CALL insertTennisProcedure(@id, @court,@campus);";
//     mysqlConnection.query(sql, [tabletennis.id, tabletennis.court, tabletennis.campus], (err, rows, fields) => {
//         if (!err)
//             res.send('Inserted table tennis participant id: ' + tabletennis.id);
//         else
//             console.log(err);
//     });
// });


// //Update a table tennis participant
// app.put('/tabletennis', (req, res) => {
//     let tabletennis = req.body;
//     var sql = "SET @id = ?; SET @court = ?; SET @campus = ?;CALL updateTennisProcedure(@id, @court,@campus);";
//     mysqlConnection.query(sql, [tennis.id, tennis.court, tennis.campus], (err, rows, fields) => {
//         if (!err)
//             res.send('Updated successfully');
//         else
//             console.log(err);
//     });
// });












module.exports = app;
/////insert masa tenisi yanlış
// announcement takvim ayarlanıcak
// turnuva sadece participant eklendi takımlı turnuvalar ne olucak