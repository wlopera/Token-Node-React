// import axios from "axios";
import { API_NODE_URL } from "./config";

class ApiService {
  // Conectarse al servidor (obtener el token dado usario y clave)
  getLogin = async (input) => {
    try {
      const response = await fetch(`${API_NODE_URL}/api/v1/token/login`, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.log("Error getLogin ", error);
    }
  };

  // Enviar correo
  sendEmail = async (input) => {
    console.log("Data correo: ", JSON.stringify(input));
    try {
      const response = await fetch(`${API_NODE_URL}/api/v1/token/sendEmail`, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
          authorization: input.token,
        },
      });
      const json = await response.json();

      return json;
    } catch (error) {
      console.log("Error sendEmail ", error);
    }
  };

  // Consultar lista de valores de prueba
  getData = async (token) => {
    try {
      const response = await fetch(`${API_NODE_URL}/api/v1/token/data`, {
        method: "GET",
        headers: {
          authorization: token,
        },
      });
      const json = await response.json();

      return json;
    } catch (error) {
      console.log("Error getData ", error);
    }
  };
}

export default new ApiService();
