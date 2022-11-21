import React from "react";
import { Navigate, generatePath, useParams } from "react-router";

export const CustomNavigate = ({ to, ...props }) => {
  const params = useParams();
  return <Navigate {...props} to={generatePath(to, params)} />;
};
