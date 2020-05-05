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


const path = require('path') ;


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












module.exports = app;
/////insert masa tenisi yanlış
// announcement takvim ayarlanıcak
// turnuva sadece participant eklendi takımlı turnuvalar ne olucak