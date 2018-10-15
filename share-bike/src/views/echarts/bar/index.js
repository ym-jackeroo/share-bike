import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts'; //引入echarts核心包
import EchartsReact from 'echarts-for-react'; //引入第三方封装好的针对于react的库
import 'echarts/lib/chart/bar'; //引入柱形图组件
import 'echarts/lib/component/legend'; //引入legend组件
import {Card} from 'antd'


class Bar extends Component {

    componentWillMount() {
        this.bar1()
        this.bar2()
    }

    bar1 = () => {
        return {
            title : {
                text: '用户骑行订单',
                x:'center'
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [12025, 20044, 15450, 8054, 17041, 25110, 30130],
                type: 'bar'
            }]
        }
    }

    bar2 = () => {
        return {
            title : {
                text: '用户骑行订单',
                x:'center'
            },
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'骑行订单',
                    type:'bar',
                    barWidth: '60%',
                    data:[10510, 5822, 20024, 13534, 13690, 15330, 20220]
                }
            ]
        }
    }

    render() {
        return (
            <div>
                <Card
                title='柱形图一'>
                    <EchartsReact option={this.bar1()}></EchartsReact>
                </Card>
                <Card
                title='柱形图二'>
                    <EchartsReact option={this.bar2()}></EchartsReact>
                </Card>
            </div>
        );
    }
}

export default Bar;
