const express = require("express");
const http = require("http");
require("dotenv").config();
const cors = require("cors");

const app = express();

const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10mb" }));

//module.exports = {
//    key: "Secret Password"
//}

const corsOptions = {
  origin: "http://localhost:" + process.env.PORT,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.set("key", process.env.TOKEN_SECRET);

app.post("/login", (req, res) => {
  console.log(111, req.body);
  const username = req.body.user;
  const password = req.body.password;

  console.log("user/password: ", username, "/", password);

  if (!(username === "wlopera" && password === "12345")) {
    res.status(401).send({
      error: "usuario o contraseña inválidos",
    });
    return;
  }

  const tokenData = {
    username: username,
    // ANY DATA
  };

  const token = jwt.sign(tokenData, app.get("key"), {
    //expiresIn: 60 * 60 * 24, // expira en 24 horas
    expiresIn: 60 * 1 * 1, // expira en 60 segundos
  });

  res.send({
    token,
  });
});

app.get("/secure", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).send({
      error: "Es necesario el token de autenticación",
    });
    return;
  }

  token = token.replace("Bearer ", "");

  jwt.verify(token, app.get("key"), function (err, user) {
    if (err) {
      res.status(401).send({
        error: "Token inválido",
      });
    } else {
      res.send({
        message: "Awwwww yeah!!!!",
      });
    }
  });
});

const middleware = express.Router();
middleware.use((req, res, next) => {
  console.log(222, req.headers);
  const token = req.headers["authorization"];

  if (token) {
    jwt.verify(token, app.get("key"), (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválido" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      mensaje: "Token no provisto.",
    });
  }
});

app.get("/data", middleware, (req, res) => {
  const datos = [
    { id: 1, nombre: "Andrés" },
    { id: 2, nombre: "Daniel" },
    { id: 3, nombre: "Camila" },
    { id: 4, nombre: "Carlos" },
    { id: 5, nombre: "William" },
  ];

  res.json(datos);
});

app.get("/", (req, res) => {
  res.status(200).send("Prueba de API REST");
});

http.createServer(app).listen(process.env.PORT, () => {
  console.log("Server iniciado en  http://localhost:", process.env.PORT);
});
