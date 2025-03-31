import React, { useContext, useMemo, memo } from "react";

import UserContext from "../../contexts/UserContext";
import "./CartPage.css";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import remove from "../../assets/remove.png";
import CartContext from "../../contexts/CartContext";
import { checkoutAPI } from "../../services/orderServices";
import { toast } from "react-toastify";
import config from "../../config.json";

const CartPage = () => {
  // const [subTotal, setSubTotal] = useState(0);
  const user = useContext(UserContext);
  const { cart, removeFromCart, updateCart, setCart } = useContext(CartContext);

  const total = useMemo(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  }, [cart]);

  // useEffect(() => {
  //   let total = 0;
  //   cart.forEach((item) => {
  //     total += item.product.price * item.quantity;
  //   });
  //   setSubTotal(total);
  // }, [cart]);

  const checkout = () => {
    // const oldCart = [...cart];
    setCart([]);
    checkoutAPI()
      .then(() => {
        toast.success("Order placed successfully");
      })
      .catch((error) => {
        toast.error("Failed to place order");
        setCart(cart);
      });
  };

  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img
          src={`${config.backendURL}/profile/${user?.profilePic}`}
          alt="user profile"
        />
        <div>
          <p className="user_name">{user?.name}</p>
          <p className="user_email">{user?.email}</p>
        </div>
      </div>

      <Table headings={["Item", "Prise", "Quantity", "Total", "Remove"]}>
        <tbody>
          {cart.map((item, index) => (
            <tr key={item._id || index}>
              <td>{item.product.title}</td>
              <td>${item.product.price}</td>
              <td className="align_center table_quantity_input">
                <QuantityInput
                  quantity={item.quantity}
                  stock={item.product.stock}
                  setQuantity={updateCart}
                  productId={item.product._id}
                  cartPage
                />
              </td>
              <td>${item.product.price * item.quantity}</td>
              <td>
                <img
                  src={remove}
                  alt="remove icon"
                  className="cart_remove_icon"
                  onClick={() => removeFromCart(item.product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <table className="cart_bill">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>${total}</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>$5</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Total</td>
            <td>${total + 5}</td>
          </tr>
        </tbody>
      </table>

      <button className="search_button checkout_button" onClick={checkout}>
        Checkout
      </button>
    </section>
  );
};

export default memo(CartPage);
