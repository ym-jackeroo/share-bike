import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './header.less'

class HeaderDetails extends Component {
    render() {
        return (
            <div className="header-details-wrap">
                <div className="header-left fll">
                    <h1>共享单车后台系统</h1>
                </div>
                <div className="header-right flr">
                    <span className="username">
                        欢迎，简自豪
                    </span>
                    <span className="layout">
                        <Link to="/common/login">退出</Link>
                    </span>
                </div>
            </div>
        );
    }
}

export default HeaderDetails;
