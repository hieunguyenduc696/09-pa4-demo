import { Buy } from "./Buy";
import { RiShoppingCartLine } from "react-icons/ri";
import { RootPaths } from "../../constant/paths";

export const BuyRoutes = [
  {
    path: RootPaths.BUY,
    component: Buy,
    showInMenu: true,
    menuIcon: RiShoppingCartLine,
    menuLabel: "Buy",
    breadcrumb: "Buy",
  },
];
