import React, { useState } from "react";
import ApiService from "../../services/ApiService";
import "./Login.css";
import Card from "../../components/Card/Card";

const Login = (props) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

  const login = () => {
    setData([]);

    const data = {
      user,
      password,
    };

    const response = ApiService.getLogin(data);
    response.then((data) => {
      if (data.code === 200) {
        setMessage("[CODE: 200]: Proceso OK ");
        setToken(data.token);
      } else {
        setMessage(`[CODE: ${data.code}]:  ${data.error}`);
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
      }
    });
  };

  const changeHandler = (event) => {
    setMessage("");
    if (event.target.name === "user") {
      setUser(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  const listItems = data.map((item) => <li key={item.id}>{item.nombre}</li>);

  return (
    <Card>
      <div>
        <div>
          Usuario: <input type="text" name="user" id="user" onChange={changeHandler} />
        </div>
        <div>
          Clave: <input type="text" name="password" id="password" onChange={changeHandler} />
        </div>
        <button onClick={login}>Login</button>
      </div>
      <div>
        <button onClick={dataHandler}>Consultar Alumnos</button>
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
