import Button from "../Elements/Button";
import InputForm from "../Elements/Input";

const FormLogin = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("email", e.target.email.value);
    localStorage.setItem("password", e.target.password.value);
    window.location.href = "/products";
  };

  return (
    <form onSubmit={handleLogin}>
      <InputForm
        label="Email"
        name="email"
        type="email"
        placeholder="Enter Your Email"
      />

      <InputForm
        label="Password"
        name="password"
        type="password"
        placeholder="Enter Your Password"
      />

      <Button variant="bg-blue-600 w-full" type="submit">
        Login
      </Button>
    </form>
  );
};

export default FormLogin;
