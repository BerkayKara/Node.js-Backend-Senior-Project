const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');


const announcementRoutes = require("./api/routes/announcements");
const eventRoutes = require("./api/routes/events");
const statisticsRoutes = require("./api/routes/statistics");

const poolRoutes = require("./api/routes/pool");
const reservePool = require("./api/routes/reservePool");
const squashRoutes = require("./api/routes/squash");
const reserveSquash = require("./api/routes/reserveSquash");
const tennisRoutes = require("./api/routes/tennis");
const reserveTennis = require("./api/routes/reserveTennis");
const footballRoutes = require("./api/routes/football");
const reserveFootball = require("./api/routes/reserveFootball");

const registerRoutes = require("./api/routes/register");
const accountRoutes = require("./api/routes/account");
const loginRoutes = require("./api/routes/login");
const file = require("./api/routes/fileUpload");
const tBadminton = require("./api/routes/tournaments/badminton");
const tSquash = require("./api/routes/tournaments/squash");
const tTableTennis = require("./api/routes/tournaments/tableTennis");
const tTennis = require("./api/routes/tournaments/tennis");
const basketball3 = require("./api/routes/tournaments/basketball3");
const basketball5 = require("./api/routes/tournaments/basketball5");
const volleyball4 = require("./api/routes/tournaments/volleyball4");
const volleyball6 = require("./api/routes/tournaments/volleyball6");
const football6 = require("./api/routes/tournaments/football6");
const authorize = require("./api/routes/authorize");
const tournaments = require("./api/routes/tournaments");
const enrollTournament = require("./api/routes/enrollTournament");
const courses = require("./api/routes/course");
const enrollCourse = require("./api/routes/enrollCourse");
const appointments = require("./api/routes/appointment");
const makeAppointments = require("./api/routes/makeAppointment");
const payments = require("./api/routes/payment");
const sportCourts = require("./api/routes/sportCourts");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Solution for CORS Policy Error
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({}); 
    } next();

});


app.use(express.static("public/uploads"));
app.use("/sportcourts",sportCourts);

app.use("/announcements",announcementRoutes);
app.use("/events",eventRoutes);
app.use("/statistics",statisticsRoutes);
app.use("/pool",poolRoutes);
app.use("/reservePool",reservePool);
app.use("/squash",squashRoutes);
app.use("/reserveSquash",reserveSquash);
app.use("/tennis",tennisRoutes);
app.use("/reserveFootball",reserveFootball);
app.use("/football",footballRoutes);
app.use("/reserveTennis",reserveTennis);



app.use("/register",registerRoutes);
app.use("/account",accountRoutes);
app.use("/login",loginRoutes);
app.use("/upload",file);
app.use("/tbadminton",tBadminton);
app.use("/tsquash",tSquash);
app.use("/ttabletennis",tTableTennis);
app.use("/ttennis",tTennis);
app.use("/basketball3",basketball3);
app.use("/basketball5",basketball5);
app.use("/volleyball4",volleyball4);
app.use("/volleyball6",volleyball6);
app.use("/football6",football6);
app.use("/authorize",authorize);
app.use("/tournaments",tournaments);
app.use("/enrollTournament",enrollTournament);
app.use("/courses",courses);
app.use("/enrollCourse",enrollCourse);
app.use("/appointments",appointments);
app.use("/makeAppointment",makeAppointments);
app.use("/payments",payments);

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


module.exports = app;