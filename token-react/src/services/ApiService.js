// import axios from "axios";
import { API_NODE_URL } from "./config";

class ApiService {
  // Conectarse al servidor (obtener el token dado usario y clave)
  getLogin = async (input) => {
    try {
      const response = await fetch(`${API_NODE_URL}/login`, {
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

  // Consultar lista de valores de prueba
  getData = async (token) => {
    try {
      const response = await fetch(`${API_NODE_URL}/data`, {
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
