import React from "react";
import {Button, Card, Col, message, Modal, Row, Upload, Form} from 'antd';
import { connect } from 'react-redux';
import axios from "axios";
import {PlusOutlined} from "@ant-design/icons";
import * as actionCreators from '../store/actionCreators';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


class Avatar extends React.Component {

    constructor(props){
        super(props);
        this.state={
            visible: false,
            previewVisible: false,
            previewImage: '',
            previewVisible2: false,
            previewImage2: '',
            fileList2: [
            ],
            fileList: [
            ],
            fileList3: [
            ],
            file: [],
            file2: [],
            file3: [],
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        var fr = new FormData();
        fr.append("hotelId",this.props.id);
        fr.append("lookPicPath1",this.state.file[0] || null);
        fr.append("lookPicPath2",this.state.file[1] || null);
        fr.append("lookPicPath3",this.state.file[2] || null);
        fr.append("exPicPath1",this.state.file2[0] || null);
        fr.append("exPicPath2",this.state.file2[1] || null);
        fr.append("exPicPath3",this.state.file2[2] || null);
        fr.append("roomPicPath1",this.state.file3[0] || null);
        fr.append("roomPicPath2",this.state.file3[1] || null);
        fr.append("roomPicPath3",this.state.file3[2] || null);
        axios.post('http://116.85.12.238:8080/aihotel/manager/hotelPic',fr).then((res) => {
                this.props.getPic(this.props.id);
                message.success('修改成功');
                this.setState({
                    visible: false,
                });
        }).catch(() => {
            this.setState({
                visible: false,
            });
        });
    };

    handleCancel1 = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

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
        else{
            const file1 = this.state.file;
            file1[2] = file;
            this.setState({
                file: file1
            });
        }
        return false;
    };

    handleReturn2 =(file,fileList)=>{
        if(this.state.fileList2.length == 0) {
            const file1 = this.state.file2;
            file1[0] = file;
            this.setState({
                file2: file1
            });
        }
        else if(this.state.fileList2.length == 1) {
            const file1 = this.state.file2;
            file1[1] = file;
            this.setState({
                file2: file1
            });
        }
        else{
            const file1 = this.state.file2;
            file1[2] = file;
            this.setState({
                file2: file1
            });
        }
        return false;
    };

    handleReturn3 =(file,fileList)=>{
        if(this.state.fileList3.length == 0) {
            const file1 = this.state.file3;
            file1[0] = file;
            this.setState({
                file3: file1
            });
        }
        else if(this.state.fileList3.length == 1) {
            const file1 = this.state.file3;
            file1[1] = file;
            this.setState({
                file3: file1
            });
        }
        else{
            const file1 = this.state.file3;
            file1[2] = file;
            this.setState({
                file3: file1
            });
        }
        return false;
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handleCancel2 = () => this.setState({ previewVisible2: false });

    handleCancel3 = () => this.setState({ previewVisible3: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handlePreview2 = async file2 => {
        if (!file2.url && !file2.preview) {
            file2.preview = await getBase64(file2.originFileObj);
        }

        this.setState({
            previewImage2: file2.url || file2.preview,
            previewVisible2: true,
        });
    };

    handlePreview3 = async file3 => {
        if (!file3.url && !file3.preview) {
            file3.preview = await getBase64(file3.originFileObj);
        }

        this.setState({
            previewImage3: file3.url || file3.preview,
            previewVisible3: true,
        });
    };

    handleChange1 = ({ fileList }) => this.setState({ fileList });

    handleChange2 = ({ fileList }) => this.setState({ fileList2: fileList });

    handleChange3 = ({ fileList }) => this.setState({ fileList3: fileList });

    render() {
        const { previewVisible, previewImage,previewVisible3, previewImage3, previewVisible2, previewImage2, fileList2, fileList, fileList3 } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const hotelPicPre = 'https://lankeren-1254433704.cos.ap-guangzhou.myqcloud.com';
        return (
            <div>
                <Modal
                    title="修改图片"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel1}
                >
                    <Form>
                        <Form.Item>
                            <Card title={"外观图片"}>
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange1}
                                    beforeUpload={this.handleReturn}
                                >
                                    {fileList.length >= 3 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </Card>
                            <Card title={"大堂及设施图片"}>
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList2}
                                    onPreview={this.handlePreview2}
                                    onChange={this.handleChange2}
                                    beforeUpload={this.handleReturn2}
                                >
                                    {fileList2.length >= 3 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible2} footer={null} onCancel={this.handleCancel2}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage2} />
                                </Modal>
                            </Card>
                            <Card title={"房间图片"}>
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList3}
                                    onPreview={this.handlePreview3}
                                    onChange={this.handleChange3}
                                    beforeUpload={this.handleReturn3}
                                >
                                    {fileList3.length >= 3 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible3} footer={null} onCancel={this.handleCancel3}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage3} />
                                </Modal>
                            </Card>
                        </Form.Item>
                    </Form>


