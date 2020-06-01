import React from 'react';
import {Component} from "react";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Card,
    Button,
    Table,
    Divider,
    Icon,
    Modal,
    Form,
    Input,
    InputNumber,
    message,
    Switch,
    Select,
    Checkbox,
    Upload,
    Tag
} from 'antd';
import { connect } from 'react-redux';
import {actionCreators} from "./store";
import {actionCreators1} from "../Coupon/store";
import {actionCreators2} from "../Goods/store";
import axios from 'axios';
const { Option } = Select;


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
};

const { TextArea } = Input;

function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
}



class Product extends Component {

    state = {
        visible: false,
        goods_name: '',
        type_name: '',
        coupon_id: '',
        price: '',
        explain: '',
        putAway: false,
        gongnen: true,
        xiugaiid: '',
        file:[],
        fileList: [],
        totalPage: 1,
        current: 1,
        loading: false,
    };



    componentWillReceiveProps(nextProps,nextContext){
        let self = this;

        setTimeout(function(){
            self.setState({
                totalPage: nextProps.totalPage,
            })

        },0)

    }
    showModal = (record) => {
        console.log(record);
        this.setState({
            visible: true,
            gongnen: true,
        });
        console.log(record);
        if (record != false) {
            var c = '';
            for (var i = 0; i < this.props.goods.length; i++) {
                if (record.type_name == this.props.goods[i].type_name) {
                    c = this.props.goods[i].key;
                    break;
                }
            }
            this.setState({
                goods_name: record.goods_name,
                type_name: c,
                coupon_id: record.coupon_id,
                price: record.price,
                explain: record.explain,
                putAway: record.put_away,
                gongnen: false,
                xiugaiid: record.key,
                fileList: [{
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: record.img,
                }]
            });
        }
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
        var a = this.state.putAway ? 1 : 0;
        const fr = new FormData();
        fr.append("goodsName",this.state.goods_name);
        // var c = '';
        // for (var i = 0; i < this.props.goods.length; i++) {
        //     console.log(this.props.goods)
        //     console.log(this.state.type_name);
        //     console.log(this.props.goods[i].type_name);
        //     if (this.state.type_name == this.props.goods[i].key) {
        //         c = this.props.goods[i].key;
        //         break;
        //     }
        // }
        // console.log(c);
        fr.append("typeId",this.state.type_name);
        fr.append("couponId",this.state.coupon_id);
        fr.append("price",this.state.price);
        fr.append("explain",this.state.explain);
        fr.append("putAway", a);
        fr.append("hotelId",this.props.id);
        fr.append("goodsPicFile", this.state.file[0] || null)
        if (this.state.gongnen == true) {
            axios.post('http://116.85.12.238:8080/aihotel/ssd/goodsInfo',fr).then((res) => {
                if (res.data.msg == '成功') {
                    this.setState({
                        visible: false,
                        goods_name: '',
                        type_name: '',
                        coupon_id: '',
                        price: '',
                        explain: '',
                        putAway: false,
                        fileList:[]
                    });
                    this.props.getProductList(this.props.id,1,2);
                    message.success('添加成功');
                } else {
                    message.error('添加失败');
                    this.setState({
                        visible: false,
                        goods_name: '',
                        type_name: '',
                        coupon_id: '',
                        price: '',
                        explain: '',
                        putAway: false,
                    });
                }
            }).catch(() => {
                message.error('添加失败');
                this.setState({
                    visible: false,
                    goods_name: '',
                    type_name: '',
                    coupon_id: '',
                    price: '',
                    explain: '',
                    putAway: false,
                });
                console.log("error");
            });
        } else {
            fr.append("id",this.state.xiugaiid);
            axios.put('http://116.85.12.238:8080/aihotel/ssd/goodsInfo',fr).then((res) => {
                if (res.data.msg == '成功') {
                    message.success('修改成功');
                    this.setState({
                        id: "",
                        couponName: '',
                        type_name: '',
                        coupon_id: '',
                        price: '',
                        explain: '',
                        putAway: false,
                        xiugaiid: ''
                    });
                    this.props.getProductList(this.props.id,this.state.current,2);
                } else {
                    message.error('修改失败');
                    this.setState({
                        visible: false,
                        goods_name: '',
                        type_name: '',
                        coupon_id: '',
                        price: '',
                        explain: '',
                        putAway: false,
                    });
                }
            }).catch(() => {
                message.error('添加失败');
                this.setState({
                    visible: false,
                    goods_name: '',
                    type_name: '',
                    coupon_id: '',
                    price: '',
                    explain: '',
                    putAway: false,
                });
                console.log("error");
            });
        }

    };

    handleCancel = e => {
        this.setState({
            visible: false,
            goods_name: '',
            type_name: '',
            coupon_id: '',
            price: '',
            explain: '',
            putAway: false,
            gongnen: true,
            xiugaiid: '',
            current: 1,
            fileList:[]
        });
    };

