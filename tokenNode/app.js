const express = require("express");
const http = require("http");
require("dotenv").config();
const cors = require("cors");

const app = express();

const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.static(__dirname + "/public"));

const corsOptions = {
  origin: "http://localhost:" + process.env.PORT,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.set("key", process.env.TOKEN_SECRET);

app.use("/api", require("./routes/route"));

http.createServer(app).listen(process.env.PORT, () => {
  console.log("Server iniciado en  http://localhost:", process.env.PORT);
});
