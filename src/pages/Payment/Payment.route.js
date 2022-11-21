import { Payment } from "./Payment";
import { RootPaths } from "../../constant/paths";

export const PaymentRoutes = [
  {
    path: RootPaths.PAYMENT,
    component: Payment,
    breadcrumb: "Payment",
  },
];
