import { Give } from "./Give";
import { RiHandHeartLine } from "react-icons/ri";
import { RootPaths } from "../../constant/paths";

export const GiveRoutes = [
  {
    path: RootPaths.GIVE,
    component: Give,
    showInMenu: true,
    menuIcon: RiHandHeartLine,
    menuLabel: "Give",
    breadcrumb: "Give",
  },
];
