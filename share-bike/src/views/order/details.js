import React, { Component } from 'react';
import HeaderDetails from '../../components/header/header'
import {Card} from 'antd'
import './details.less'
import axios from '../../axios'

class OrderDetails extends Component {

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        const detail_id = this.props.match.params.id
        axios.get('/order/detail', {id: detail_id}).then(res => {
            if(res.code == 0) {
                this.initMap(res.result)
                console.log(res.result)
            }
        })
    }
    initMap = (result) => {
        const BMap = window.BMap
        this.map = new BMap.Map("bmap-container");          // 创建地图实例  
        this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放 
        this.addControl()
        this.drawPolyline(result.position_list)
        this.drawServiceArea(result.area)
    }

    //添加控件
    addControl = () => {
        const BMap = window.BMap
        this.map.addControl(new BMap.MapTypeControl({
            anchor: window.BMAP_ANCHOR_TOP_LEFT
        })); 
        this.map.addControl(new BMap.NavigationControl({
            anchor: window.BMAP_ANCHOR_TOP_RIGHT
        }));    
        this.map.addControl(new BMap.ScaleControl({
            anchor: window.BMAP_ANCHOR_TOP_RIGHT
        }));  
        this.map.addControl(new BMap.GeolocationControl());  
    }

    //绘制路径折线图
    drawPolyline = (position_list) => {
        const BMap = window.BMap
        const map = this.map
        let startPoint = position_list[0]
        let endPoint = position_list[position_list.length-1]
        let startBmapPoint = new BMap.Point(startPoint.lon, startPoint.lat) //绘制一个百度地图的起点   
        let endBmapPoint = new BMap.Point(endPoint.lon, endPoint.lat) //绘制一个百度地图的终点
        
        //新建一个icon
        const startIcon = new BMap.Icon("/imgs/start_point.png", new BMap.Size(36, 42), {    
            imageSize: new BMap.Size(36, 42)
        });
        const endIcon = new BMap.Icon("/imgs/end_point.png", new BMap.Size(36, 42), {    
            imageSize: new BMap.Size(36, 42)
        });

        //将icon添加到地图中
        let startMarker = new BMap.Marker(startBmapPoint, {icon: startIcon}) //起点标注
        let endMarker = new BMap.Marker(endBmapPoint, {icon: endIcon}) //终点标注
        map.addOverlay(startMarker) //添加起点
        map.addOverlay(endMarker) //添加终点
        this.map.centerAndZoom(startBmapPoint, 15);                 // 设置中心点坐标和地图级别   

        //添加折线图
        let polyline = new BMap.Polyline(position_list.map(point => {
            return new BMap.Point(point.lon, point.lat)
        }),
            {strokeColor:"#1869ad", strokeWeight:2, strokeOpacity:1}
            );
        map.addOverlay(polyline);
    }   

    //绘制服务区
    drawServiceArea = (area) => {
        const BMap = window.BMap
        const map = this.map
        let polygon = new BMap.Polygon(
            area.map(point => new BMap.Point(point.lon, point.lat)),
            {
                strokeColor: '#f00',
                strokeWeight: 6,
                fillColor: '#ff6700',
                fillOpacity: .5
            }
        )

        map.addOverlay(polygon)
    }

    render() {
        return (
            <div className="details">
                <HeaderDetails></HeaderDetails>
                <Card>
                    <div className="bmap-wrap" id="bmap-container">

                    </div>
                </Card>
            </div>
        );
    }
}

export default OrderDetails;
