import { Home } from "./Home";
import { RiDashboardLine } from "react-icons/ri";
import { RootPaths } from "../../constant/paths";

export const HomeRoutes = [
  {
    path: RootPaths.HOME,
    component: Home,
    showInMenu: true,
    menuIcon: RiDashboardLine,
    menuLabel: "Home",
    breadcrumb: "Home",
  },
];
