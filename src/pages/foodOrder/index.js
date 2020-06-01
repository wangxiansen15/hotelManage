import React, {Component} from 'react';
import {Card, Descriptions, Pagination} from "antd";
import {connect} from 'react-redux';
import axios from 'axios';

class FoodOrder extends Component {
    state = {
        totalPages: '',
        data: [],
        current: '',
    };
    getOrder = (current,pageSize) => {
        axios.get('http://116.85.12.238:8080/aihotel/manager/specialService/order/' + this.props.id + '/' + current + '/' + pageSize).then((res) => {
            res = res.data.data;
            console.log(res);
            this.setState({
                totalPages: res.totalPages,
                data: res.orders
            });
        }).catch(() => {
            console.log("error");
        })
    };

    render() {
        return(
            <Card title={"餐饮订单"}>
                {
                    this.state.data.map((item, index) => {
                        return (
                            <div key={ index }>
                                <Descriptions bordered>
                                    <Descriptions.Item label="下单人账号">{ item.consumerAccount }</Descriptions.Item>
                                    <Descriptions.Item label="订单编号">{ item.id }</Descriptions.Item>
                                    <Descriptions.Item label="房间号">{ item.roomNum }</Descriptions.Item>
                                    <Descriptions.Item label="价格">{ item.price }</Descriptions.Item>
                                    <Descriptions.Item label="下单时间">{ item.orderTime }</Descriptions.Item>
                                    <Descriptions.Item label="下单人所属订单">{ item.orderId }</Descriptions.Item>
                                    <Descriptions.Item label="下单人所属订单">{ item.orderId }</Descriptions.Item>
                                    <Descriptions.Item label="货品">
                                        {
                                            item.orderGoods.map((item,index) => {
                                                return (item.goodsName + '*' + item.goodsNums);
                                            })
                                        }
                                    </Descriptions.Item>
                                    <Descriptions.Item label="订单状态">{ item.status ? '已完成' : '未完成' }</Descriptions.Item>
                                </Descriptions>
                            </div>
                        );
                    })
                }
                <br/>
                <Pagination style={{float: 'right'}} current={this.state.current} total={this.state.totalPages*2} pageSize={2} onChange={(e) => {
                    this.setState({
                        current: e
                    });
                    this.getOrder(e,2)
                }
                }/>
            </Card>
        );
    }

    componentDidMount() {
        this.getOrder(1,2);
    }

}

const mapState = (state) => ({
    id: state.getIn(['login','hotelId']),
});

export default connect(mapState,null)(FoodOrder);