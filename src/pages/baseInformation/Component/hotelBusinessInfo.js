import { Form, Input, Button, Switch, Card, InputNumber, Modal, message } from 'antd';
import React from "react";
import {connect} from 'react-redux';
import axios from 'axios';

const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
};

const { TextArea } = Input;

class BusinessInfo extends React.Component {

    constructor(props){
        super(props);
        //储存新建商品
        this.state={
            id: "",
            deposit: "",
            openTime1: "",
            openTime2: "",
            closeTime1: "",
            closeTime2: "",
            stayTime1: "",
            stayTime2: "",
            awayTime1: "",
            awayTime2: "",
            attention: "",
            pet: true,
            visible: false
        };
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        axios.post('http://116.85.12.238:8080/aihotel/manager/hotelBusinessInfo',{
            hotelId: this.props.id,
            deposit: this.state.deposit,
            openTime: this.state.openTime1 + ':' + this.state.openTime2,
            closeTime: this.state.closeTime1 + ':' + this.state.closeTime2,
            stayTime: this.state.stayTime1 + ':' + this.state.stayTime2,
            awayTime: this.state.awayTime1 + ':' + this.state.awayTime2,
            attention: this.state.attention,
            pet: this.state.pet ? "能" : "否"
        }).then((res) => {
            if (res.data === 0) {
                message.success('修改成功');
                this.setState({
                    visible: false,
                });
            } else {
                message.error('修改失败');
            }
        }).catch(() => {
            message.error('修改失败');
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Modal
                    title="通知"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>是否修改营业信息？</p>
                </Modal>
            <Card title={"营业信息"}
                  extra={
                      <Button type="primary" size="large" onClick={this.showModal}>修改营业信息</Button>
                  }
            >
                <Form {...layout}>
                    <Form.Item
                        label="押金"
                    >
                                <InputNumber
                                    size="large"
                                    min={1}
                                    max={100000}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    value={this.state.deposit}
                                    onChange={(e) => {
                                        this.setState({
                                            deposit: e
                                        });
                                    }}
                                />
                    </Form.Item>
                    <Form.Item
                        label="开门时间"
                    >
                                <div>
                                    <InputNumber
                                        size="large"
                                        min={0}
                                        max={23}
                                        value={this.state.openTime1}
                                        onChange={(e) => {
                                            this.setState({
                                                openTime1: e
                                            });
                                        }}
                                    />
                                    <span style={{marginLeft: "10px"}}>时</span>
                                    <InputNumber
                                        size="large"
                                        min={0}
                                        max={59}
                                        style={{marginLeft: "50px"}}
                                        value={this.state.openTime2}
                                        onChange={(e) => {
                                            this.setState({
                                                openTime2: e
                                            });
                                        }}
                                    />
                                    <span style={{marginLeft: "10px"}}>分</span>
                                </div>
                    </Form.Item>
                    <Form.Item
                        label="关门时间"
                    >
                                <div>
                                    <InputNumber
                                        size="large"
                                        min={0}
                                        max={23}
                                        value={this.state.closeTime1}
                                        onChange={(e) => {
                                            this.setState({
                                                closeTime1: e
                                            });
                                        }}
                                    />
                                    <span style={{marginLeft: "10px"}}>时</span>
                                    <InputNumber
                                        size="large"
                                        min={0}
                                        max={59}
                                        style={{marginLeft: "50px"}}
                                        value={this.state.closeTime2}
                                        onChange={(e) => {
                                            this.setState({
                                                closeTime2: e
                                            });
                                        }}
                                    />
                                    <span style={{marginLeft: "10px"}}>分</span>
                                </div>
                    </Form.Item>
                    <Form.Item
                        label="入住时间"
                    >
                                <div>
                                    <InputNumber
                                        size="large"
                                        min={0}
                                        max={23}
                                        value={this.state.stayTime1}
                                        onChange={(e) => {
                                            this.setState({
                                                stayTime1: e
                                            });
                                        }}
                                    />
                                    <span style={{marginLeft: "10px"}}>时</span>
                                    <InputNumber
                                        size="large"
                                        min={0}
                                        max={59}
                                        style={{marginLeft: "50px"}}
                                        value={this.state.stayTime2}
                                        onChange={(e) => {
                                            this.setState({
                                                stayTime2: e
                                            });
                                        }}
                                    />
                                    <span style={{marginLeft: "10px"}}>分</span>
                                </div>
                    </Form.Item>
                    <Form.Item
                        label="离店时间"
                    >
                                <div>
                                    <InputNumber
                                        size="large"
                                        min={0}
                                        max={23}
                                        value={this.state.awayTime1}
                                        onChange={(e) => {
                                            this.setState({
                                                awayTime1: e
                                            });
                                        }}
                                    />
                                    <span style={{marginLeft: "10px"}}>时</span>
                                    <InputNumber
                                        size="large"
                                        min={0}
                                        max={59}
                                        style={{marginLeft: "50px"}}
                                        value={this.state.awayTime2}
                                        onChange={(e) => {
                                            this.setState({
                                                awayTime2: e
                                            });
                                        }}
                                    />
                                    <span style={{marginLeft: "10px"}}>分</span>
                                </div>
                    </Form.Item>
                    <Form.Item
                        label="注意事项"
                    >
                                <TextArea
                                    autoSize={{ minRows: 3, maxRows: 8 }}
                                    style={{width: "70%"}}
                                    value={this.state.attention}
                                    onChange={(e) => {
                                        this.setState({
                                            attention : e.target.value
                                        });
                                    }}
                                />
                    </Form.Item>
                    <Form.Item
                        label="是否携带宠物"
                    >
                        <Switch checkedChildren="能" unCheckedChildren="否" checked={this.state.pet} onClick={(e) => {
                                this.setState({
                                    pet: e
                                });
                        }}/>
                    </Form.Item>
                </Form>
            </Card>
            </div>
        );
    }

    componentDidMount() {
        var openTime = new Array(), closeTime = new Array(),stayTime = new Array(), awayTime = new Array();
        openTime = this.props.openTime.split(":");
        closeTime = this.props.closeTime.split(":");
        stayTime = this.props.stayTime.split(":");
        awayTime = this.props.awayTime.split(":");
        if (this.props.pet == "能") {
            this.setState({
                pet: true
            })
        } else {
            this.setState({
                pet: false
            })
        }
        this.setState({
            id: this.props.id,
            deposit: this.props.deposit,
            openTime1: openTime[0],
            openTime2: openTime[1],
            closeTime1: closeTime[0],
            closeTime2: closeTime[1],
            stayTime1: stayTime[0],
            stayTime2: stayTime[1],
            awayTime1: awayTime[0],
            awayTime2: awayTime[1],
            attention: this.props.attention,
        });
    }
}

const mapState = (state) => ({
    id: state.getIn(['login', 'hotelId']),
    deposit: state.getIn(['baseInformation', 'hotelBusinessInfo', 'deposit']),
    openTime: state.getIn(['baseInformation', 'hotelBusinessInfo', 'openTime']),
    closeTime: state.getIn(['baseInformation', 'hotelBusinessInfo', 'closeTime']),
    stayTime: state.getIn(['baseInformation', 'hotelBusinessInfo', 'stayTime']),
    awayTime: state.getIn(['baseInformation', 'hotelBusinessInfo', 'awayTime']),
    attention: state.getIn(['baseInformation', 'hotelBusinessInfo', 'attention']),
    pet: state.getIn(['baseInformation', 'hotelBusinessInfo', 'pet'])
});

export default connect(mapState, null)(BusinessInfo);