import React from "react";

import "./QuantityInput.css";

const QuantityInput = ({ stock, quantity, setQuantity }) => {
  return (
    <>
      <button
        className="quantity_input_button"
        onClick={() => setQuantity(quantity - 1)}
        disabled={quantity === 1}
      >
        {" "}
        -{" "}
      </button>
      <p className="quantity_input_count">{quantity}</p>
      <button
        className="quantity_input_button"
        onClick={() => setQuantity(quantity + 1)}
        disabled={quantity === stock}
      >
        {" "}
        +{" "}
      </button>
    </>
  );
};

export default QuantityInput;
