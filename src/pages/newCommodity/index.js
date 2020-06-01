import React, {Component} from "react";
import {Card, Checkbox, Form, Input, Modal, Upload, Button, Radio, InputNumber, message} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 10 },
};

class NewCommodity extends Component {

    constructor(props){
        super(props);
        //储存新建商品
        this.state={
            roomType: "",
            price: "",
            roomFloor: "",
            roomSize: "",
            bedType: "",
            bedSize: "",
            isBreakfast: "",
            people: "",
            isVip: "",
            allfacilities: this.props.allFacilities,
            facilities: [],
            describe: "",
            previewVisible: false,
            previewImage: '',
            fileList: [
            ],
            file: [],
            chenggong: false,
        };
        this.handleChangeRoomType=this.handleChangeRoomType.bind(this);
        this.handleChangePrice=this.handleChangePrice.bind(this);
        this.handleChangeRoomFloor=this.handleChangeRoomFloor.bind(this);
        this.handleChangeRoomSize=this.handleChangeRoomSize.bind(this);
        this.handleChangeBedType=this.handleChangeBedType.bind(this);
        this.handleChangeBedSize=this.handleChangeBedSize.bind(this);
        this.handleChangePeople=this.handleChangePeople.bind(this);
        this.handleChangeBreakfast=this.handleChangeBreakfast.bind(this);
        this.handleChangeVip=this.handleChangeVip.bind(this);
        this.handleChangeDescribe=this.handleChangeDescribe.bind(this);
    }

    handleCancel = () => this.setState({ previewVisible: false });

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
        const { previewVisible, previewImage, fileList } = this.state;

        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const { chenggong } = this.state;
        if (chenggong === true) {
            return <Redirect to='/commodity' />
        }

