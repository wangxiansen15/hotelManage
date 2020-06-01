import React from 'react';
import {Component} from "react";
import {Button, Card, Divider, Form, Input, InputNumber, message, Modal, Switch, Table} from "antd";
import axios from "axios";
import { connect } from 'react-redux';
import {actionCreators2} from "../Goods/store";

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
};

const { TextArea } = Input;

class Goods extends Component {
    state = {
        visible: false,
        goodsName: '',
        explain: '',
        putAway: false,
        gongnen: ''
    };

    showModal = (record) => {
        this.setState({
            visible: true,
            gongnen: true,
        });
        if (record != false) {
            this.setState({
                goodsName: record.type_name,
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
        fr.append("typeName",this.state.goodsName);
        fr.append("explain",this.state.explain);
        fr.append("putAway", a);
        fr.append("hotelId",this.props.id);
        if (this.state.gongnen == true) {
            axios.post('http://116.85.12.238:8080/aihotel/ssd/goodsType',fr).then((res) => {
                console.log(res);
                if (res.data.data == '成功') {
                    this.setState({
                        goodsName: '',
                        explain: '',
                        putAway: false,
                    });
                    this.props.getGoodsList(this.props.id);
                } else {
                    message.error('添加失败');
                }
            }).catch(() => {
                message.error('添加失败');
                console.log("error");
            });
        } else {
            fr.append('id',this.state.xiugaiid);
            axios.put('http://116.85.12.238:8080/aihotel/ssd/goodsType',fr).then((res) => {
                console.log(res);
                if (res.data.msg == '成功') {
                    this.setState({
                        goodsName: '',
                        explain: '',
                        putAway: false,
                    });
                    this.props.getGoodsList(this.props.id);
                    message.success("成功");
                } else {
                    message.error('失败');
                }
            }).catch(() => {
                message.error('失败');
                console.log("error");
            });
        }

    };

    handleCancel = e => {
        this.setState({
            visible: false,
            goodsName: '',
            explain: '',
            putAway: '',
        });
    };

    deleteGoods = (id) => {
        axios.delete('http://116.85.12.238:8080/aihotel/ssd/goodsType/' + id).then((res) => {
            if (res.data.msg == '成功') {
                message.success("删除成功");
                this.props.getGoodsList(this.props.id);
            } else {
                message.error("删除失败");
            }
        }).catch(() => {
            console.log("error");
        });
    };

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'key',
                key: 'key',
            },
            {
                title: '类别名称',
                dataIndex: 'type_name',
                key: 'type_name',
            },
            {
                title: '说明',
                dataIndex: 'explain',
                key: 'explain',
            },
            {
                title: '上架',
                key: 'put_away',
                render: (text, record) => (
                    <Switch checked={record.put_away} onClick={(e) => {
                        if (e === true) {
                            axios.put('http://116.85.12.238:8080/aihotel/ssd/goodsType/' + record.key).then((res) => {
                                this.props.getGoodsList(this.props.id);
                                message.success("上架成功");
                            }).catch(() => {
                                console.log("error");
                            });
                        } else {
                            axios.put('http://116.85.12.238:8080/aihotel/ssd/goodsTypes/' + record.key).then((res) => {
                                console.log(res);
                                message.success("下架成功");
                                this.props.getGoodsList(this.props.id);
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
                        <span onClick={() => this.deleteGoods(record.key)}>删除</span>
                    </span>
                ),
            },
        ];

        const { goods } = this.props;
        console.log("check"+ this.state.putAway);
        return (
            <Card
                title={"货品类别"}
                extra={
                    <Button type={"primary"} onClick={() => this.showModal(false)}>添加货品类别</Button>
                }
            >
                <Modal
                    title="货品类别"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form {...layout}>
                        <Form.Item
                            label={"货品类别名称"}
                        >
                            <Input value={this.state.goodsName } onChange={(e) => {
                                this.setState({
                                    goodsName: e.target.value
                                });
                            }}/>
                        </Form.Item>
                        <Form.Item
                            label={"货品类别说明"}
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
                            <Switch checked={this.state.putAway} onChange={(e) => {
                                this.setState({
                                    putAway: e
                                });
                            }} />
                        </Form.Item>
                    </Form>
                </Modal>
                <Table bordered columns={columns} dataSource={goods ? goods : null}/>
            </Card>
        );
    }

    componentDidMount() {
        this.props.getGoodsList(this.props.id);
    }
}


const mapState = (state) => ({
    id: state.getIn(['login','hotelId']),
    goods: state.getIn(['goods', 'goods']),
});

const mapDispatch = (dispatch) => ({
    getGoodsList (id) {
        dispatch(actionCreators2.getGoodsList(id));
    },
});

export default connect(mapState, mapDispatch)(Goods);