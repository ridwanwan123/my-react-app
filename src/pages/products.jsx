/* eslint-disable react/jsx-key */
import { useEffect, useRef, useState } from "react";
import Button from "../Components/Elements/Button";
import CardProduct from "../Components/Fragments/CardProduct";
import { getProducts } from "../service/product.service";
import { getUsername } from "../service/auth.service";

const ProductsPage = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUsername(getUsername(token));
    } else {
      window.location.href = "/login";
    }
  });

  useEffect(() => {
    getProducts((data) => {
      setProducts(data);
    });
  }, []);

  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        return acc + product.price * item.qty;
      }, 0);
      setTotalPrice(sum);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, products]);

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

  // useRef
  const cartRef = useRef(JSON.parse(localStorage.getItem("cart")) || []);

  const handleAddToCartRef = (id) => {
    cartRef.current = [...cart.current, { id, qty: 1 }];
    localStorage.setItem("cart", JSON.stringify(cartRef.current));
  };

  const totalPriceRef = useRef(null);

  useEffect(() => {
    if (cart.length > 0) {
      totalPriceRef.current.style.display = "table-row";
    } else {
      totalPriceRef.current.style.display = "none";
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <div className="flex justify-end h-20 bg-blue-600 text-white items-center px-10 ">
        <p className="mr-4">{username}</p>
        <Button variant="bg-black" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="flex justify-center py-20">
        <div className="w-3/4 flex flex-wrap">
          {products.length > 0 &&
            products.map((product) => (
              <CardProduct key={product.id}>
                <CardProduct.Header image={product.image} />
                <CardProduct.Body name={product.title}>
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
              {products.length > 0 &&
                cart.map((item) => {
                  const product = products.find(
                    (product) => product.id === item.id
                  );
                  return (
                    <tr key={item.id} className="border-t">
                      <td className="py-2 px-2">
                        {product.title.substring(0, 20)}
                      </td>
                      <td className="py-2 px-2">
                        ${" "}
                        {product.price.toLocaleString("en-US", {
                          styles: "currency",
                          currency: "USD",
                        })}
                      </td>
                      <td className="py-2 px-2">{item.qty}</td>
                      <td className="py-2 px-2">
                        ${" "}
                        {(product.price * item.qty).toLocaleString("en-US", {
                          styles: "currency",
                          currency: "USD",
                        })}
                      </td>
                    </tr>
                  );
                })}
              <tr ref={totalPriceRef}>
                <td colSpan={3} className="font-bold">
                  Total Price
                </td>
                <td className="font-bold">
                  ${" "}
                  {totalPrice.toLocaleString("en-US", {
                    styles: "currency",
                    currency: "USD",
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
