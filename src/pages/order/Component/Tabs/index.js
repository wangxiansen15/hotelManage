import React, { Component } from "react";
import {actionCreators} from "../../store";
import {connect} from "react-redux";
import {Form, Input, Button, Pagination } from 'antd';
import {Descriptions, Tabs, Card} from 'antd';
import axios from 'axios';
const { TabPane } = Tabs;

function typechange(res) {
    for (var i = 0; i < res.data.data.orderList.length; i++) {
        switch (res.data.data.orderList[i].orderStatus) {
            case '-2':
                res.data.data.orderList[i].orderStatus = '已拒绝';
                break;
            case '-1':
                res.data.data.orderList[i].orderStatus = '无效';
                break;
            case '0':
                res.data.data.orderList[i].orderStatus = '未付款';
                break;
            case '1':
                res.data.data.orderList[i].orderStatus = '已付款';
                break;
            case '2':
                res.data.data.orderList[i].orderStatus = '已确定';
                break;
            case '3':
                res.data.data.orderList[i].orderStatus = '待入住';
                break;
            case '4':
                res.data.data.orderList[i].orderStatus = '进行中';
                break;
            case '5':
                res.data.data.orderList[i].orderStatus = '已取消';
                break;
            case '6':
                res.data.data.orderList[i].orderStatus = '已完成';
                break;
            case '7':
                res.data.data.orderList[i].orderStatus = '已评价';
                break;
            default:
                res.data.data.orderList[i].orderStatus = '未知错误';
        }
    }
}

class TabItem extends Component {
    state = {
        current: 1,
        current1: 1,
        current2: 1,
        current3: 1,
        current4: 1,
        current5: 1,
        current6: 1,
        current7: 1,
        current8: 1,
        current9: 1,
        current10: 1,
        current11: 1,
        orderId:'',
        totalPages11: 1,
        search:[],
        show:'1'
    };

