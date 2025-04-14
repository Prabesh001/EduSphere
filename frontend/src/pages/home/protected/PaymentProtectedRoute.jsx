import { useContext } from "react";
import { PaymentContext } from "../../../App";
import { Navigate } from "react-router-dom";

export const PaymentProtectedRoute = ({ children }) => {
  const { isPaying } = useContext(PaymentContext);
  const paymentStatus = localStorage.getItem("paying");

  if (!isPaying && paymentStatus !== "true") {
    return <Navigate to="/" replace />;
  }
  return children;
};
