import { Help } from "./Help";
import { RiQuestionLine } from "react-icons/ri";
import { RootPaths } from "../../constant/paths";

export const HelpRoutes = [
  {
    path: RootPaths.HELP,
    component: Help,
    showInMenu: true,
    menuIcon: RiQuestionLine,
    menuLabel: "Help",
    breadcrumb: "Help",
  },
];
