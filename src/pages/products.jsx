/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import Button from "../Components/Elements/Button";
import CardProduct from "../Components/Fragments/CardProduct";
import Counter from "../Components/Fragments/Counter";

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
];

const email = localStorage.getItem("email");

const ProductsPage = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = dataProducts.find((product) => product.id === item.id);
        return acc + product.price * item.qty;
      }, 0);
      setTotalPrice(sum);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const handleAddToCart = (id) => {
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      // Jika produk sudah ada di dalam keranjang, tambahkan qty
      const updatedCart = cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      );
      setCart(updatedCart);
    } else {
      // Jika produk belum ada di dalam keranjang, tambahkan produk baru
      setCart([
        ...cart,
        {
          id,
          qty: 1,
        },
      ]);
    }
  };

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
              <CardProduct.Footer
                price={product.price}
                id={product.id}
                addToCart={handleAddToCart}
              />
            </CardProduct>
          ))}
        </div>
        <div className="w-1/2">
          <div className="text-3xl font-bold text-blue-600">Cart</div>
          <table className="min-w-max text-center py-2 mt-3 px-2 bg-white border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2">Product</th>
                <th className="py-2">Price</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                const product = dataProducts.find(
                  (product) => product.id === item.id
                );
                return (
                  <tr key={item.id} className="border-t">
                    <td className="py-2 px-2">{product.name}</td>
                    <td className="py-2 px-2">
                      Rp{" "}
                      {product.price.toLocaleString("id-ID", {
                        styles: "currency",
                        currency: "IDR",
                      })}
                    </td>
                    <td className="py-2 px-2">{item.qty}</td>
                    <td className="py-2 px-2">
                      Rp{" "}
                      {(product.price * item.qty).toLocaleString("id-ID", {
                        styles: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan={3} className="font-bold">
                  Total Price
                </td>
                <td className="font-bold">
                  Rp{" "}
                  {totalPrice.toLocaleString("id-ID", {
                    styles: "currency",
                    currency: "IDR",
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* <div className="mt-5 flex justify-center">
        <Counter></Counter>
      </div> */}
    </>
  );
};

export default ProductsPage;
