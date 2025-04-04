import React from "react";

import HeroSection from "./HeroSection";
import iphone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";
import FeaturedProducts from "./FeaturedProducts";

const HomePage = () => {
  return (
    <div>
      <HeroSection
        title={"Buy Iphone 14 Pro"}
        subtitle={
          "Experience the power of the latest iPhone with out most Pro camera ever."
        }
        link={"/products/67eaadf221eb85c826ce4dc0"}
        image={iphone}
      />
      <FeaturedProducts />
      <HeroSection
        title={"Build the ultimate setup"}
        subtitle={
          "U can add Studio Display and colour-mathed Magic accessories to your bag after configure your Mac mini."
        }
        link={"/products/67eaadf321eb85c826ce4dcc"}
        image={mac}
      />
    </div>
  );
};

export default HomePage;
