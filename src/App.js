import React, { useState } from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./config";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./App.route";
import { CartContext } from "./context/cart-context";
import { defaultUserValue, UserContext } from "./context/user-context";
import { defaultCartValue } from "./context/cart-context";

export const App = () => {
  const [cart, setCart] = useState(defaultCartValue);
  const [user, setUser] = useState(defaultUserValue);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser }}>
        <CartContext.Provider value={{ cart, setCart }}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </CartContext.Provider>
      </UserContext.Provider>
    </QueryClientProvider>
  );
};
