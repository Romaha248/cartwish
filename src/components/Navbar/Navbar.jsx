import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";

import "./Navbar.css";
import LinkWithIcon from "./LinkWithIcon";
import rocket from "../../assets/rocket.png";
import star from "../../assets/glowing-star.png";
import idButton from "../../assets/id-button.png";
import memo from "../../assets/memo.png";
import order from "../../assets/package.png";
import lock from "../../assets/locked.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import CartContext from "../../contexts/CartContext";
import { getSuggestionAPI } from "../../services/productServices";
// import { toast } from "react-toastify";

const Navbar = () => {
  const user = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const navigate = useNavigate();

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   const search = e.target.elements.search.value;
  // const prod = data?.products;
  // const searchProd = prod.filter((product) =>
  //   product.title.toLowerCase().includes(search.toLowerCase())
  // );
  //   return search.length > 0
  //     ? navigate(`/products?search=${search}`)
  //     : toast.warning("No products found. Please try a different search term.");
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
      // setSearch("");
    }
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (selectedItem < suggestions.length) {
      if (e.key === "ArrowDown") {
        setSelectedItem((prev) =>
          prev === suggestions.length - 1 ? 0 : prev + 1
        );
      } else if (e.key === "ArrowUp") {
        setSelectedItem((prev) =>
          prev === 0 ? suggestions.length - 1 : prev - 1
        );
      } else if (e.key === "Enter" && selectedItem > -1) {
        const suggestion = suggestions[selectedItem];
        navigate(`/products?search=${suggestion.title}`);
        setSearch("");
        setSuggestions([]);
      }
    } else {
      setSelectedItem(-1);
    }
  };

  useEffect(() => {
    const delaySuggesions = setTimeout(() => {
      if (search.trim() !== "") {
        getSuggestionAPI(search)
          .then((res) => setSuggestions(res.data))
          .catch((error) => console.error(error));
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delaySuggesions);
  }, [search]);

  return (
    <motion.nav
      className="align_center navbar"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="align_center">
        <h1 className="navbar_heading">CartWish</h1>
        <form className="align_center navbar_form" onSubmit={handleSubmit}>
          <input
            type="text"
            // name="search"
            className="navbar_search"
            placeholder="Search for products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="submit" className="search_button">
            Search
          </button>

          {suggestions.length > 0 && (
            <ul className="search_result">
              {suggestions.map((suggestion, index) => (
                <li
                  className={
                    selectedItem === index
                      ? "search_suggestion_link active"
                      : "search_suggestion_link"
                  }
                  key={suggestion._id}
                >
                  <Link
                    to={`/products?search=${suggestion.title}`}
                    onClick={() => {
                      setSearch("");
                      setSuggestions([]);
                    }}
                  >
                    {suggestion.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
      <div className="align_center navbar_links">
        <LinkWithIcon title="Home" link="/" emoji={rocket} />
        <LinkWithIcon title="Products" link="/products" emoji={star} />
        {!user && (
          <>
            <LinkWithIcon title="LogIn" link="/login" emoji={idButton} />
            <LinkWithIcon title="SignUp" link="/signup" emoji={memo} />
          </>
        )}
        {user && (
          <>
            <LinkWithIcon title="My Orders" link="/myorders" emoji={order} />
            <LinkWithIcon title="Logout" link="/logout" emoji={lock} />
            <NavLink to="/cart" className="align_center">
              Cart <p className="align_center cart_counts">{cart?.length}</p>{" "}
            </NavLink>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
