import React from "react";
import { motion } from "framer-motion";

import "./FeaturedProducts.css";
import ProductCard from "../Products/ProductCard";
import useData from "../../hooks/useData";
import ProductCardSkeleton from "../Products/ProductCardSkeleton";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const { data, isLoading } = useData(
    "/products/featured",
    null,
    ["products", "featured"],
    10 * 60 * 60 * 1000
  );

  // const featuredProducts = data?.products.filter(
  //   (product) => product.reviews.rate >= 4.9
  // );
  // console.log(featuredProducts);

  const skeletons = [1, 2, 3];

  return (
    <section className="featured_products">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Featured Products
      </motion.h2>

      <div className="align_center featured_products_list">
        {data?.map((product, index) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              delay: index * 0.25,
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Link key={product._id} to={`/products/${product._id}`}>
              <ProductCard
                key={product._id}
                product={product}
                featured={true}
              />
            </Link>
          </motion.div>
        ))}
        {isLoading &&
          skeletons.map((skeleton) => <ProductCardSkeleton key={skeleton} />)}
      </div>
    </section>
  );
};

export default FeaturedProducts;
