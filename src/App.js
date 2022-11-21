import React, { useState } from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./config";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./App.route";
import { CartContext } from "./context/cart-context";

export const App = () => {
  const [cart, setCart] = useState({
    items: [],
    totalItems: 0,
    totalPrice: 0,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <CartContext.Provider value={{ cart, setCart }}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CartContext.Provider>
    </QueryClientProvider>
  );
};
