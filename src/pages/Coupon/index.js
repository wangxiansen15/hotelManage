import React from 'react';
import {Component} from "react";
import {Card, Button, Table, Divider, Icon, Modal, Form, Input, InputNumber, message } from 'antd';
import { connect } from 'react-redux';
import {actionCreators1} from "../Coupon/store";
import {Link} from "react-router-dom";
import { Switch } from 'antd';
import axios from 'axios';

function onChange(checked) {
    console.log(`switch to ${checked}`);
}


const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
};

const { TextArea } = Input;

class Coupon extends Component {

    state = {
        visible: false,
        couponName: '',
        price: '',
        explain: '',
        putAway: 1,
        gongnen: true,
        xiugaiid: '',
        totalPage: '1',
        current: '1'
    };

    showModal = (record) => {
        this.setState({
            visible: true,
            gongnen: true,
        });
        if (record !== false) {
            console.log(record.coupon_name);
            this.setState({
                couponName: record.coupon_name,
                price: record.price,
                explain: record.explain,
                putAway: record.put_away,
                gongnen: false,
                xiugaiid: record.key
            });
        }
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });

        var a = this.state.putAway ? 1 : 0;
        const fr = new FormData();
        fr.append("couponName",this.state.couponName);
        fr.append("price",this.state.price);
        fr.append("explain",this.state.explain);
        fr.append("putAway", a);
        fr.append("hotelId",this.props.id);
        if (this.state.gongnen == true) {
            axios.post('http://116.85.12.238:8080/aihotel/ssd/coupon',fr).then((res) => {
                if (res.data.msg == '成功') {
                    this.setState({
                        couponName: '',
                        price: '',
                        explain: '',
                        putAway: 1,
                    });
                    this.props.getCouponList(this.props.id,1,6);
                    message.success('添加成功');
                } else {
                    message.error('添加失败');
                }
            }).catch(() => {
                message.error('添加失败');
                console.log("error");
            });
        } else {
            fr.append("id",this.state.xiugaiid);
            axios.put('http://116.85.12.238:8080/aihotel/ssd/coupon',fr).then((res) => {
                if (res.data.msg == '成功') {
                    this.setState({
                        id: "",
                        couponName: '',
                        price: '',
                        explain: '',
                        putAway: 1,
                        xiugaiid: ''
                    });
                    this.props.getCouponList(this.props.id,this.state.current,6);
                    message.success('修改成功');
                } else {
                    message.error('修改失败');
                }
            }).catch(() => {
                message.error('修改失败');
                console.log("error");
            });
        }
    };

    handleCancel = e => {
        this.setState({
            visible: false,
            couponName: '',
            price: '',
            explain: '',
            putAway: 1,
        });
    };

    deleteCoupon = (id) => {
        axios.delete('http://116.85.12.238:8080/aihotel/ssd/coupon/' + id).then((res) => {
            if (res.data.msg == '成功') {
                message.success("删除成功");
                this.props.getCouponList(this.props.id,this.state.current,6);
            } else {
                message.error("删除失败");
            }
        }).catch(() => {
            message.error("删除失败");
        });
    };

    componentWillReceiveProps(nextProps,nextContext){
        let self = this;

        setTimeout(function(){
            self.setState({
                totalPage: nextProps.totalPage,
            })

        },0)

    }

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'key',
                key: 'key',
            },
            {
                title: '名称',
                dataIndex: 'coupon_name',
                key: 'coupon_name',
            },
            {
                title: '说明',
                dataIndex: 'explain',
                key: 'explain',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: '上架',
                key: 'put_away',
                render: (text, record) => (
                    <Switch checked={record.put_away} onClick={(e) => {
                        if (e === true) {
                            axios.put('http://116.85.12.238:8080/aihotel/ssd/coupon/' + record.key).then((res) => {
                                this.props.getCouponList(this.props.id,this.state.current,6);
                                message.success('上架成功');
                            }).catch(() => {
                                console.log("error");
                            });
                        } else {
                            axios.put('http://116.85.12.238:8080/aihotel/ssd/coupons/' + record.key).then((res) => {
                                this.props.getCouponList(this.props.id,this.state.current,6);
                                message.success('下架成功');
                            }).catch(() => {
                                console.log("error");
                            });
                        }
                    }}/>
                ),
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <span onClick={() => this.showModal(record)}>修改</span>
                        <Divider type="vertical" />
                        <span onClick={() => this.deleteCoupon(record.key)}>删除</span>
                    </span>
                ),
            },
        ];

        const { coupon } = this.props;

        const paginationProps = {
            total: this.state.totalPage*6,
            onChange: (e) => {
                this.setState({
                    current: e
                });
                this.props.getCouponList(this.props.id,e,6);
            }
        };


        return (
            <Card
                title={"优惠劵"}
                extra={
                    <Button type={"primary"} onClick={() => this.showModal(false)}>添加优惠劵</Button>
                }
            >
                <Modal
                    title="优惠劵"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form {...layout}>
                        <Form.Item
                            label={"优惠劵名称"}
                        >
                            <Input value={this.state.couponName} onChange={(e) => {
                                this.setState({
                                    couponName: e.target.value
                                });
                            }}/>
                        </Form.Item>
                        <Form.Item
                            label={"优惠劵价格"}
                        >
                            <InputNumber value={this.state.price} onChange={(e) => {
                                this.setState({
                                    price: e
                                });
                            }} />
                        </Form.Item>
                        <Form.Item
                            label={"优惠劵说明"}
                        >
                            <TextArea value={this.state.explain} onChange={(e) => {
                                this.setState({
                                    explain: e.target.value
                                });
                            }} />
                        </Form.Item>
                        <Form.Item
                            label={"是否上架"}
                        >
                            <Switch defaultChecked={this.state.putAway} onChange={(e) => {
                                this.setState({
                                    putAway: e
                                });
                            }} />
                        </Form.Item>
                    </Form>
                </Modal>
                <Table bordered columns={columns} dataSource={coupon ? coupon : null} pagination={ paginationProps }/>
            </Card>
        );
    }

    componentDidMount() {
        this.props.getCouponList(this.props.id,1,6);
    }
}

const mapDispatch = (dispatch) => ({
    getCouponList (id,current,pagesize) {
        dispatch(actionCreators1.getCouponList(id,current,6));
    },
});

const mapState = (state) => ({
    id: state.getIn(['login','hotelId']),
    coupon: state.getIn(['coupon', 'coupon']),
    totalPage: state.getIn(['coupon', 'totalPage']),
});

export default connect(mapState, mapDispatch)(Coupon);