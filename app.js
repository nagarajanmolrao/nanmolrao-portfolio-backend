const express = require("express");
const dotenv = require("dotenv").config();

const app = express();
const SERVER_PORT = dotenv.parsed?.SERVER_PORT ?? 3456;
const apiRoutes = require("./src/api_routes");

// Middleware to check allowed origins
const allowedOrigins = ['http://localhost', 'http://nanmolrao.in', 'https://nanmolrao.in'];

const checkOrigin = (req, res, next) => {
  const origin = req.headers.origin || req.headers.referer;
  if (!origin || allowedOrigins.includes(origin)) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
};

// Middleware to check allowed IP addresses
const allowedIPs = ['127.0.0.1', '::1']; // Add more IPs if needed

const checkIP = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
  if (allowedIPs.includes(ip)) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
};

// Apply the security middleware
app.use(checkOrigin);
app.use(checkIP);

app.use("/portfolio-api", apiRoutes);

app.listen(SERVER_PORT, '0.0.0.0', (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running and App is listening on port : " +
        SERVER_PORT
    );
  else console.log("Error occurred, server can't start", error);
});