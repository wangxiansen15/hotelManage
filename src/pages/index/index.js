import React, {Component} from "react";
import { Row, Col, Statistic, Card, Progress,Avatar  } from 'antd';
import { ContainerOutlined } from '@ant-design/icons';
import * as echarts from 'echarts';
import img from '../../static/touxiang.png';
import {connect} from 'react-redux';
import axios from 'axios';

const { Meta } = Card;

class Index extends Component {

    state = {
        totalRoomNum: '',
        toConfirmOrder: '',
        roomStatus: [],
        orderNums:false,
        fees:false,
        dates:false,
        busyRoomNum:'',
        consumerNums:'',
        roomCircle:false
    };

    componentDidMount() {
        axios.get('http://116.85.12.238:8080/aihotel/getState/' + this.props.id).then((res) => {
            res = res.data.data;
            var roomCircle = res.roomStatus.map((item,index) => {
                return ({value:item.roomSum,name:item.room_type});
            });
            this.setState({
                totalRoomNum: res.totalRoomNum,
                toConfirmOrder: res.toConfirmOrder,
                roomStatus: res.roomStatus,
                orderNums: res.orderNums,
                fees: res.fees,
                dates: res.dates,
                busyRoomNum: res.busyRoomNum,
                consumerNums: res.consumerNums,
                roomCircle: roomCircle,
            });
        }).catch(() => {
            console.log("error");
        });
    }

    render() {
        console.log(this.state.roomCircle)
        if ( this.state.dates!== false && this.state.fees!== false && this.state.orderNums!== false) {
            var myChart = echarts.init(document.getElementById('main1'));
            var option = {
                legend: {
                    data:['销售额','订单数']
                },
                xAxis: {
                    data: this.state.dates
                },
                yAxis: [
                    {
                        name: '销售额(万)',
                        type: 'value',
                        max: 20000
                    },
                    {
                        name: '订单数(个)',
                        max: 20,
                        type: 'value',
                    }
                ],
                series: [{
                    name: '销售额',
                    type: 'bar',
                    data: this.state.fees,
                    barWidth: 30,
                    itemStyle:{
                        normal:{
                            color:'#FF8888',
                        }
                    },
                    yAxisIndex: 0
                },{
                    name: '订单数',
                    type: 'line',
                    data: this.state.orderNums,
                    itemStyle: {
                        normal: {
                            color: "#F79534",//折线点的颜色
                            lineStyle: {
                                color: "#F7BA81"//折线的颜色
                            }
                        }
                    },
                    yAxisIndex: 1
                }]
            };
            myChart.setOption(option);
        }
        if (this.state.roomCircle !== false) {
            console.log(this.state.roomCircle);
            var option = {
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        roseType: 'angle',
                        data:this.state.roomCircle
                    }
                ]
            };
            echarts.init(document.getElementById('main')).setOption(option);
        }
        return(
            <div>
                <Row>
                    <Col span={15}>
                        <Row>
                            <Col span={6}>
                                <Card title={"管理员"} style={{width:'100%',height:'230px'}}>
                                    <Meta
                                        avatar={
                                            <Avatar src={img} />
                                        }
                                        title={this.props.mangerId}
                                        description="欢迎登录AI酒店管理系统"
                                    />
                                </Card>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={5}>
                                <Card title={"房间数量"} style={{width:'100%',height:'230px'}}>
                                    <Statistic prefix={<ContainerOutlined twoToneColor="#52c41a"/>} value={this.state.busyRoomNum} suffix={'/' + this.state.totalRoomNum} style={{margin: '0 auto'}}/>
                                </Card>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={5}>
                                <Card title={"待确认订单数"} style={{width:'100%',height:'230px'}}>
                                    <Progress type="circle" percent={this.state.toConfirmOrder} format={percent => `${percent} 单`} />
                                </Card>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={5}>
                                <Card title={"当前入住人数"} style={{width:'100%',height:'230px'}}>
                                    <Progress type="circle" percent={this.state.consumerNums} format={percent => `${percent} 人`} />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={8}>
                        <Card title={"不同类型房间使用情况"} style={{width:'100%',height:'230px'}}>
                            {
                                this.state.roomStatus.map((item, index) => {
                                    return (
                                        <Row>
                                            <Col span={8}>
                                                {item.room_type}:
                                            </Col>
                                            <Col span={1}></Col>
                                            <Col span={8}>
                                                <Progress
                                                    strokeColor={{
                                                        from: '#108ee9',
                                                        to: '#87d068',
                                                    }}
                                                    showInfo={false}
                                                    percent={100*(item.roomSum - item.freeRoomNums)/item.roomSum}
                                                    status="active"
                                                />
                                            </Col>
                                            <Col span={1}></Col>
                                            <Col span={6}>
                                                {item.roomSum - item.freeRoomNums}/{item.roomSum}
                                            </Col>
                                        </Row>
                                    );
                                })
                            }
                        </Card>
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col span={15}>
                        <Card title={"销售额与人流量统计"}>
                            <div id="main1" style={{ width: '100%', height: 300 }}></div>
                        </Card>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={8}>
                        <Card title={"房间类型占比"}>
                            <div id="main" style={{ width: '100%', height: 300 }}></div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }

}

const mapState = (state) => ({
    mangerId: state.getIn(['login', 'managerId']),
    id: state.getIn(['login','hotelId']),
});

export default connect(mapState, null)(Index);