    render() {
        const { allOrder, Paid, toStayIn, Unpaid, doing, Confirmed, Cancelled, Completed, invalid, changeVisible, refused, comment } = this.props;

        const search = (id,currentPage) => {
            var fr = new FormData();
            fr.append('orderId',id);
            fr.append('currentPage',currentPage);
            fr.append('pageSize',5);
            axios.post('http://116.85.12.238:8080/aihotel/gatherSearch/orderSearch', fr).then((res) => {
                console.log(res);
                typechange(res);
                this.setState({
                    search: res.data.data.orderList,
                    totalPages11: res.data.data.totalPage,
                    show: '12'
                });
            }).catch(() => {
                console.log("error");
            })
        };

        const onFinish = values => {
            search(values.orderId,1);
            this.setState({
                orderId: values.orderId
            });
        };
        return (
            <Card title={
                <Form name="horizontal_login" layout="inline" onFinish={onFinish}>
                    <Form.Item
                        label={"订单搜索"}
                        name="orderId"
                    >
                        <Input placeholder="订单号" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Search
                        </Button>
                    </Form.Item>
                </Form>
            }>
                <Tabs activeKey={this.state.show} onChange={(e) => {
                    this.setState({
                        show: e
                    });
                }}>
                <TabPane tab="全部订单" key="1">
                    {
                        allOrder.map((item, index) => {
                            return (
                                <div key={ item.get('orderId') } onClick={() => changeVisible(item.get('orderId'))}>
                                    <Descriptions bordered>
                                        <Descriptions.Item label="订单号">{ item.get('orderId') }</Descriptions.Item>
                                        <Descriptions.Item label="房费">{ item.get('fee') }</Descriptions.Item>
                                        <Descriptions.Item label="入住时间">{ item.get('checkinTime') }</Descriptions.Item>
                                        <Descriptions.Item label="房间类型">{ item.get('roomType') }</Descriptions.Item>
                                        <Descriptions.Item label="押金">{ item.get('deposit') }</Descriptions.Item>
                                        <Descriptions.Item label="退房时间">{ item.get('checkoutTime') }</Descriptions.Item>
                                        <Descriptions.Item label="房间数">
                                            { item.get('roomNums') }
                                        </Descriptions.Item>
                                        <Descriptions.Item label="天数">{ item.get('night') }</Descriptions.Item>
                                        <Descriptions.Item label="订单状态">{ item.get('orderStatus') }</Descriptions.Item>
                                    </Descriptions>
                                    <br/>
                                </div>
                            );
                        })
                    }
                    {
                        <Pagination style={{float: 'right'}} current={this.state.current} total={this.props.totalPages*5} pageSize={5} onChange={(e) => {
                            this.setState({
                                current: e
                            })
                            this.props.changeAllOrder(this.props.id,e);
                        }
                        }/>
                    }
                </TabPane>
                <TabPane tab="待入住" key="2">
                    {
                        toStayIn.map((item, index) => {
                            return (
                                <div key={ item.get('orderId') } onClick={() => changeVisible(item.get('orderId'))}>
                                    <Descriptions bordered>
                                        <Descriptions.Item label="订单号">{ item.get('orderId') }</Descriptions.Item>
                                        <Descriptions.Item label="房费">{ item.get('fee') }</Descriptions.Item>
                                        <Descriptions.Item label="入住时间">{ item.get('checkinTime') }</Descriptions.Item>
                                        <Descriptions.Item label="房间类型">{ item.get('roomType') }</Descriptions.Item>
                                        <Descriptions.Item label="押金">{ item.get('deposit') }</Descriptions.Item>
                                        <Descriptions.Item label="退房时间">{ item.get('checkoutTime') }</Descriptions.Item>
                                        <Descriptions.Item label="房间数">
                                            { item.get('roomNums') }
                                        </Descriptions.Item>
                                        <Descriptions.Item label="天数">{ item.get('night') }</Descriptions.Item>
                                        <Descriptions.Item label="订单状态">{ item.get('orderStatus') }</Descriptions.Item>
                                    </Descriptions>
                                    <br/>
                                </div>
                            );
                        })
                    }
                    <Pagination style={{float: 'right'}} current={this.state.current1} total={this.props.totalPages1*5} pageSize={5} onChange={(e) => {
                        this.setState({
                            current1: e
                        });
                        this.props.changetoStayIn(this.props.id,e);
                    }
                    }/>
                </TabPane>
                <TabPane tab="未付款" key="3">
                    {
                        Unpaid.map((item, index) => {
                            return (
                                <div key={ item.get('orderId') } onClick={() => changeVisible(item.get('orderId'))}>
                                    <Descriptions bordered>
                                        <Descriptions.Item label="订单号">{ item.get('orderId') }</Descriptions.Item>
                                        <Descriptions.Item label="房费">{ item.get('fee') }</Descriptions.Item>
                                        <Descriptions.Item label="入住时间">{ item.get('checkinTime') }</Descriptions.Item>
                                        <Descriptions.Item label="房间类型">{ item.get('roomType') }</Descriptions.Item>
                                        <Descriptions.Item label="押金">{ item.get('deposit') }</Descriptions.Item>
                                        <Descriptions.Item label="退房时间">{ item.get('checkoutTime') }</Descriptions.Item>
                                        <Descriptions.Item label="房间数">
                                            { item.get('roomNums') }
                                        </Descriptions.Item>
                                        <Descriptions.Item label="天数">{ item.get('night') }</Descriptions.Item>
                                        <Descriptions.Item label="订单状态">{ item.get('orderStatus') }</Descriptions.Item>
                                    </Descriptions>
                                    <br/>
                                </div>
                            );
                        })
                    }
                    <Pagination style={{float: 'right'}} current={this.state.current2} total={this.props.totalPages2*5} pageSize={5} onChange={(e) => {
                        this.setState({
                            current2: e
                        });
                        this.props.changeUnpaid(this.props.id,e);
                    }
                    }/>
                </TabPane>
                <TabPane tab="已付款" key="4">
                    {
                        Paid.map((item, index) => {
                            return (
                                <div key={ item.get('orderId') } onClick={() => changeVisible(item.get('orderId'))}>
                                    <Descriptions bordered>
                                        <Descriptions.Item label="订单号">{ item.get('orderId') }</Descriptions.Item>
                                        <Descriptions.Item label="房费">{ item.get('fee') }</Descriptions.Item>
                                        <Descriptions.Item label="入住时间">{ item.get('checkinTime') }</Descriptions.Item>
                                        <Descriptions.Item label="房间类型">{ item.get('roomType') }</Descriptions.Item>
                                        <Descriptions.Item label="押金">{ item.get('deposit') }</Descriptions.Item>
                                        <Descriptions.Item label="退房时间">{ item.get('checkoutTime') }</Descriptions.Item>
                                        <Descriptions.Item label="房间数">
                                            { item.get('roomNums') }
                                        </Descriptions.Item>
                                        <Descriptions.Item label="天数">{ item.get('night') }</Descriptions.Item>
                                        <Descriptions.Item label="订单状态">{ item.get('orderStatus') }</Descriptions.Item>
                                    </Descriptions>
                                    <br/>
                                </div>
                            );
                        })
                    }
                    <Pagination style={{float: 'right'}} current={this.state.current3} total={this.props.totalPages3*5} pageSize={5} onChange={(e) => {
                        this.setState({
                            current3: e
                        });
                        this.props.changePaid(this.props.id,e);
                    }
                    }/>
                </TabPane>
                <TabPane tab="进行中" key="5">
                    {
                        doing.map((item, index) => {
                            return (
                                <div key={ item.get('orderId') } onClick={() => changeVisible(item.get('orderId'))}>
                                    <Descriptions bordered>
                                        <Descriptions.Item label="订单号">{ item.get('orderId') }</Descriptions.Item>
                                        <Descriptions.Item label="房费">{ item.get('fee') }</Descriptions.Item>
                                        <Descriptions.Item label="入住时间">{ item.get('checkinTime') }</Descriptions.Item>
                                        <Descriptions.Item label="房间类型">{ item.get('roomType') }</Descriptions.Item>
                                        <Descriptions.Item label="押金">{ item.get('deposit') }</Descriptions.Item>
                                        <Descriptions.Item label="退房时间">{ item.get('checkoutTime') }</Descriptions.Item>
                                        <Descriptions.Item label="房间数">
                                            { item.get('roomNums') }
                                        </Descriptions.Item>
                                        <Descriptions.Item label="天数">{ item.get('night') }</Descriptions.Item>
                                        <Descriptions.Item label="订单状态">{ item.get('orderStatus') }</Descriptions.Item>
                                    </Descriptions>
                                    <br/>
                                </div>
                            );
                        })
                    }
                    <Pagination style={{float: 'right'}} current={this.state.current4} total={this.props.totalPages4*5} pageSize={5} onChange={(e) => {
                        this.setState({
                            current4: e
                        });
                        this.props.changedoing(this.props.id,e);
                    }
                    }/>
                </TabPane>
                <TabPane tab="已确认" key="6">
                    {
                        Confirmed.map((item, index) => {
                            return (
                                <div key={ item.get('orderId') } onClick={() => changeVisible(item.get('orderId'))}>
                                    <Descriptions bordered>
                                        <Descriptions.Item label="订单号">{ item.get('orderId') }</Descriptions.Item>
                                        <Descriptions.Item label="房费">{ item.get('fee') }</Descriptions.Item>
                                        <Descriptions.Item label="入住时间">{ item.get('checkinTime') }</Descriptions.Item>
                                        <Descriptions.Item label="房间类型">{ item.get('roomType') }</Descriptions.Item>
                                        <Descriptions.Item label="押金">{ item.get('deposit') }</Descriptions.Item>
                                        <Descriptions.Item label="退房时间">{ item.get('checkoutTime') }</Descriptions.Item>
                                        <Descriptions.Item label="房间数">
                                            { item.get('roomNums') }
                                        </Descriptions.Item>
                                        <Descriptions.Item label="天数">{ item.get('night') }</Descriptions.Item>
                                        <Descriptions.Item label="订单状态">{ item.get('orderStatus') }</Descriptions.Item>
                                    </Descriptions>
                                    <br/>
                                </div>
                            );
                        })
                    }
                    <Pagination style={{float: 'right'}} current={this.state.current5} total={this.props.totalPages5*5} pageSize={5} onChange={(e) => {
                        this.setState({
                            current5: e
                        });
                        this.props.changeConfirmed(this.props.id,e);
                    }
                    }/>
                </TabPane>
                <TabPane tab="已取消" key="7">
                    {
                        Cancelled.map((item, index) => {
                            return (
                                <div key={ item.get('orderId') } onClick={() => changeVisible(item.get('orderId'))}>
                                    <Descriptions bordered>
                                        <Descriptions.Item label="订单号">{ item.get('orderId') }</Descriptions.Item>
                                        <Descriptions.Item label="房费">{ item.get('fee') }</Descriptions.Item>
                                        <Descriptions.Item label="入住时间">{ item.get('checkinTime') }</Descriptions.Item>
                                        <Descriptions.Item label="房间类型">{ item.get('roomType') }</Descriptions.Item>
                                        <Descriptions.Item label="押金">{ item.get('deposit') }</Descriptions.Item>
                                        <Descriptions.Item label="退房时间">{ item.get('checkoutTime') }</Descriptions.Item>
                                        <Descriptions.Item label="房间数">
                                            { item.get('roomNums') }
                                        </Descriptions.Item>
                                        <Descriptions.Item label="天数">{ item.get('night') }</Descriptions.Item>
                                        <Descriptions.Item label="订单状态">{ item.get('orderStatus') }</Descriptions.Item>
                                    </Descriptions>
                                    <br/>
                                </div>
                            );
                        })
                    }
                    <Pagination style={{float: 'right'}} current={this.state.current6} total={this.props.totalPages6*5} pageSize={5} onChange={(e) => {
                        this.setState({
                            current6: e
                        });
                        this.props.changeCancelled(this.props.id,e);
                    }
                    }/>
                </TabPane>
                <TabPane tab="已完成" key="8">
                    {
                        Completed.map((item, index) => {
                            return (
                                <div key={ item.get('orderId') } onClick={() => changeVisible(item.get('orderId'))}>
                                    <Descriptions bordered>
                                        <Descriptions.Item label="订单号">{ item.get('orderId') }</Descriptions.Item>
                                        <Descriptions.Item label="房费">{ item.get('fee') }</Descriptions.Item>
                                        <Descriptions.Item label="入住时间">{ item.get('checkinTime') }</Descriptions.Item>
                                        <Descriptions.Item label="房间类型">{ item.get('roomType') }</Descriptions.Item>
                                        <Descriptions.Item label="押金">{ item.get('deposit') }</Descriptions.Item>
                                        <Descriptions.Item label="退房时间">{ item.get('checkoutTime') }</Descriptions.Item>
                                        <Descriptions.Item label="房间数">
                                            { item.get('roomNums') }
                                        </Descriptions.Item>
                                        <Descriptions.Item label="天数">{ item.get('night') }</Descriptions.Item>
                                        <Descriptions.Item label="订单状态">{ item.get('orderStatus') }</Descriptions.Item>
                                    </Descriptions>
                                    <br/>
                                </div>
                            );
                        })
                    }
                    <Pagination style={{float: 'right'}} current={this.state.current7} total={this.props.totalPages7*5} pageSize={5} onChange={(e) => {
                        this.setState({
                            current7: e
                        });
                        this.props.changeCompleted(this.props.id,e);
                    }
                    }/>
                </TabPane>
                <TabPane tab="无效" key="9">
                    {
                        invalid.map((item, index) => {
                            return (

                                <div key={ item.get('orderId') } onClick={() => changeVisible(item.get('orderId'))}>
                                    <Descriptions bordered>
                                        <Descriptions.Item label="订单号">{ item.get('orderId') }</Descriptions.Item>
                                        <Descriptions.Item label="房费">{ item.get('fee') }</Descriptions.Item>
                                        <Descriptions.Item label="入住时间">{ item.get('checkinTime') }</Descriptions.Item>
                                        <Descriptions.Item label="房间类型">{ item.get('roomType') }</Descriptions.Item>
                                        <Descriptions.Item label="押金">{ item.get('deposit') }</Descriptions.Item>
                                        <Descriptions.Item label="退房时间">{ item.get('checkoutTime') }</Descriptions.Item>
                                        <Descriptions.Item label="房间数">
                                            { item.get('roomNums') }
                                        </Descriptions.Item>
                                        <Descriptions.Item label="天数">{ item.get('night') }</Descriptions.Item>
                                        <Descriptions.Item label="订单状态">{ item.get('orderStatus') }</Descriptions.Item>
                                    </Descriptions>
                                    <br/>
                                </div>
                            );
                        })
                    }
                    <Pagination style={{float: 'right'}} current={this.state.current8} total={this.props.totalPages8*5} pageSize={5} onChange={(e) => {
                        this.setState({
                            current8: e
                        });
                        this.props.changeinvalid(this.props.id,e);
                    }
                    }/>
                </TabPane>
                <TabPane tab="已拒绝" key="10">
                        {
                            refused.map((item, index) => {
                                return (
                                    <div key={ item.get('orderId') } onClick={() => changeVisible(item.get('orderId'))}>
                                        <Descriptions bordered>
                                            <Descriptions.Item label="订单号">{ item.get('orderId') }</Descriptions.Item>
                                            <Descriptions.Item label="房费">{ item.get('fee') }</Descriptions.Item>
                                            <Descriptions.Item label="入住时间">{ item.get('checkinTime') }</Descriptions.Item>
                                            <Descriptions.Item label="房间类型">{ item.get('roomType') }</Descriptions.Item>
                                            <Descriptions.Item label="押金">{ item.get('deposit') }</Descriptions.Item>
                                            <Descriptions.Item label="退房时间">{ item.get('checkoutTime') }</Descriptions.Item>
                                            <Descriptions.Item label="房间数">
                                                { item.get('roomNums') }
                                            </Descriptions.Item>
                                            <Descriptions.Item label="天数">{ item.get('night') }</Descriptions.Item>
                                            <Descriptions.Item label="订单状态">{ item.get('orderStatus') }</Descriptions.Item>
                                        </Descriptions>
                                        <br/>
                                    </div>
                                );
                            })
                        }
                        <Pagination style={{float: 'right'}} current={this.state.current9} total={this.props.totalPages9*5} pageSize={5} onChange={(e) => {
                            this.setState({
                                current9: e
                            });
                            this.props.changeRefused(this.props.id,e);
                        }
                        }/>
                    </TabPane>
                <TabPane tab="已评价" key="11">
                        {
                            comment.map((item, index) => {
                                console.log(item);
                                return (
                                    <div key={ item.orderId } onClick={() => changeVisible(item.orderId)}>
                                        <Descriptions bordered>
                                            <Descriptions.Item label="订单号">{ item.orderId }</Descriptions.Item>
                                            <Descriptions.Item label="房费">{ item.fee }</Descriptions.Item>
                                            <Descriptions.Item label="入住时间">{ item.checkinTime }</Descriptions.Item>
                                            <Descriptions.Item label="房间类型">{ item.roomType }</Descriptions.Item>
                                            <Descriptions.Item label="押金">{ item.deposit }</Descriptions.Item>
                                            <Descriptions.Item label="退房时间">{ item.checkoutTime }</Descriptions.Item>
                                            <Descriptions.Item label="房间数">
                                                { item.roomNums }
                                            </Descriptions.Item>
                                            <Descriptions.Item label="天数">{ item.night}</Descriptions.Item>
                                            <Descriptions.Item label="订单状态">{ item.orderStatus }</Descriptions.Item>
                                        </Descriptions>
                                        <br/>
                                    </div>
                                );
                            })
                        }
                        <Pagination style={{float: 'right'}} current={this.state.current10} total={this.props.totalPages10*5} pageSize={5} onChange={(e) => {
                            this.setState({
                                current10: e
                            });
                            this.props.changeComment(this.props.id,e);
                        }
                        }/>
                    </TabPane>
                    <TabPane tab="搜索" key="12">
                        {
                            this.state.search.map((item, index) => {
                                return (
                                    <div key={ item.orderId } onClick={() => changeVisible(item.orderId)}>
                                        <Descriptions bordered>
                                            <Descriptions.Item label="订单号">{ item.orderId }</Descriptions.Item>
                                            <Descriptions.Item label="房费">{ item.fee }</Descriptions.Item>
                                            <Descriptions.Item label="入住时间">{ item.checkinTime }</Descriptions.Item>
                                            <Descriptions.Item label="房间类型">{ item.roomType }</Descriptions.Item>
                                            <Descriptions.Item label="押金">{ item.deposit }</Descriptions.Item>
                                            <Descriptions.Item label="退房时间">{ item.checkoutTime }</Descriptions.Item>
                                            <Descriptions.Item label="房间数">
                                                { item.roomNums }
                                            </Descriptions.Item>
                                            <Descriptions.Item label="天数">{ item.night }</Descriptions.Item>
                                            <Descriptions.Item label="订单状态">{ item.orderStatus }</Descriptions.Item>
                                        </Descriptions>
                                        <br/>
                                    </div>
                                );
                            })
                        }
                        <Pagination style={{float: 'right'}} current={this.state.current11} total={this.state.totalPages11*5} pageSize={5} onChange={(e) => {
                            this.setState({
                                current11: e
                            });
                            search(this.state.orderId,e);
                        }
                        }/>
                    </TabPane>
            </Tabs>
            </Card>
        );
    }

