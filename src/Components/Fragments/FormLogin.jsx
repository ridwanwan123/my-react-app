import { login } from "../../service/auth.service";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input";
import { useEffect, useRef, useState } from "react";

const FormLogin = () => {
  const [loginFailed, setLoginFailed] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    login(data, (status, res) => {
      if (status) {
        localStorage.setItem("token", res);
        window.location.href = "/products";
      } else {
        setLoginFailed(res.response.data);
      }
    });
  };

  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleLogin}>
      <InputForm
        label="Username"
        name="username"
        type="text"
        placeholder="Enter Your username"
        ref={usernameRef}
      />

      <InputForm
        label="Password"
        name="password"
        type="password"
        placeholder="Enter Your Password"
      />
      {loginFailed && <p className="text-red-500 -mt-5 mb-5">{loginFailed}</p>}
      <Button variant="bg-blue-600 w-full" type="submit">
        Login
      </Button>
    </form>
  );
};

export default FormLogin;
