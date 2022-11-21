const { createContext, useContext } = require("react");

// items: {
//     quantity: Number,
//     id: String
//     details: Product
// }[]

const defaultValue = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

export const CartContext = createContext(defaultValue);

export const useCart = () => useContext(CartContext);
