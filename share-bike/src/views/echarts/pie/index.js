import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts'; //引入echarts核心包
import 'echarts/lib/chart/pie' //引入饼图组件
import 'echarts/lib/component/legend' //引入legend组件
import EchartsReact from 'echarts-for-react' //引入第三方封装好的针对于react的库
import chalk from '../echartTheme/chalk'
import halloween from '../echartTheme/halloween'
import {Card} from 'antd'


class Pie extends Component {
    componentWillMount() {
        echarts.registerTheme('chalk', chalk)
        echarts.registerTheme('halloween', halloween)
        this.pie1()
        this.pie2()
    }

    pie1 = () => {
        return {
            title : {
                text: '用户骑行订单',
                x:'center'
            },
            tooltip : {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                right: '20',
                top: '20',
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            series : [
                {
                    name: '骑行订单',
                    type: 'pie',
                    radius : '70%',
                    center: ['50%', '60%'],
                    data:[
                        {value:3000, name:'周一'},
                        {value:5000, name:'周二'},
                        {value:8000, name:'周三'},
                        {value:10000, name:'周四'},
                        {value:12000, name:'周五'},
                        {value:18000, name:'周六'},
                        {value:15000, name:'周日'}
                    ]
                }
            ]
        }
    }

    pie2 = () => {
        return {
            title : {
                text: '用户骑行订单',
                x:'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                right: '20',
                top: '20',
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            series: [
                {
                    name:'骑行订单',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:15054, name:'周一'},
                        {value:12054, name:'周二'},
                        {value:10545, name:'周三'},
                        {value:16465, name:'周四'},
                        {value:15963, name:'周五'},
                        {value:19538, name:'周六'},
                        {value:25426, name:'周日'}
                    ]
                }
            ]
        }
    }

    render() {
        return (
            <div>
                <Card
                title='饼状图一'>
                    <EchartsReact option={this.pie1()} theme='chalk'></EchartsReact>
                </Card>
                <Card
                title='饼状图二'>
                    <EchartsReact option={this.pie2()} theme='chalk'></EchartsReact>
                </Card>
            </div>
        );
    }
}

export default Pie;
