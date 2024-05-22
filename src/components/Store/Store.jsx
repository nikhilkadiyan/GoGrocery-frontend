import React, { useContext, useState } from "react";
import "./Store.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Store = ({
  image,
  shopName,
  shopkeeperName,
  category,
  openTime,
  closeTime,
  id,
}) => {
  const { url } = useContext(StoreContext);

  const navigate = useNavigate();

  // const [itemCount, setItemCount] = useState(0);
  // const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);

  const handleStoreClick = (id) => {
    navigate(`/store/${id}`);
  };

  return (
    <div className="store" onClick={() => handleStoreClick(id)}>
      <div className="store-img-container">
        <img className="store-image" src={url + "/images/" + image} alt="" />
      </div>
      <div className="store-info">
        <div className="store-name-rating">
          <p>{shopName}</p> <img src={assets.rating_starts} alt="" />
        </div>
        <p className="store-desc">Shopkeeper Name: {shopkeeperName}</p>
        <p className="store-desc">
          Timing: {openTime} - {closeTime}
        </p>
        <p className="store-desc">Category: {category}</p>
      </div>
    </div>
  );
};

export default Store;
