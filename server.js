const http = require("http");
const app = require("./app");


const port = process.env.PORT || 8081;

const server = http.createServer(app);

server.listen(port, (err) => {
    console.log("Server is running at port 8081");
});