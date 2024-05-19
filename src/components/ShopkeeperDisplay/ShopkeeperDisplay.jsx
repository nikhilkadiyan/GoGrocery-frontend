import React, { useContext } from "react";
import "./ShopkeeperDisplay.css";
import FoodItem from "../FoodItem/FoodItem";
import { StoreContext } from "../../Context/StoreContext";

const ShopkeeperDisplay = ({ category }) => {
  const { shopkeeper_list } = useContext(StoreContext);

  return (
    <div className="shopkeeper-display" id="shopkeeper-display">
      <h2>Top stores near you</h2>
      <div className="shopkeeper-display-list">
        {shopkeeper_list.map((item) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={item._id}
                image={item.image}
                name={item.name}
                desc={item.description}
                price={item.price}
                id={item._id}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default ShopkeeperDisplay;
