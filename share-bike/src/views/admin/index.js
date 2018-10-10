import React, { Component } from 'react';
import './index.less'
import NavLeft from '../../components/navLeft'
import Header from '../../components/header'
import Footer from '../../components/footer'
import {Row, Col} from 'antd'

class Admin extends Component {
    render() {
        return (
            <div className="admin">
                <Row>
                    <Col span={4}>
                        <NavLeft></NavLeft>
                    </Col>
                    <Col span={20}>
                        <Header></Header>
                        <div className="content-wrap">
                            <div className="content">
                                {this.props.children}
                            </div>
                        </div>
                        <Footer></Footer>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Admin;
