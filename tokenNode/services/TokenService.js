const jwt = require("jsonwebtoken");
const router = require("express").Router();

class tokenServices {
  constructor() {}

  /**
   * Conexion por login
   */
  getLogin(...data) {
    return new Promise((resolve, reject) => {
      try {
        const username = data[0].username;
        const password = data[0].password;

        console.log("user/password: ", username, "/", password);

        if (!(username === "wlopera" && password === "12345")) {
          const result = {
            error: "Usuario o contraseña inválidos",
            code: 401,
          };
          resolve(result);
        } else {
          const tokenData = {
            username: username,
            // Otros datos
          };

          const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
            //expiresIn: 60 * 60 * 24, // expira en 24 horas
            expiresIn: 30 * 1 * 1, // expira en 30 segundos
          });

          const result = {
            token,
            code: 200,
          };
          resolve(result);
        }
      } catch (e) {
        console.log(e);
        reject(err);
      }
    });
  }

  /**
   * Probar token valido
   */
  getSecure(...data) {
    return new Promise((resolve, reject) => {
      try {
        const token = data[0].headers["authorization"];
        if (!token) {
          const result = {
            error: "Es necesario el token de autenticación",
            code: 403,
          };
          resolve(result);
        } else {
          token = token.replace("Bearer ", "");

          jwt.verify(token, process.env.TOKEN_SECRET, function (err, user) {
            if (err) {
              const result = {
                error: "Token inválido",
                code: "401",
              };
              resolve(result);
            } else {
              const result = {
                message: "Awwwww yeah!!!!",
                code: "200",
              };
              resolve(result);
            }
          });
        }
      } catch (e) {
        console.log(e);
        reject(err);
      }
    });
  }

  /**
   * Obtener datos
   */
  getData(...data) {
    return new Promise((resolve, reject) => {
      try {
        const datos = [
          { id: 1, nombre: "Andrés" },
          { id: 2, nombre: "Daniel" },
          { id: 3, nombre: "Camila" },
          { id: 4, nombre: "Carlos" },
          { id: 5, nombre: "William" },
        ];

        const result = { datos, code: 200 };
        resolve(result);
      } catch (e) {
        console.log(e);
        reject(err);
      }
    });
  }

  /**
   * Intermediario para validar solicitud
   */
  middleware(...data) {
    return new Promise((resolve, reject) => {
      try {
        const token = data[0].authorization;

        if (token) {
          jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
              const result = { mensaje: "Token inválido", code: 401 };
              resolve(result);
            } else {
              const result = { decoded: decoded, code: 200 };
              resolve(result);
            }
          });
        } else {
          const result = {
            error: "Token no provisto.",
            code: 402,
          };
          resolve(result);
        }
      } catch (e) {
        console.log(e);
        reject(err);
      }
    });
  }
}

module.exports = tokenServices;
