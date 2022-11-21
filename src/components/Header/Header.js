import React, { useMemo, useState } from "react";
import classes from "./Header.module.less";
import { Badge, Layout, Popover, Space } from "antd";
import { Link, useLocation } from "react-router-dom";
import { MainLayoutRoutes } from "../../App.route";
import {
  RiArrowRightSLine,
  RiLuggageCartLine,
  RiNotification2Line,
  RiUser3Line,
} from "react-icons/ri";
import { arrayToRecord } from "../../utils";
import { generateBreadcrumb } from "./Header.utils";
import { SearchInput } from "../SearchInput";
import { useCart } from "../../context/cart-context";
import { CartCard } from "../CartCard";

export const Header = () => {
  const { cart } = useCart();
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  const routesRecord = useMemo(
    () => arrayToRecord(MainLayoutRoutes.children || [], "path"),
    []
  );

  const breadcrumb = useMemo(
    () => generateBreadcrumb(routesRecord, location.pathname),
    [location.pathname]
  );

  const handleOpenChange = (newOpen) => {
    setVisible(newOpen);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <Layout.Header className={classes["top-header"]}>
      <Space>
        {breadcrumb.map(({ title, href }, idx) => (
          <React.Fragment key={href}>
            {idx !== 0 && <RiArrowRightSLine />}
            <Link to={href}>{title}</Link>
          </React.Fragment>
        ))}
      </Space>
      <div>
        <SearchInput placeholder="Search by keywords" />
      </div>
      <div className={classes.user}>
        <Badge count={0} size="small">
          <RiNotification2Line
            size={20}
            className={classes["notification-icon"]}
          />
        </Badge>
        <div id="popover" className={classes.popover}>
          <Popover
            trigger="click"
            onOpenChange={handleOpenChange}
            open={visible}
            placement="bottomRight"
            getPopupContainer={() => document.getElementById("popover")}
            content={<CartCard handleClose={handleClose} />}
          >
            <Badge count={cart.totalItems} size="small">
              <RiLuggageCartLine
                size={20}
                className={classes["notification-icon"]}
                onClick={() => setVisible((prev) => !prev)}
              />
            </Badge>
          </Popover>
        </div>
        <Badge count={0} size="small">
          <RiUser3Line size={20} className={classes["notification-icon"]} />
        </Badge>
      </div>
    </Layout.Header>
  );
};