                </Modal>
                <Card title={"外观图片"}
                      extra={
                          <Button type="primary" size="large" onClick={this.showModal}>修改图片</Button>
                      }
                >
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={ hotelPicPre + this.props.pic.lookPicPath1  + '?' + Math.round(Math.random()*100)} />}>
                                外观图片一
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={ hotelPicPre + this.props.pic.lookPicPath2 + '?' + Math.round(Math.random()*100)} />}>
                                外观图片二
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={ hotelPicPre + this.props.pic.lookPicPath3 + '?' + Math.round(Math.random()*100)} />}>
                                外观图片三
                            </Card>
                        </Col>
                    </Row>
                </Card>
                <Card title={"大堂及设施图片"}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={ hotelPicPre + this.props.pic.exPicPath1  + '?' + Math.round(Math.random()*100)} />}>
                                大堂及设施图片一
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={ hotelPicPre + '/web/hotelPic/1-exPicPath2.jpg' + '?' + Math.round(Math.random()*100) } />}>
                                大堂及设施图片二
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={ hotelPicPre + this.props.pic.exPicPath3 + '?' + Math.round(Math.random()*100) } />}>
                                大堂及设施图片三
                            </Card>
                        </Col>
                    </Row>
                </Card>
                <Card title={"房间图片"}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={ hotelPicPre + this.props.pic.roomPicPath1 + '?' + Math.round(Math.random()*100) } />}>
                                房间图片一
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={ hotelPicPre + this.props.pic.roomPicPath2  + '?' + Math.round(Math.random()*100)} />}>
                                房间图片二
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={ hotelPicPre + this.props.pic.roomPicPath3 + '?' + Math.round(Math.random()*100) } />}>
                                房间图片三
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }

    componentDidMount() {
        const hotelPicPre = 'https://lankeren-1254433704.cos.ap-guangzhou.myqcloud.com';
        this.setState({
            fileList:[
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: hotelPicPre + this.props.pic.lookPicPath1 + '?' + Math.round(Math.random()*100),
                },
                {
                    uid: '-2',
                    name: 'image.png',
                    status: 'done',
                    url: hotelPicPre + this.props.pic.lookPicPath2 + '?' + Math.round(Math.random()*100),
                },
                {
                    uid: '-3',
                    name: 'image.png',
                    status: 'done',
                    url: hotelPicPre + this.props.pic.lookPicPath3 + '?' + Math.round(Math.random()*100),
                },
            ],
            fileList2:[
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: hotelPicPre + this.props.pic.exPicPath1 + '?' + Math.round(Math.random()*100),
                },
                {
                    uid: '-2',
                    name: 'image.png',
                    status: 'done',
                    url: hotelPicPre + this.props.pic.exPicPath2 + '?' + Math.round(Math.random()*100),
                },
                {
                    uid: '-3',
                    name: 'image.png',
                    status: 'done',
                    url: hotelPicPre + this.props.pic.exPicPath3 + '?' + Math.round(Math.random()*100),
                },
            ],
            fileList3:[
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: hotelPicPre + this.props.pic.roomPicPath1 + '?' + Math.round(Math.random()*100),
                },
                {
                    uid: '-2',
                    name: 'image.png',
                    status: 'done',
                    url: hotelPicPre + this.props.pic.roomPicPath2 + '?' + Math.round(Math.random()*100),
                },
                {
                    uid: '-3',
                    name: 'image.png',
                    status: 'done',
                    url: hotelPicPre + this.props.pic.roomPicPath3 + '?' + Math.round(Math.random()*100),
                },
            ],
        });
    }
}

const mapState = (state) => ({
    pic: state.getIn(['baseInformation','Pic']),
    id: state.getIn(['login','hotelId']),
});

const mapDispatch = (dispatch) => ({
    getPic(id) {
        dispatch(actionCreators.getBaseInformation(id))
    },
});

export default connect(mapState, null)(Avatar);