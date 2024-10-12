const express = require("express");
const dotenv = require("dotenv").config();

const app = express();
const SERVER_PORT = dotenv.parsed?.SERVER_PORT ?? 3456;
const apiRoutes = require("./src/api_routes");

app.use("/portfolio-api", apiRoutes);

app.listen(SERVER_PORT, '0.0.0.0', (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running and App is listening on port : " +
        SERVER_PORT
    );
  else console.log("Error occurred, server can't start", error);
});
