const { createContext, useContext } = require("react");

// user: {
//     name: String,
//     phone: String
//     address: String
//     shippingType: String,
//     paymentType: String
//     note: String
// }

export const defaultUserValue = {
  name: "",
  phone: "",
  address: "",
  shippingType: "",
  paymentType: "",
  note: "",
};

export const UserContext = createContext(defaultUserValue);

export const useUser = () => useContext(UserContext);
