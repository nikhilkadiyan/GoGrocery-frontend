import { createContext, useEffect, useState } from "react";
import { stores_types } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [itemList, setItemList] = useState([]);
  const [shopkeeper_list, setShopkeeperList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = itemList.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchItemsList = async () => {
    const response = await axios.get(url + "/api/item/getAllItems");
    setItemList(response.data.items);
  };
  const fetchShopkeeperList = async () => {
    const response = await axios.get(url + "/api/shopkeeper/shopkeeperList");
    setShopkeeperList(response.data.shopkeepers);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: token }
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchShopkeeperList();
      await fetchItemsList();
      if (localStorage.getItem("gogrocerytoken")) {
        setToken(localStorage.getItem("gogrocerytoken"));
        await loadCartData({ token: localStorage.getItem("gogrocerytoken") });
      }
    }
    loadData();
  }, []);

  const contextValue = {
    url,
    shopkeeper_list,
    stores_types,
    cartItems,
    itemList,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    loadCartData,
    setCartItems,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
