const express = require("express");
const router = express.Router();
const path = require('path') ;
const multer = require('multer');
const mysqlConnection = require("../../config/db");

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

router.post('/', upload, (req,res,err) => {
    console.log(req.file);
    var sql = "INSERT INTO `bilsportdb`.`file`(`name`, `path`) VALUES(?,?);";
    mysqlConnection.query(sql, [req.file.originalname,req.file.path], (err, rows, fields) => {
        if (!err)
            res.send('Inserted file name: ' + req.file.originalname);
        else
            console.log(err);
    });
});

router.get('/:name', (req, res) => {
    mysqlConnection.query('SELECT path FROM file WHERE name = ?', [req.params.name], (err, rows, fields) => {
        if (!err){
            res.download(rows[0].path);
        }  
        else
            console.log(err);
    });
});

module.exports = router;