import React from "react";
import { useDrag } from "react-dnd";

const Product = ({ _id, name, price }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "PRODUCT",
    item: { _id, name, price },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: "16px",
        cursor: "move",
        marginBottom: "8px",
        border: "1px solid black",
        borderRadius: "10px",
        padding: "5px",
      }}
    >
      {name} ${price}
    </div>
  );
};

export default Product;
