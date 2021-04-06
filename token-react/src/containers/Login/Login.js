import React, { useState } from "react";

const Login = (props) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const login = () => {
    const data = {
      user: "wlopera",
      password: "12345",
    };

    fetch("http://localhost:8001/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((result) => {
        console.info("Result: ", result);
        setToken(result.token);
      });
    });
  };

  const datos = () => {
    fetch("http://localhost:8001/data", {
      method: "GET",
      headers: {
        authorization: token,
      },
    }).then((response) => {
      response.json().then((result) => {
        console.info("Result: ", result);
        setToken(result);
      });
    });
  };

  return (
    <div>
      <div>
        <div>
          Usuario: <input type="text" name="user" id="user" onChange={(event) => setUser(event.target.value)} />
        </div>
        <div>
          Clave:{" "}
          <input type="text" name="password" id="password" onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button onClick={login}>Login</button>
      </div>
      <div>
        <button onClick={datos}>Consultar Datos</button>
      </div>
    </div>
  );
};

export default Login;
