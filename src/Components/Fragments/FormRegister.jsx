import Button from "../Elements/Button";
import InputForm from "../Elements/Input";

const FormRegister = () => {
  return (
    <form action="">
      <InputForm
        label="Fullname"
        name="name"
        type="text"
        placeholder="Enter Your Fullname"
      />

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

      <InputForm
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        placeholder="Enter Your Confirm Password"
      />

      <Button variant="bg-blue-600 w-full">Register</Button>
    </form>
  );
};

export default FormRegister;
