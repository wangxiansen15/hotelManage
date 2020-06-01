import React, { Fragment } from "react";
import { connect } from 'react-redux';
import {Drawer, Divider, Col, Row, Button, message} from 'antd';
import {actionCreators} from "../../store";

const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => (
    <div
        style={{
            fontSize: 14,
            lineHeight: '22px',
            marginBottom: 7,
            color: 'rgba(0,0,0,0.65)',
        }}
    >
        <p
            style={{
                marginRight: 8,
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)',
            }}
        >
            {title}:
        </p>
        {content}
    </div>
);

class Cpp extends React.Component {

    render() {
        const {closeDrawer, visible, orderDetail, acceptOrder, refuseOrder, completeOrder } = this.props;
        let mes;
        if (orderDetail.orderStatus === '1'){
            mes =
                (<Row>
                    <Col span={12}>
                        <Button type="primary" onClick={() => acceptOrder(orderDetail.orderId,this.props.id)}>接受订单</Button>
                    </Col>
                    <Col span={12}>
                        <Button type="danger" onClick={() => refuseOrder(orderDetail.orderId,this.props.id)}>拒绝订单</Button>
                    </Col>
                </Row>);
        }
        else if (orderDetail.orderStatus === '4')
            mes =
                (<Row>
                    <Col span={24}>
                        <Button type="primary" onClick={() => completeOrder(orderDetail.orderId,this.props.id)}>完成订单</Button>
                    </Col>
                </Row>);
        else
            mes = '';

        return (
            <div>
                <Drawer
                    width={640}
                    placement="right"
                    closable={false}
                    onClose={closeDrawer}
                    visible={visible}
                >
                    <p style={{ ...pStyle, marginBottom: 24 }}>订单信息</p>
                    <p style={pStyle}>房间信息</p>
                    <Row>
                        <Col span={8}>
                            <DescriptionItem title="房间编号" content={ orderDetail.roomId } />
                        </Col>
                        <Col span={8}>
                            <DescriptionItem title="房间类型" content={ orderDetail.roomType } />
                        </Col>
                        <Col span={8}>
                            <DescriptionItem title="订单状态" content={ orderDetail.orderStatus } />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <DescriptionItem title="房间数" content={ orderDetail.roomNums } />
                        </Col>
                        <Col span={8}>
                            <DescriptionItem title="房费" content={ orderDetail.fee } />
                        </Col>
                        <Col span={8}>
                            <DescriptionItem title="押金" content={ orderDetail.deposit } />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <DescriptionItem title="入住天数" content={ orderDetail.night } />
                        </Col>
                        <Col span={8}>
                            <DescriptionItem title="入住时间" content={ orderDetail.checkinTime } />
                        </Col>
                        <Col span={8}>
                            <DescriptionItem title="退房时间" content={ orderDetail.checkoutTime } />
                        </Col>
                    </Row>
                    <Divider />
                    <p style={pStyle}>下单人信息</p>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem title="下单人账号" content={ orderDetail.consumerAccount } />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem title="下单人电话" content={ orderDetail.phone } />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem
                                title="特殊需求"
                                content={ orderDetail.requirement }
                            />
                        </Col>
                    </Row>
                    <Divider />
                    <p style={pStyle}>入住人信息</p>
                    {
                        (orderDetail.checkinPeople || []).map(item => (
                                <Fragment key = { item.id}>
                                    <Row>
                                        <Col span={24}>
                                            <DescriptionItem
                                            title="入住人编号"
                                            content={ item.id }
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <DescriptionItem title="姓名" content={ item.name } />
                                        </Col>
                                        <Col span={12}>
                                            <DescriptionItem title="身份证号" content={ item.idCard } />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <DescriptionItem title="房间号" content={ item.roomNum } />
                                        </Col>
                                        <Col span={12}>
                                            <DescriptionItem title="手机号码" content={ item.phone } />
                                        </Col>
                                    </Row>
                                </Fragment>))
                    }
                    { mes }
                </Drawer>
            </div>
        );
    }
}

const mapState = (state) => ({
    visible: state.getIn(['order', 'Visible']),
    orderDetail: state.getIn(['order', 'orderDetail']),
    id: state.getIn(['login', 'hotelId'])
});

const mapDispatch = (dispatch) => ({
    closeDrawer() {
        dispatch(actionCreators.closeDrawer());
    },

    acceptOrder(orderId,id) {
        dispatch(actionCreators.acceptOrder(orderId,id));
        message.success("订单已接受");
    },

    refuseOrder(orderId,id) {
        dispatch(actionCreators.refuseOrder(orderId,id));
        message.success("订单已拒绝");
    },

    completeOrder(orderId,id) {
        dispatch(actionCreators.completeOrder(orderId,id));
        message.success("订单已完成");
    }
});

export default connect(mapState, mapDispatch)(Cpp);