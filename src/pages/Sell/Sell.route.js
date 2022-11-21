import { Sell } from "./Sell";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { RootPaths } from "../../constant/paths";

export const SellRoutes = [
  {
    path: RootPaths.SELL,
    component: Sell,
    showInMenu: true,
    menuIcon: RiMoneyDollarCircleLine,
    menuLabel: "Sell",
    breadcrumb: "Sell",
  },
];
