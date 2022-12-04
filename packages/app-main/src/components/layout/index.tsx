import React from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import { loadApps, config } from '../../garfish/init';
import { useNavigate } from 'react-router-dom';




const { Header, Content, Footer } = Layout;

export const LayoutMain: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Layout className="layout" style={{ height: '100%' }}>
      <Header>
        <div className="logo" />
        <Menu
          onClick={(value) => {
            navigate(`${config.basename}${value.key}`)
          }}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={(loadApps || [])?.map(item => {
            return {
              key: item.activeWhen as string,
              label: item.name,
            }
          }) || []}
        />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div id='submodule'>

        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  )
};
