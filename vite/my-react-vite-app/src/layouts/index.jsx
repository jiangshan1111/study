import React from "react";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "@/pages/index";
import About from "@/pages/About";
import Users from "@/pages/Users";
// import styles from "./index.module.less";

const { Header, Content } = Layout;

export default function App ()
{
  return (
    <Router>
      <Layout >
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={ [ "2" ] }>
            <Menu.Item key="/">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="/about">
              <Link to="/about">About</Link>
            </Menu.Item>
            <Menu.Item key="/users">
              <Link to="/users">Users</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          <Switch>
            <Route path="/" exact component={ Home } />
            <Route path="/about" exact component={ About } />
            <Route path="/users" exact component={ Users } />
          </Switch>
        </Content>
      </Layout>
    </Router>
  );
}