import React from "react";
import { Products } from "./ProductData";

const Product = () => {
  return (
    <>
      <div>
        <div>
          {Products.map((product) => (
            <div key={product.id}>
              <img src={product.Image} height="100" width="100" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
