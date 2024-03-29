


import { Layout,  } from 'antd';
import {  Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const { Header, Content,  } = Layout;




const MainLayout = () => {
    return (
        <Layout style={{minHeight:"100vh"}}>
          <Sidebar />
      <Layout>
        <Header style={{ padding: 0,   }} />
        <Content>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
    );
};

export default MainLayout;