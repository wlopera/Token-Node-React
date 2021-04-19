import React, { useState } from "react";
import ApiService from "../../services/ApiService";
import "./Login.css";
import Card from "../../components/Card/Card";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

  const login = () => {
    setData([]);

    const data = {
      username,
      password,
    };

    const response = ApiService.getLogin(data);
    response.then((data) => {
      if (data.code === 200) {
        setMessage("[CODE: 200]: Proceso OK ");
        setToken(data.token);
      } else {
        setMessage(`[CODE: ${data.code}]:  ${data.error}`);
        setToken("");
      }
    });
  };

  const dataHandler = () => {
    setData([]);
    const response = ApiService.getData(token);
    response.then((data) => {
      if (data.code === 200) {
        setData(data.datos);
        setMessage("[CODE: 200]: Proceso OK ");
      } else {
        setMessage(`[CODE: ${data.code}]:  ${data.error}`);
        setData([]);
      }
    });
  };

  const changeHandler = (event) => {
    setMessage("");
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  const sendEmailChandler = () => {
    const input = {
      token,
      fromEmail: "lopera.william@gmail.com",
      toEmail: "william.lopera@pranical.com",
      subject: "Envio de correo desde React-NodeJS",
      html: "<p> Esto es un párrafo con el cuerpo del mensaje, <span>bla, bla, bla.</span> </p>",
    };

    const response = ApiService.sendEmail(input);
    response.then((data) => {
      console.log("Envio de correo: ", data);
      if (data.code === 200) {
        setMessage(`[CODE: ${data.code}]: ${data.message}`);
      } else {
        setMessage(`[CODE: ${data.code}]:  ${data.error}`);
      }
    });
  };

  const listItems = data.map((item) => <li key={item.id}>{item.nombre}</li>);

  return (
    <Card>
      <div>
        <div>
          Usuario: <input type="text" name="username" id="username" onChange={changeHandler} />
        </div>
        <div>
          Clave: <input type="text" name="password" id="password" onChange={changeHandler} />
        </div>
        <button onClick={login}>Login</button>
      </div>
      <div>
        <button onClick={dataHandler}>Consultar Alumnos</button>
      </div>
      <div>
        <button onClick={sendEmailChandler}>Enviar Correo</button>
      </div>
      <div className="data">
        <ul>{listItems}</ul>
      </div>
      <div>
        <span>{message}</span>
      </div>
    </Card>
  );
};

export default Login;
