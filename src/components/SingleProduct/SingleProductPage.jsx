import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./SingleProductPage.css";
import QuantityInput from "./QuantityInput";
import useData from "../../hooks/useData";
import Loader from "../Common/Loader";

const SingleProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { _id } = useParams();

  const { data: product, error, isLoading } = useData(`/products/${_id}`);

  useEffect(() => {
    setSelectedImage(product?.images[0]);
  }, [product]);

  if (error) {
    return (
      <section className="align_center single_product">
        {error && <em className="form_error">{error}</em>}
      </section>
    );
  }

  return (
    <section className="align_center single_product">
      {error && <em className="form_error">{error}</em>}
      {isLoading && <Loader />}
      {product && (
        <>
          <div className="align_center">
            <div className="single_product_thumbnails">
              {product.images.map((image, index) => (
                <img
                  src={`http://localhost:5000/products/${image}`}
                  alt={product.title}
                  className={selectedImage === image ? "selected_image" : ""}
                  onClick={() => setSelectedImage(image)}
                  key={index}
                />
              ))}
            </div>
            <img
              src={`http://localhost:5000/products/${selectedImage}`}
              alt={product.title}
              className="single_product_display"
            />
          </div>
          <div className="single_product_details">
            <h1 className="single_product_title">{product.title}</h1>
            <p className="single_product_description">{product.description}</p>
            <p className="single_product_price">${product.price.toFixed(2)}</p>

            <h2 className="quantity_title">Quantity:</h2>
            <div className="align_center quantity_input">
              <QuantityInput
                stock={product.stock}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </div>

            <button className="search_button add_cart">Add to Cart</button>
          </div>
        </>
      )}
    </section>
  );
};

export default SingleProductPage;
