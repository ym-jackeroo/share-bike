import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Menu} from 'antd'
import './index.less'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

class NavLeft extends Component {
    render() {
        return (
            <div className="nav-left">
                <Menu mode="vertical" theme="dark">
                    <MenuItem key='/home'>
                        <Link to='/admin/home'>首页</Link>
                    </MenuItem>
                    <MenuItem key='/secondPage'>
                        <Link to='/admin/secondPage'>第二页</Link>
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

export default NavLeft;