    componentDidMount() {
        const {
            changeAllOrder,
            changePaid,
            changetoStayIn,
            changeUnpaid,
            changedoing,
            changeConfirmed,
            changeCancelled,
            changeCompleted,
            changeinvalid,
            changeRefused,
            changeComment
            } = this.props;
        changeAllOrder(this.props.id,1);
        changePaid(this.props.id,1);
        changetoStayIn(this.props.id,1);
        changeUnpaid(this.props.id,1);
        changedoing(this.props.id,1);
        changeConfirmed(this.props.id,1);
        changeCancelled(this.props.id,1);
        changeCompleted(this.props.id,1);
        changeinvalid(this.props.id,1);
        changeRefused(this.props.id,1);
        changeComment(this.props.id,1);
    }
}


const mapState = (state) => ({
    id: state.getIn(['login','hotelId']),
    allOrder: state.getIn(['order', 'allOrder']),
    totalPages: state.getIn(['order', 'totalPages']),
    totalPages1: state.getIn(['order', 'totalPages1']),
    totalPages2: state.getIn(['order', 'totalPages2']),
    totalPages3: state.getIn(['order', 'totalPages3']),
    totalPages4: state.getIn(['order', 'totalPages4']),
    totalPages5: state.getIn(['order', 'totalPages5']),
    totalPages6: state.getIn(['order', 'totalPages6']),
    totalPages7: state.getIn(['order', 'totalPages7']),
    totalPages8: state.getIn(['order', 'totalPages8']),
    totalPages9: state.getIn(['order', 'totalPages9']),
    totalPages10: state.getIn(['order', 'totalPages10']),
    Paid: state.getIn(['order', 'Paid']),
    toStayIn: state.getIn(['order', 'toStayIn']),
    Unpaid: state.getIn(['order', 'Unpaid']),
    doing: state.getIn(['order', 'doing']),
    Confirmed: state.getIn(['order', 'Confirmed']),
    Cancelled: state.getIn(['order', 'Cancelled']),
    Completed: state.getIn(['order', 'Completed']),
    invalid: state.getIn(['order', 'invalid']),
    refused: state.getIn(['order', 'refused']),
    comment: state.getIn(['order', 'comment']),
});

