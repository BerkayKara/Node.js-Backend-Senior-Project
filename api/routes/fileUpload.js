const express = require("express");
const router = express.Router();
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

router.post('/', upload, (req,res,err) => {
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



module.exports = router;