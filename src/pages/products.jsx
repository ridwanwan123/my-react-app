/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import CardProduct from "../Components/Fragments/CardProduct";
import { getProducts } from "../service/product.service";
import { useLogin } from "../hooks/useLogin";
import TableCart from "../Components/Fragments/TableCart";
import { Navbar } from "../Components/Layouts/Navbar";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  useLogin();

  useEffect(() => {
    getProducts((data) => {
      setProducts(data);
    });
  }, []);

  // const handleAddToCart = (id) => {
  //   const existingItem = cart.find((item) => item.id === id);

  //   if (existingItem) {
  //     // Jika produk sudah ada di dalam keranjang, tambahkan qty
  //     const updatedCart = cart.map((item) =>
  //       item.id === id ? { ...item, qty: item.qty + 1 } : item
  //     );
  //     setCart(updatedCart);
  //   } else {
  //     // Jika produk belum ada di dalam keranjang, tambahkan produk baru
  //     setCart([
  //       ...cart,
  //       {
  //         id,
  //         qty: 1,
  //       },
  //     ]);
  //   }
  // };

  // useRef
  // const cartRef = useRef(JSON.parse(localStorage.getItem("cart")) || []);

  // const handleAddToCartRef = (id) => {
  //   cartRef.current = [...cart.current, { id, qty: 1 }];
  //   localStorage.setItem("cart", JSON.stringify(cartRef.current));
  // };

  return (
    <>
      <Navbar />
      <div className="flex justify-center py-20">
        <div className="w-3/4 flex flex-wrap">
          {products.length > 0 &&
            products.map((product) => (
              <CardProduct key={product.id}>
                <CardProduct.Header image={product.image} id={product.id} />
                <CardProduct.Body name={product.title}>
                  {product.description}
                </CardProduct.Body>
                <CardProduct.Footer price={product.price} id={product.id} />
              </CardProduct>
            ))}
        </div>
        <div className="w-1/2">
          <div className="text-3xl font-bold text-blue-600">Cart</div>
          <TableCart products={products} />
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
