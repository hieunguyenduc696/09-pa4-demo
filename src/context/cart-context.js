const { createContext, useContext } = require("react");

// items: {
//     quantity: Number,
//     id: String
//     details: Product
// }[]

export const defaultCartValue = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

export const CartContext = createContext(defaultCartValue);

export const useCart = () => useContext(CartContext);
