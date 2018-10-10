import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import pineapple from './pineapple.jpg'
import './index.less'

class NotMatch extends Component {
    render() {
        return (
            <div className="notmatch clearfix">
                <div className="notmatch-left fll">
                    <div className="title">
                        Oh My God!
                    </div>
                    <div className="desc">
                        404 你要的页面未找到。
                    </div>
                    <strong className="">
                        如有疑问，请联系客服
                    </strong>
                    <ul>
                        <li>或者你可以</li>
                        <li>
                            <Link to="./admin/home">回首页</Link>
                        </li>
                    </ul>
                </div>
                <div className="img-wrap fll">
                    <img src={pineapple} alt=""/>
                </div>
            </div>
        );
    }
}

export default NotMatch;
