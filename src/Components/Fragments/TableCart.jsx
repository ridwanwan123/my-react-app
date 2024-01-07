/* eslint-disable react/prop-types */
import { useEffect, useRef, useContext } from "react";
import { useSelector } from "react-redux";
import { DarkMode } from "../../context/DarkMode";
import {
  useTotalPrice,
  useTotalPriceDispatch,
} from "../../context/TotalPriceContext";

const TableCart = (props) => {
  const { products } = props;
  const cart = useSelector((state) => state.cart.data);
  const dispatch = useTotalPriceDispatch();
  const { total } = useTotalPrice();
  const { isDarkMode } = useContext(DarkMode);

  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        return acc + product.price * item.qty;
      }, 0);
      dispatch({
        type: "UPDATE",
        payload: {
          total: sum,
        },
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, products]);

  const totalPriceRef = useRef(null);

  useEffect(() => {
    if (cart.length > 0) {
      totalPriceRef.current.style.display = "table-row";
    } else {
      totalPriceRef.current.style.display = "none";
    }
  });

  return (
    <table
      className={`min-w-max text-center py-2 mt-3 px-2 border border-gray-300 ${
        isDarkMode && "text-white"
      }`}
    >
      <thead
        className={`bg-gray-100 ${isDarkMode && "text-white bg-slate-700"}`}
      >
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
            const product = products.find((product) => product.id === item.id);
            return (
              <tr key={item.id} className="border-t">
                <td className="py-2 px-2">{product.title.substring(0, 20)}</td>
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
            {total.toLocaleString("en-US", {
              styles: "currency",
              currency: "USD",
            })}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableCart;