    deleteProduct = (id) => {
        axios.delete('http://116.85.12.238:8080/aihotel/ssd/goodsInfo/' + id).then((res) => {
            if (res.data.msg == '成功') {
                message.success("删除成功");
                this.props.getProductList(this.props.id,this.state.current,2);
            } else {
                message.error("删除失败");
            }
        }).catch(() => {
            message.error("删除失败");
        });
    };
    handleCancel1 = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });




    render() {
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { previewVisible, previewImage, fileList } = this.state;
        const columns = [
            {
                title: 'id',
                dataIndex: 'key',
                key: 'key',
            },
            {
                title: '货品名称',
                dataIndex: 'goods_name',
                key: 'goods_name',
            },
            {
                title: '类别名称',
                dataIndex: 'type_name',
                key: 'type_name',
            },
            {
                title: '优惠劵',
                key: 'coupon_name',
                dataIndex: 'coupon_name',
                render: tags => (
                    <>
                        {tags.map(tag => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';
                            if (tag === 'loser') {
                                color = 'volcano';
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </>
                ),
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
                title: '图片',
                key: 'img',
                render: (text, record) => (
                    <img src={record.img} width="100px" alt=""/>
                )
            },
            {
                title: '上架',
                key: 'put_away',
                render: (text, record) => (
                    <Switch checked={record.put_away} onClick={(e) => {
                        if (e === true) {
                            axios.put('http://116.85.12.238:8080/aihotel/ssd/goodsInfo/' + record.key).then((res) => {
                                message.success("上架成功");
                                this.props.getProductList(this.props.id,this.state.current,2);
                            }).catch(() => {
                                message.error("上架失败");
                                console.log("error");
                            });
                        } else {
                            axios.put('http://116.85.12.238:8080/aihotel/ssd/goodsInfos/' + record.key).then((res) => {
                                message.success("下架成功");
                                this.props.getProductList(this.props.id,this.state.current,2);
                            }).catch(() => {
                                message.error("下架失败");
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
                        <span onClick={() => this.deleteProduct(record.key)}>删除</span>
                    </span>
                ),
            },
        ];

        const { product } = this.props;
        const options = this.props.coupon.map((item, index) => {
            return ({ label: item.coupon_name, value: item.key });
        });
        var b = this.state.coupon_id.split(',');
        var a = b.map(Number);
        const paginationProps = {
            total: this.state.totalPage*2,
            pageSize: 2,
            current: this.state.current,
            onChange: (e) => {
                this.setState({
                    current: e
                });
                console.log(e);
                this.props.getProductList(this.props.id,e,2);
            }
        };
        return (
            <Card
                title={"货品"}
                extra={
                    <Button type={"primary"} onClick={() => this.showModal(false)}>添加货品</Button>
                }
            >
                <Modal
                    title="货品"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form {...layout}>
                        <Form.Item
                            label={"货品名称"}
                        >
                            <Input value={this.state.goods_name} onChange={(e) => {
                                this.setState({
                                    goods_name: e.target.value
                                });
                            }}/>
                        </Form.Item>
                        <Form.Item
                            label={"货品价格"}
                        >
                            <InputNumber value={this.state.price} onChange={(e) => {
                                this.setState({
                                    price: e
                                });
                            }} />
                        </Form.Item>
                        <Form.Item
                            label={"货品类型"}
                        >
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="未选择"
                                optionFilterProp="children"
                                onChange={(e) => {
                                    this.setState({
                                        type_name: e
                                    });
                                }}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                value={this.state.type_name}
                            >
                                {
                                    this.props.goods.map((item, index) => {
                                        if (item.put_away == true) {
                                            return (
                                                <Option value={item.key} key={item.key}>{item.type_name}</Option>
                                            );
                                        }
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label={"优惠劵"}
                        >
                            <Checkbox.Group options={options} value={a} onChange={(checked) => {
                                this.setState({
                                    coupon_id: `${checked}`
                                });
                            }}/>
                        </Form.Item>
                        <Form.Item
                            label={"货品说明"}
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
                        <Form.Item name="pic" label="图片"
                                   rules={[
                                       {
                                           required: true,
                                       },
                                   ]}>
                            <div className="clearfix">
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                    beforeUpload={this.handleReturn}
                                >
                                    {fileList.length >= 1 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel1}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>
                <Table bordered columns={columns} dataSource={product ? product : null} pagination={ paginationProps }/>
            </Card>
        );
    }

    componentDidMount() {
        this.props.getProductList(this.props.id,1,2);
        this.props.getGoodsList(this.props.id);
        this.props.getCouponList(this.props.id);
    }

    handleReturn =(file,fileList)=>{
        console.log(file);
        console.log(this.state.fileList.length+1);
        console.log(this.state.file);
        if(this.state.fileList.length == 0) {
            const file1 = this.state.file;
            file1[0] = file;
            this.setState({
                file: file1
            });
        }
        return false;
    };

}

const mapDispatch = (dispatch) => ({
    getProductList (id,current,pageSize) {
        dispatch(actionCreators.getProductList(id,current,pageSize));
    },
    getGoodsList (id) {
        dispatch(actionCreators2.getGoodsList(id));
    },
    getCouponList (id) {
        dispatch(actionCreators1.getCouponList(id,1,200));
    }
});

const mapState = (state) => ({
    id: state.getIn(['login','hotelId']),
    product: state.getIn(['product', 'product']),
    coupon: state.getIn(['coupon', 'coupon']),
    goods: state.getIn(['goods', 'goods']),
    totalPage: state.getIn(['product', 'totalPage']),
});

export default connect(mapState, mapDispatch)(Product);