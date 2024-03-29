import {  Layout, Menu } from "antd";
import { TSidebarItem } from "../../types";
import { sidebarItemsGenerator } from "../../utilies/sidebarItemsGenerator";
import { dashboardRoutes } from "../../routes/dashboard.routes";
import { createElement } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/storeHook";
import { authGetters, logout } from "../../redux/features/auth/authSlice";
import { USER_ROLE } from "../../redux/features/auth/authConstant";
const { Sider } = Layout;

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(authGetters.selectCurrentUser);
  const dashboardLayoutPath = "dashboard";
  const sidebarItems: TSidebarItem[] = sidebarItemsGenerator(
    dashboardRoutes,
    dashboardLayoutPath
  ).filter(el=>{
    if (el.key === 'Add Account') {
      if (currentUser?.role === USER_ROLE.USER) {
        return false
      }
    }
    return true
  });

  console.log(sidebarItems);
  
  
  const LogoutLabel = () => {
    return <button onClick={() => dispatch(logout())}>Logout</button>;
  };

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div className="grid justify-items-center  text-amber-500 text-2xl font-bold h-8 mt-4">
        <h1>EGM</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={[
          {
            key: "logout",
            icon: createElement(LogoutOutlined),
            label: LogoutLabel(),
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
