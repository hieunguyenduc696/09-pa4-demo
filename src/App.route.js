import React from "react";
import {
  HomeRoutes,
  BuyRoutes,
  HelpRoutes,
  SellRoutes,
  GiveRoutes,
  PaymentRoutes,
} from "./pages";
import { CustomNavigate } from "./components";
import MainLayout from "./layout/MainLayout";
import { Route, Routes } from "react-router";

export const MainLayoutRoutes = {
  component: MainLayout,
  path: "/",
  children: [
    ...HomeRoutes,
    ...GiveRoutes,
    ...SellRoutes,
    ...BuyRoutes,
    ...PaymentRoutes,
    ...HelpRoutes,
  ],
};

export const routes = [MainLayoutRoutes];

const renderRoute = (routes) =>
  routes.map(({ redirectTo, children, component: Component, path }) => {
    if (children && children.length > 0) {
      return (
        <Route key={path} path={path} element={<Component />}>
          {redirectTo && (
            <Route index element={<CustomNavigate to={redirectTo} replace />} />
          )}
          {renderRoute(children)}
        </Route>
      );
    }
    return (
      <Route
        key={path}
        path={path}
        element={
          redirectTo ? (
            <CustomNavigate to={redirectTo} replace />
          ) : (
            <Component />
          )
        }
      />
    );
  });

export const AppRoutes = () => {
  return <Routes>{renderRoute(routes)}</Routes>;
};