const mapDispatch = (dispatch) => ({

    changeAllOrder(id,pagenow) {
        dispatch(actionCreators.getAllOrder(id, pagenow));
    },

    changePaid(id,pagenow) {
        dispatch(actionCreators.getPaid(id,pagenow));
    },

    changetoStayIn(id, pagenow) {
        dispatch(actionCreators.gettoStayIn(id, pagenow));
    },

    changeUnpaid(id, pagenow) {
        dispatch(actionCreators.getUnpaid(id, pagenow));
    },

    changedoing(id, pagenow) {
        dispatch(actionCreators.getdoing(id, pagenow));
    },

    changeConfirmed(id, pagenow) {
        dispatch(actionCreators.getConfirmed(id, pagenow));
    },

    changeCancelled(id, pagenow) {
        dispatch(actionCreators.getCancelled(id, pagenow));
    },

    changeCompleted(id, pagenow) {
        dispatch(actionCreators.getCompleted(id, pagenow));
    },

    changeinvalid(id, pagenow) {
        dispatch(actionCreators.getinvalid(id, pagenow));
    },

    changeRefused(id, pagenow) {
        dispatch(actionCreators.getRefused(id, pagenow));
    },

    changeComment(id, pagenow) {
        dispatch(actionCreators.changeComment(id, pagenow));
    },

    changeVisible(orderId) {
        dispatch(actionCreators.changeVisible());
        dispatch(actionCreators.getDetailOrder(orderId));
    }
});

export default connect(mapState, mapDispatch)(TabItem);
