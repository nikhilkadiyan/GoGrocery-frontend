import React, { useState } from "react";
import StoreHeader from "../../components/StoreHeader/StoreHeader";
import { useParams } from "react-router-dom";

const StoreDetailDisplay = () => {
  const { id } = useParams();

  const [storeItems, setStoreItems] = useState([]);

  const fetchStoreItems = async () => {
    const response = await axios.get(`${url}/api/store/storeItem/${id}`);
    if (response.data.success) {
      setStoreItems(response.data.items);
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div>
      <StoreHeader id={id} />
      <h2>Store items will be displayed here</h2>
    </div>
  );
};

export default StoreDetailDisplay;
