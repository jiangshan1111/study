import React from 'react'
import { Menu, Dropdown} from 'antd'
import { UserOutlined } from '@ant-design/icons';
import {Link} from 'umi'
import {withRouter} from 'umi'
const Header = function ({location}): any {
  console.log(location)
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="https://www.antgroup.com">退出</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="header">
      <Menu mode="horizontal" theme="dark" selectedKeys={location.pathname}>
        <Menu.Item key="/">
         <Link to="/">header</Link> 
        </Menu.Item>
      </Menu>
      <Dropdown overlay={menu} className="right">
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        <UserOutlined />admin 
        </a>
      </Dropdown>
    </div>
  )
}

export default withRouter(Header)