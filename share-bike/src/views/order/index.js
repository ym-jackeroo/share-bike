import React, { Component } from 'react';
import {Form, Select, Card, DatePicker, Button, Table, message, Modal} from 'antd';
import './index.less';
import axios from '../../axios/index';


const FormItem = Form.Item
const Option = Select.Option
const {RangePicker} = DatePicker

class Order extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        dataSource: [],
        pageSize: '',
        total: '',
        isLoading: false,
        isShowModal: false,
        selectedIndex: [],
        endItem: {}
    }

    params = {
        pn: 1
    }

    componentWillMount() {
        this.getTable()
    }
    
    //获取数据
    getTable = () => {
        this.setState({
            isLoading: true
        })
        axios.get('/order/list', this.params).then(res => {
            if(res.code == 0) {
                this.setState({
                    dataSource: res.result.item_list.map((item, index) => {
                        item.key = index
                        return item
                    }),
                    pageSize: 10,
                    total: res.result.total_count,
                    isLoading: false
                })
            }
        })
    }

    //查询功能获取表单数据
    hanldeSearch = () => {
       console.log(this.props.form.getFieldsValue()) 
    }

    //重置数据
    resetDate = () => {
        this.props.form.resetFields()
    }

    //结束订单(弹出确认框)
    handleDone = () => {
        let selectedItem = this.state.selectedItem
        if(selectedItem) {
            axios.get('/order/ebike_info', {id:selectedItem[0].id}).then(res => {
                console.log(res)
                this.setState({
                    endItem: res.result,
                    isShowModal: true
                })
            })
        }else {
            message.warning('请选择一条订单进行操作')
        }
    }

    //用户确认结束订单
    handleEnd = () => {
        let id = this.state.selectedItem[0].id
        this.setState({
            isShowModal:false
        })
        axios.get('/order/finish_order', {id}).then(res => {
            if(res.code == 0) {
                message.success('结束订单成功')
                this.getTable()
            }
        })
    }

    handleDetail = () => {
        let item = this.state.selectedItem
        if(!item) {
            message.warning('请选择一项进行操作')
        }else {
            window.open(`/#/common/order/details/${item[0].id}`)
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form; 

        // const _this = this
        const pagination = {
            total: this.state.total,
            pageSize: this.state.pageSize,
            onChange: (page) => {
                this.params.pn = page
                this.getTable()
            }
        }

        const rowSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectedIndex,
            onChange: (selectedRowKeys, selectedRows)=> {
                console.log(selectedRowKeys)
                console.log(selectedRows)
                this.setState({
                    selectedItem: selectedRows,
                    selectedIndex: selectedRowKeys
                })
            }
        }

        const cityOptions = [
            {
                label: '北京',
                value: '0'
            },
            {
                label: '上海',
                value: '1'
            },
            {
                label: '广州',
                value: '2'
            }
        ]
    
        const orderStatus = [
            {
                status: '进行中',
                value: '0'
            },
            {
                status: '已完成',
                value: '1'
            },
            {
                status: '结束行程',
                value: '2'
            }
        ]
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn',
                key: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn',
                key: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name',
                key: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
                key: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                rander(distance){
                    return distance/1000 + 'Km';
                },
                key: 'distance'
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time',
                key: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time',
                key: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time',
                key: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee',
                key: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay',
                key: 'user_pay'
            }
        ]
        
        return (
            <div className="order">
                <Card>
                    <Form
                    layout='inline'>
                        <FormItem
                        label='城市'>
                            {
                                getFieldDecorator('city', {
                                    initialValue: '0'
                                }) (
                                    <Select style={{width:150}}
                                    placeholder='请选择一个城市'>
                                        {cityOptions.map(item => 
                                        <Option value={item.value}
                                        key={item.value}>
                                            {item.label}
                                        </Option>)}
                                    </Select>
                                )
                            }
                        </FormItem>

                        <FormItem
                        label='订单时间'>
                            {
                                getFieldDecorator('date') (
                                    <RangePicker></RangePicker>
                                )
                            }
                        </FormItem>

                        <FormItem
                        label='订单状态'>
                            {
                                getFieldDecorator('order_status') (
                                    <Select style={{width:220}}
                                    placeholder='请选择订单状态'>
                                        {orderStatus.map(item => 
                                        <Option value={item.value}
                                        key={item.value}>
                                            {item.status}
                                        </Option>)}
                                    </Select>
                                )
                            }
                            
                        </FormItem>
                    </Form>  
                    <div className="btn-wrap">
                        <Button type='primary' onClick={this.hanldeSearch} className="mgr-20">查询</Button>
                        <Button type='warning' onClick={this.resetDate}>重置</Button>
                    </div>   
                </Card>
                <Card style={{marginTop: -1}}>
                    <Button type='primary' className="mgr-20" onClick={this.handleDetail}>订单详情</Button>
                    <Button type='primary' onClick={this.handleDone}>结束订单</Button>
                </Card>
                <Card>
                    <Table columns={columns} 
                    dataSource={this.state.dataSource}
                    pagination={pagination}
                    loading={this.state.isLoading}
                    rowSelection={rowSelection}></Table>
                </Card>
                <Modal
                title="结束订单"
                visible={this.state.isShowModal}
                onOk={this.handleEnd}
                onCancel={() => this.setState({isShowModal: false})}>
                    <ul className="ul-data">
                        <li>
                            <span className="car-num li-title">车辆编号：</span>
                            {this.state.endItem.bike_sn}
                        </li>
                        <li>
                            <span className="car-num li-title">剩余电量：</span>
                            {this.state.endItem.battery}
                        </li>
                        <li>
                            <span className="car-num li-title">行程开始时间：</span>
                            {this.state.endItem.start_time}
                        </li>
                        <li>
                            <span className="car-num li-title">当前位置：</span>
                            {this.state.endItem.location}
                        </li>
                    </ul>
                </Modal>
            </div>
        );
    }
}

export default Form.create() (Order)