        const onFinish = () => {
            let formdata = new FormData();
            formdata.append("hotelId", this.props.id);
            formdata.append("roomType", this.state.roomType);
            formdata.append("price", this.state.price);
            formdata.append("roomFloor", this.state.roomFloor);
            formdata.append("isBreakfast", this.state.isBreakfast);
            formdata.append("isVip", this.state.isVip);
            formdata.append("size", this.state.roomSize);
            formdata.append("bedType", this.state.bedType);
            formdata.append("bedSize", this.state.bedSize);
            formdata.append("personNum", this.state.people);
            formdata.append("description", this.state.describe);
            formdata.append("facilityId", this.state.facilities.toString());
            formdata.append("roomPicPath1", this.state.file[0]);
            formdata.append("roomPicPath2", this.state.file[1]);
            formdata.append("roomPicPath3", this.state.file[2]);
            formdata.append("roomPicPath4", this.state.file[3]);
            axios.post('http://116.85.12.238:8080/aihotel/manager/room',formdata).then((res) => {
                console.log(res);
                message.success("添加成功");
                this.setState({
                    chenggong: true,
                })
            }).catch(() => {
                console.log("error");
            });
    };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
            console.log(this.state.file[0]);
        };
        const options = this.props.allFacilities.map((item, index) => {
            return ({ label: item.name, value: item.id });
        });

        return (
            <Card title="新建商品" extra={
                <Form.Item style={{textAlign:"center"}}>
                    <Button onClick={onFinish} type="primary">提交</Button>
                    <Link to="/commodity">
                        <Button>取消</Button>
                    </Link>
                </Form.Item>
            }>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinishFailed={onFinishFailed}
                >
                        <Form.Item
                            label="房间类型"
                            rules={[{ required: true, message: '请输入房间类型' }]}
                        >
                            <Input onChange={this.handleChangeRoomType} value={this.state.roomType}/>
                        </Form.Item>
                        <Form.Item
                            label="每晚价格"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入每晚价格!',
                                },
                            ]}
                        >
                            <InputNumber onChange={this.handleChangePrice} value={this.state.price}/>
                        </Form.Item>
                        <Form.Item
                            label="楼层范围"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入楼层范围!',
                                },
                            ]}
                        >
                            <Input onChange={this.handleChangeRoomFloor} value={this.state.roomFloor}/>
                        </Form.Item>
                        <Form.Item
                            label="房间面积"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入房间面积!',
                                },
                            ]}
                        >
                            <InputNumber onChange={this.handleChangeRoomSize} value={this.state.roomSize}/>
                        </Form.Item>
                        <Form.Item
                            label="床类型"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入床类型!',
                                },
                            ]}
                        >
                            <Input onChange={this.handleChangeBedType} value={this.state.bedType}/>
                        </Form.Item>
                        <Form.Item
                            label="床尺寸"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入床尺寸!',
                                },
                            ]}
                        >
                            <Input onChange={this.handleChangeBedSize} value={this.state.bedSize}/>
                        </Form.Item>
                        <Form.Item
                            label="可住人数"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入可入住人数!',
                                },
                            ]}
                        >
                            <InputNumber onChange={this.handleChangePeople } value={this.state.people}/>
                        </Form.Item>
                        <Form.Item
                            label="早餐"
                            rules={[
                                {
                                    required: true,
                                    message: '请填写信息!',
                                },
                            ]}
                        >
                            <Radio.Group buttonStyle="solid" value={this.state.isBreakfast} onChange={(e) => {
                                this.setState({
                                    isBreakfast: e.target.value
                                })
                            }
                            }>
                                <Radio.Button value="有早餐">有</Radio.Button>
                                <Radio.Button value="无早餐">没有</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="Vip"
                            rules={[
                                {
                                    required: true,
                                    message: '请填写信息!',
                                },
                            ]}
                        >

                            <Radio.Group buttonStyle="solid" value={ this.state.isVip } onChange={(e) => {
                                this.setState({
                                    isVip: e.target.value
                                })
                            }
                            }>
                                <Radio.Button value="是">是</Radio.Button>
                                <Radio.Button value="否">否</Radio.Button>
                            </Radio.Group>

                        </Form.Item>
                        <Form.Item
                            label="设施"
                        >
                            <Checkbox.Group options={options} value={this.state.facilities} onChange={(e) => {
                                this.setState({
                                    facilities: e
                                })
                            }} />
                        </Form.Item>
                        <Form.Item
                            label="房型描述"
                        >
                            <Input.TextArea value={ this.state.describe } autoSize={true} onChange={(e) => {
                                this.setState({
                                    describe: e.target.value
                                })
                            }}/>
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
                                    {fileList.length >= 4 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                        </Form.Item>
                    </Form>
            </Card>
        );
    }

    handleChangeRoomType (event) {
        // 1.读取输入的值
        const roomType = event.target.value;
        // 2.更新state下面对应的属性的状态
        this.setState({
            roomType:roomType
        })
    }

    handleChangePrice (event) {
        // 1.读取输入的值
        const price = event;
        // 2.更新state下面对应的属性的状态
        this.setState({
            price:price
        })
    }

    handleChangeRoomFloor (event) {
        // 1.读取输入的值
        const roomFloor = event.target.value;
        // 2.更新state下面对应的属性的状态
        this.setState({
            roomFloor:roomFloor
        })
    }

    handleChangeRoomSize (event) {
        // 1.读取输入的值
        const roomSize = event;
        // 2.更新state下面对应的属性的状态
        this.setState({
            roomSize:roomSize
        })
    }

    handleChangeBedType (event) {
        // 1.读取输入的值
        const bedType = event.target.value;
        // 2.更新state下面对应的属性的状态
        this.setState({
            bedType:bedType
        })
    }

    handleChangeBedSize (event) {
        // 1.读取输入的值
        const bedSize = event.target.value;
        // 2.更新state下面对应的属性的状态
        this.setState({
            bedSize:bedSize
        })
    }

    handleChangePeople (event) {
        // 1.读取输入的值
        const people = event;
        // 2.更新state下面对应的属性的状态
        this.setState({
            people:people
        })
    }

    handleChangeBreakfast (event) {
        // 1.读取输入的值
        const isBreakfast = event;
        // // 2.更新state下面对应的属性的状态
        this.setState({
            isBreakfast:isBreakfast
        })
    }

    handleChangeVip (event) {
        // 1.读取输入的值
        const isVip = event;
        // // 2.更新state下面对应的属性的状态
        this.setState({
            isVip:isVip
        })
    }


    handleChangeDescribe (event) {
        // 1.读取输入的值
        const describe = event.target.value;
        // 2.更新state下面对应的属性的状态
        this.setState({
            describe:describe
        })
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
        else if(this.state.fileList.length == 1) {
            const file1 = this.state.file;
            file1[1] = file;
            this.setState({
                file: file1
            });
        }
        else if(this.state.fileList.length == 2) {
            const file1 = this.state.file;
            file1[2] = file;
            this.setState({
                file: file1
            });
        }
        else {
            const file1 = this.state.file;
            file1[3] = file;
            this.setState({
                file: file1
            });
        }
        return false;
    };

}

const mapState = (state) => ({
    allFacilities: state.getIn(["baseInformation", "allFacilites"]),
    id: state.getIn(['login','hotelId'])
});

export default  connect(mapState, null)(NewCommodity);