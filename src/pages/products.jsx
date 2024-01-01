/* eslint-disable react/jsx-key */
import { useState } from "react";
import Button from "../Components/Elements/Button";
import CardProduct from "../Components/Fragments/CardProduct";

const dataProducts = [
  {
    id: 1,
    image: "/images/iphone_14_pro_max.webp",
    name: "Iphone 14 Pro Max",
    price: 16000000,
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
    quibusdam placeat tempore inventore quaerat neque veritatis? Impedit,
    cumque! Reiciendis sunt cupiditate minima.`,
  },
  {
    id: 2,
    image: "/images/iphone_12_pro_max.webp",
    name: "Iphone 12 Pro Max",
    price: 13000000,
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
    quibusdam placeat tempore inventore quaerat neque veritatis? Impedit,
    cumque! Reiciendis sunt cupiditate minima.`,
  },
  // {
  //   id: 3,
  //   image: "/images/iphone_14_pro_max.webp",
  //   name: "Iphone 14 Pro Max",
  //   price: "Rp. 16.500.000",
  //   description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
  //   quibusdam placeat tempore inventore quaerat neque veritatis? Impedit,
  //   cumque! Reiciendis sunt cupiditate minima.`,
  // },
];

const email = localStorage.getItem("email");

const ProductsPage = () => {
  const [cart, setCart] = useState([
    {
      name: "Iphone 14 Pro Max",
      qty: 3,
    },
  ]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
      <div className="flex justify-end h-20 bg-blue-600 text-white items-center px-10 ">
        <p className="mr-4">{email}</p>
        <Button variant="bg-black" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="flex justify-center py-20">
        <div className="w-3/4 flex flex-wrap">
          {dataProducts.map((product) => (
            <CardProduct key={product.id}>
              <CardProduct.Header image={product.image} />
              <CardProduct.Body name={product.name}>
                {product.description}
              </CardProduct.Body>
              <CardProduct.Footer price={product.price} />
            </CardProduct>
          ))}
        </div>
        <div className="w-1/4">
          <div className="text-3xl font-bold text-blue-600">Cart</div>
          <ul>
            {cart.map((item) => (
              <li key={item.name}>{item.name}</li>
            ))}
          </ul>
        </div>

        <script async src="https://www.tiktok.com/embed.js"></script>
      </div>
    </>
  );
};

export default ProductsPage;
