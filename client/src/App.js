import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter, Link } from 'react-router-dom';

import 'antd/dist/antd.css';
import './App.css';

import Routes, { ROUTES } from './routes';

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="address"><Link to={ROUTES.ADDRESSES.path}>Address</Link></Menu.Item>
              <Menu.Item key="inputs"><Link to={ROUTES.INPUTS.path}>Transaction</Link></Menu.Item>
              <Menu.Item key="keys"><Link to={ROUTES.KEYS.path}>Keys</Link></Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '20px 50px', background: '#fff', minHeight: 280 }}>

            <Routes />

          </Content>
          <Footer style={{ textAlign: 'center' }}>Blockchain©2018</Footer>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
