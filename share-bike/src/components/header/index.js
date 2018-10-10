import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './index.less'
import {formatDate, fgh} from '../../utils'
// import axios from 'axios'

class Header extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        time: '2018-10-07 22:46:58',
        weather: '低温9℃~高温15℃ 大风12级'
    }

    getTime = () => {
        setInterval(() => {
            let unixDate = new Date().getTime()
            let timeStr = formatDate(unixDate)
            this.setState({
                time: timeStr
            })
        }, 1000)
    }

    getWeather = () => {
        fgh.get('http://t.weather.sojson.com/api/weather/city/101010100').then(res => {
            console.log(res)
            let weather = res.data.data.forecast[0]
            let weatherStr = `${weather.low}~${weather.high} ${weather.fx}${weather.fl}`
            this.setState({
                weather: weatherStr
            })
        })
    }

    componentWillMount() {
        this.getTime()
        this.getWeather()
    }

    render() {
        return (
            <div className="header-wrap">
                <div className="user-info clearfix">
                    <div className="flr">
                        <Link to='/login'>退出</Link>
                    </div>
                    <div className="user-detail flr">
                        欢迎，<span className="username">李相赫</span>
                    </div>
                </div>
                <div className="weather-wrap clearfix">
                    <div className="breadcrumb fll">
                        首页
                    </div>
                    <div className="weather flr clearfix">
                        <div className="date fll">
                            {this.state.time}
                        </div>
                        <div className="weather-detail fll">
                            {this.state.weather}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
