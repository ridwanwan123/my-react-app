import { useSelector } from "react-redux";
import { useEffect, useState, useContext } from "react";
import { useLogin } from "../../hooks/useLogin";
import Button from "../Elements/Button";
import { DarkMode } from "../../context/DarkMode";
import { useTotalPrice } from "../../context/TotalPriceContext";

export const Navbar = () => {
  const [totalCart, setTotalCart] = useState(0);
  const cart = useSelector((state) => state.cart.data);
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);
  const { total } = useTotalPrice();

  useEffect(() => {
    const sum = cart.reduce((acc, item) => {
      return acc + item.qty;
    }, 0);
    setTotalCart(sum);
  }, [cart]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const username = useLogin();
  return (
    <div className="flex justify-end h-20 bg-blue-600 text-white items-center px-10 ">
      <p className="mr-4">{username}</p>

      <Button variant="bg-black" onClick={handleLogout}>
        Logout
      </Button>
      <div className="flex items-center bg-gray-800 p-2 rounded-md ml-5 mr-5">
        Item: {totalCart} | Price : ${total}
      </div>
      <Button
        variant="bg-black px-10 mx-5 text-white rounded"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? "Light" : "Dark"}
      </Button>
    </div>
  );
};
