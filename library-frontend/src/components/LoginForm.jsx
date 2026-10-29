import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../queries";

const LoginForm = ({ show, setError, setToken, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value;
      setToken(token);
      localStorage.setItem("phonebook-user-token", token);
      setPage("authors");
      setUsername("");
      setPassword("");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  if (!show) {
    return null;
  }

  const submit = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
