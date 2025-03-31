import React, { useState, useEffect, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRouting from "./Routing/AllRouting";
import setAuthToken from "./utils/setAuthToken";
import { getToken, getUser } from "./services/UserServices";
import {
  addToCartAPI,
  decreaseCartAPI,
  getCartAPI,
  increaseCartAPI,
  removeFromCartAPI,
} from "./services/cartServices";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "./contexts/UserContext";
import CartContext from "./contexts/CartContext";
import useData from "./hooks/useData";

setAuthToken(getToken());

const App = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const addToCart = useCallback(
    (product, quantity) => {
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        (item) => item.product._id === product._id
      );

      if (productIndex === -1) {
        updatedCart.push({ product: product, quantity: quantity });
      } else {
        updatedCart[productIndex].quantity += quantity;
      }

      setCart(updatedCart);

      addToCartAPI(product._id, quantity)
        .then((response) => {
          toast.success("Product added to cart successfully!");
        })
        .catch((error) => {
          toast.error("Failed to add product to cart.");
          setCart(cart);
        });
    },
    [cart]
  );

  const getCart = useCallback(() => {
    getCartAPI()
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        toast.error("Failed to fetch cart.");
      });
  }, [user]);

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  const removeFromCart = useCallback(
    (productId) => {
      const oldCart = [...cart];
      const newCart = oldCart.filter((item) => item.product._id !== productId);
      setCart(newCart);
      removeFromCartAPI(productId).catch((error) => {
        toast.error("Failed to remove product from cart.");
        setCart(oldCart);
      });
    },
    [cart]
  );

  const updateCart = useCallback(
    (type, productId) => {
      const oldCart = [...cart];
      const updatedCart = [...cart];
      const toUpdate = updatedCart.findIndex(
        (item) => item.product._id === productId
      );
      if (type === "increase") {
        updatedCart[toUpdate].quantity += 1;
        setCart(updatedCart);
        increaseCartAPI(productId).catch((error) => {
          toast.error("Failed to increase product quantity.");
          setCart(oldCart);
        });
      }
      if (type === "decrease") {
        updatedCart[toUpdate].quantity -= 1;
        setCart(updatedCart);
        decreaseCartAPI(productId).catch((error) => {
          toast.error("Failed to decrease product quantity.");
          setCart(oldCart);
        });
      }
    },
    [cart]
  );

  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart, setCart }}
      >
        <div className="app">
          <Navbar />
          <main>
            <ToastContainer position="bottom-right" />
            <AllRouting />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
