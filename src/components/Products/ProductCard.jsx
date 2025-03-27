import React from "react";

import star from "../../assets/white-star.png";
import basket from "../../assets/basket.png";
import "./ProductCard.css";
import { NavLink } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <article className="product_card">
      {product && (
        <>
          <div className="product_image">
            <NavLink to={`${product._id}`}>
              <img
                src={`http://localhost:5000/products/${product.images[0]}`}
                alt="product image"
              />
            </NavLink>
          </div>
          <div className="product_details">
            <h3 className="product_price">${product.price}</h3>
            <p className="product_title">{product.title}</p>

            <footer className="align_center product_info_footer">
              <div className="align_center">
                <p className="align_center product_rating">
                  <img src={star} alt="star" />
                  {product.reviews.rate}
                </p>
                <p className="product_review_count">{product.reviews.counts}</p>
              </div>

              {product.stock > 0 && (
                <button className="add_to_cart">
                  <img src={basket} alt="basket" />
                </button>
              )}
            </footer>
          </div>
        </>
      )}
    </article>
  );
};

export default ProductCard;
