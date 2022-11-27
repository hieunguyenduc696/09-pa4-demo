import React, { useCallback, useEffect, useMemo, useState } from "react";
import classes from "./MainLayout.module.less";
import { Header } from "../components";
import { Footer } from "../components";
import { Layout, Menu, Typography } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { MainLayoutRoutes } from "../App.route";
import { RootPaths } from "../constant/paths.js";

const { Title } = Typography;

const getRootPath = (path) => `/${path.slice(1).split("/")?.[0]}` || path;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(getRootPath(location.pathname));

  const onClickMenu = useCallback(
    (e) => {
      navigate(e.key);
    },
    [navigate]
  );

  const menus = useMemo(
    () =>
      MainLayoutRoutes.children
        ?.map(({ menuIcon: Icon, path, menuLabel }) => {
          return (
            menuLabel && {
              key: path,
              label: null,
              className: classes["menu-item"],
              onClick: onClickMenu,
              icon: (
                <Link to={path} className={classes["menu-item-ctn"]}>
                  <div className={classes["menu-item-icon"]}>
                    {Icon && <Icon fontSize={24} />}
                  </div>
                  <p className={classes["menu-item-text"]}>{menuLabel}</p>
                </Link>
              ),
            }
          );
        })
        .filter(Boolean),
    [onClickMenu]
  );

  useEffect(() => {
    setCurrent(getRootPath(location.pathname));
  }, [location.pathname]);

  return (
    <Layout className={classes.app}>
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={true}
        width={200}
        className={classes["site-layout-background"]}
        theme="light"
      >
        <Link to={RootPaths.HOME} className={classes.logo}>
          <Title level={3} className={classes["logo-text"]}>
            R3S
          </Title>
        </Link>
        <Menu
          theme="light"
          mode="inline"
          defaultOpenKeys={[RootPaths.HOME]}
          selectedKeys={[current]}
          className={classes.menu}
          items={menus}
        />
      </Layout.Sider>

      <Layout className={classes["main-layout"]}>
        <Header />
        <Layout className={classes["site-layout-content"]}>
          <Layout.Content>
            <Outlet />
          </Layout.Content>
        </Layout>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
