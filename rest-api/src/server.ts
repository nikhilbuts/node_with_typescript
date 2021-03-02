import app from "./app";
import http from "http";

// Create server using express app
const server = http.createServer(app);
server.listen(app.get("port"), app.get("hostname"));

console.info(`app is running on port : ${app.get("port")}`);
