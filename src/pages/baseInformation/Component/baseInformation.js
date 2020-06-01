import React from 'react';
import {Component} from "react";
import {connect} from 'react-redux';
import {Card, Form, InputNumber, Input, Cascader, Select, Spin, Button, Modal, message} from 'antd';
import options from './cities'
import getCity from './city/city.json';
import getProvince from './city/province.json';
import axios from "axios";
import {actionCreators} from "../store";


const { TextArea } = Input;

const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 10 },
};




class Base extends Component {

    constructor(props){
        super(props);
        this.state={
            cascader: [], // Cascader级联 当前省市区
            province: getProvince[0].name, // 当前省
            cities: getCity[getProvince[0].id], // 当前省下市
            cityValue: getCity[getProvince[0].id][0].name, // 当前市
            provinceCode: '', // 当前省code
            cityCode: '', // 当前市code
            id: '',
            visible: false,
            hotelName: '',
            address: '',
            lowestPrice: '',
            phone: '',
            roomNums: '',
            introduction: '',
        }
    }

    onChange = (value, i) => {
        this.setState({
            cascader: value,
        }, () => {
            console.log(value);
            console.log(i);
        })
    }

    // 省下拉框改变
    changeProvince = (e, i) => {
        this.setState({
            province: e,
            cities: getCity[i.key],
            cityValue: getCity[i.key][0].name,
            provinceCode: i.key,
        },() => {
            console.log({province:e,cities: getCity[i.key],cityValue:getCity[i.key][0].name,provinceCode:i.key})
        })
    }
    // 市下拉框改变
    changeCity = (e, i) => {
        this.setState({
            cityValue: e,
            cityCode: i.key
        },() => {
            console.log({cityValue: e, cityCode: i.key})
        })
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        axios.post('http://116.85.12.238:8080/aihotel/manager/hotelBaseInfo',{
            hotelId: this.props.id,
            hotelName: this.state.hotelName,
            score: this.props.score,
            province: this.state.cascader[0]||null,
            city: this.state.cascader[1],
            district: this.state.cascader[2],
            address: this.state.address,
            lowestPrice: this.state.lowestPrice,
            phone: this.state.phone,
            roomNums: this.state.roomNums,
            introduction: this.state.introduction,
            longitude: this.props.longitude,
            latitude: this.props.latitude,
        }).then((res) => {
            if (res.data === 0) {
                message.success('修改成功');
                this.props.getInfo();
                this.setState({
                    visible: false,
                });
                this.props.getBaseInformation(this.props.id);
            } else {
                message.error('修改失败');
            }
        }).catch(() => {
            this.setState({
                visible: false,
            });
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        const { cascader, province, cities, cityValue } = this.state;
        const {id, hotelName, address, lowestPrice, phone, roomNums, introduction} = this.props;
        if (id !== undefined && this.state.id == '') {
            this.setState({
                id: id,
                hotelName: hotelName,
                address: address,
                visible: false,
                lowestPrice: lowestPrice,
                phone: phone,
                roomNums: roomNums,
                introduction: introduction,
            });
        }
        if (this.state.cascader == '' && (this.props.province || this.props.city || this.props.district)) {
            this.setState({
                cascader: [this.props.province, this.props.city, this.props.district]
            });
        }
        return (
            <div>
                <Modal
                    title="通知"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>是否修改基础信息？</p>
                </Modal>
                <Card title={"基础信息"}
                      extra={
                        <Button type="primary" size="large" onClick={this.showModal}>修改基础信息</Button>
                }>
                    <Form {...layout}>
                         <Form.Item label={"酒店编号"}>
                             <InputNumber disabled value={this.props.id}/>
                         </Form.Item>
                        <Form.Item label={"酒店分数"}>
                            <InputNumber disabled value={this.props.score}/>
                        </Form.Item>
                        <Form.Item label={"酒店名称"}>
                            <Input value={this.state.hotelName} onChange={(e) => {
                                    this.setState({
                                        hotelName: e.target.value
                                    });
                                }
                            }/>
                        </Form.Item>
                        <Form.Item label={"酒店所在地"}>
                            <Cascader
                                value={cascader}
                                options={options}
                                onChange={this.onChange}
                                placeholder="选择Cascader地址"
                                style={{ width: 300 }}
                            />
                                    <TextArea
                                        autoSize={{ minRows: 3, maxRows: 8 }}
                                        style={{width: "70%"}}
                                        value={this.state.address}
                                        onChange={(e) => {
                                            this.setState({
                                                address : e.target.value
                                            });
                                        }}
                                    />
                        </Form.Item>
                        <Form.Item label={"最低价"}>
                            <InputNumber value={this.state.lowestPrice} onChange={(e) => {
                                    this.setState({
                                        lowestPrice : e
                                    });
                                }
                            }/>
                        </Form.Item>
                        <Form.Item label={"酒店电话"}>
                            <Input value={this.state.phone} onChange={(e) => {
                                    this.setState({
                                        phone : e.target.value
                                    });
                                }
                            }/>
                        </Form.Item>
                        <Form.Item label={"房间数"}>
                           <InputNumber value={this.state.roomNums} onChange={(e) => {
                                    this.setState({
                                        roomNums : e
                                    });
                                }
                           }/>
                        </Form.Item>
                        <Form.Item label={"酒店介绍"}>
                                    <TextArea
                                        autoSize={{ minRows: 3, maxRows: 8 }}
                                        style={{width: "70%"}}
                                        value={this.state.introduction}
                                        onChange={(e) => {
                                            console.log(e.target);
                                            this.setState({
                                                introduction : e.target.value
                                            });
                                        }}
                                    />
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }

}



const mapState = (state) => ({
    id: state.getIn(['baseInformation', 'hotelBaseInfo', 'hotelId']),
    score: state.getIn(['baseInformation', 'hotelBaseInfo', 'score']),
    hotelName: state.getIn(['baseInformation', 'hotelBaseInfo', 'hotelName']),
    province: state.getIn(['baseInformation', 'hotelBaseInfo', 'province']),
    city: state.getIn(['baseInformation', 'hotelBaseInfo', 'city']),
    district: state.getIn(['baseInformation', 'hotelBaseInfo', 'district']),
    address: state.getIn(['baseInformation', 'hotelBaseInfo', 'address']),
    longitude: state.getIn(['baseInformation', 'hotelBaseInfo', 'longitude']),
    latitude: state.getIn(['baseInformation', 'hotelBaseInfo', 'latitude']),
    distance: state.getIn(['baseInformation', 'hotelBaseInfo', 'distance']),
    lowestPrice: state.getIn(['baseInformation', 'hotelBaseInfo', 'lowestPrice']),
    monthlyConsumption: state.getIn(['baseInformation', 'hotelBaseInfo', 'monthlyConsumption']),
    phone: state.getIn(['baseInformation', 'hotelBaseInfo', 'phone']),
    roomNums: state.getIn(['baseInformation', 'hotelBaseInfo', 'roomNums']),
    introduction: state.getIn(['baseInformation', 'hotelBaseInfo', 'introduction']),
});

const mapDispatch = (dispatch) => ({
    getInfo() {
        dispatch(actionCreators.getBaseInformation(this.props.id))
    }
});


export default connect(mapState, mapDispatch)(Base);