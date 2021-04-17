const jwt = require("jsonwebtoken");
const router = require("express").Router();

/**
 * Conexion por login
 */
exports.getLogin = async (req, res) => {
  console.log(111, req.body);
  const username = req.body.user;
  const password = req.body.password;

  console.log("user/password: ", username, "/", password);

  if (!(username === "wlopera" && password === "12345")) {
    res.status(401).send({
      error: "Usuario o contraseña inválidos",
      code: 401,
    });
    return;
  }

  const tokenData = {
    username: username,
    // ANY DATA
  };

  const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
    //expiresIn: 60 * 60 * 24, // expira en 24 horas
    expiresIn: 30 * 1 * 1, // expira en 30 segundos
  });

  res.send({
    token,
    code: 200,
  });
};

/**
 * Probar token valido
 */
exports.getSecure = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).send({
      error: "Es necesario el token de autenticación",
      code: 403,
    });
    return;
  }

  token = token.replace("Bearer ", "");

  jwt.verify(token, process.env.TOKEN_SECRET, function (err, user) {
    if (err) {
      res.status(401).send({
        error: "Token inválido",
        code: "401",
      });
    } else {
      res.send({
        message: "Awwwww yeah!!!!",
        code: "200",
      });
    }
  });
};

/**
 * Obtener datos
 */
exports.getData = async (req, res) => {
  const datos = [
    { id: 1, nombre: "Andrés" },
    { id: 2, nombre: "Daniel" },
    { id: 3, nombre: "Camila" },
    { id: 4, nombre: "Carlos" },
    { id: 5, nombre: "William" },
  ];

  res.json({ datos, code: 200 });
};

/**
 * Intermediario para validar solicitud
 */

exports.middleware = async (req, res, next) => {
  console.log(222, req.headers);
  const token = req.headers["authorization"];

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválido", code: 401 });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      error: "Token no provisto.",
      code: 402,
    });
  }
};
