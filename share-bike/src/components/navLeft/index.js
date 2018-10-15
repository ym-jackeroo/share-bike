import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Menu} from 'antd'
import './index.less'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actionCreator from '../../redux/action'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

class NavLeft extends Component {

    clickMenuItem = ({item, key, keyPath}) => {
        const text = item.props.children.props.children
        this.props.action.changeMenuItem(text)
        console.log(this.props)
    }

    render() {
        return (
            <div className="nav-left">
                <Menu mode="vertical" theme="dark" className="menu" onClick={this.clickMenuItem}>
                    <MenuItem key='/home'>
                        <Link to='/admin/home'>首页</Link>
                    </MenuItem>
                    <SubMenu
                    title='订单管理'>
                        <MenuItem key='/order'>
                            <Link to='/admin/order'>订单列表</Link>
                        </MenuItem>
                    </SubMenu>
                    <SubMenu
                    title='图例'>
                        <MenuItem key='/echarts-pie'>
                            <Link to='/admin/echarts/pie'>饼状图</Link>
                        </MenuItem>
                        <MenuItem key='/echarts-bar'>
                            <Link to='/admin/echarts/bar'>柱形图</Link>
                        </MenuItem>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export default connect(
    null,
    (dispatch) => ({
        action: bindActionCreators(actionCreator, dispatch)
    })
)(NavLeft);
