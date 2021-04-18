const TokenService = require("../services/TokenService");

const jwt = require("jsonwebtoken");

const router = require("express").Router();

/**
 * Conexion por login
 */
exports.getLogin = async (req, res) => {
  const service = new TokenService();

  try {
    const result = await service.getLogin({
      ...req.body,
    });
    console.log("Servicio geLogin: ", result);
    res.send(result);
    return result;
  } catch (err) {
    console.log("Error getLogin", err);
    return res.send(err);
  }
};

/**
 * Probar token valido
 */
exports.getSecure = async (req, res) => {
  const service = new TokenService();

  try {
    const result = await service.getSecure({
      ...req.body,
    });
    console.log("Servicio getSecure: ", result);
    res.send(result);
    return result;
  } catch (err) {
    console.log("Error getSecure", err);
    return res.send(err);
  }
};

/**
 * Obtener datos
 */
exports.getData = async (req, res) => {
  const service = new TokenService();

  try {
    const result = await service.getData({
      ...req.body,
    });
    console.log("Servicio getData: ", result);
    res.send(result);
    return result;
  } catch (err) {
    console.log("Error getData", err);
    return res.send(err);
  }
};

/**
 * Intermediario para validar solicitud
 */
exports.middleware = async (req, res, next) => {
  const service = new TokenService();

  try {
    const result = await service.middleware({
      ...req.headers,
    });
    console.log("Servicio middleware: ", result);
    if (result.code === 200) {
      req.decoded = result;
      next();
    } else {
      return res.send(result);
    }
  } catch (err) {
    console.log("Error middleware", err);
    return res.send(err);
  }
};
