import React, {Component} from "react";
import {Table, Divider, Card, Icon,message} from 'antd';
import { connect } from 'react-redux';
import {actionCreators} from "../commodity/store";
import { Button } from 'antd';
import {Link} from "react-router-dom";
import axios from 'axios';


class CommodityList extends Component {

    state = {
        loading: false,
        visible: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };




    render() {
        //商品删除
        const deleteCommodity = (id) => {
            axios.delete('http://116.85.12.238:8080/aihotel/manager/room',{
                params: {	// 请求参数拼接在url上
                    roomId: id
                }
            }).then((res) => {
                console.log(res);
                this.props.getCommodityList();
                message.success("删除成功");
            }).catch(() => {
                console.log("error");
            });
        };
        const columns = [
            {
                title: '房间号',
                dataIndex: 'key',
                key: 'roomId',
            },
            {
                title: '房间类型',
                dataIndex: 'roomType',
                key: 'roomType',
            },
            {
                title: '早餐服务',
                dataIndex: 'breakfast',
                key: 'breakfast',
            },
            {
                title: '床型号',
                dataIndex: 'bedType',
                key: 'bedType',
            },
            {
                title: '房间面积',
                dataIndex: 'roomSize',
                key: 'roomSize',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                <Link to='/commodityDetail'>
                    <span onClick={() => this.props.changeCommodityDetail(record.key)}>修改</span>
                </Link>
                <Divider type="vertical" />
                <span onClick={() => deleteCommodity(record.key)}>删除</span>
            </span>
                ),
            },
        ];

        const { commodityList } = this.props;
        // const { visible, loading } = this.state;
        console.log(commodityList);
        return (
            <Card
                title="商品列表"
                extra={
                    <Link to='/newCommodity'>
                        <Button type="primary" size="large" >新增商品</Button>
                    </Link>
                }
            >
                <Table bordered  columns={columns} dataSource={commodityList} pagination={false}/>
            </Card>
        );
    }

    componentDidMount() {
        this.props.getCommodityList(this.props.id);
    }

}

const mapState = (state) => ({
    commodityList: state.getIn(["commodity", "commodity"]),
    id: state.getIn(['login','hotelId']),
});

const mapDispatch = (dispatch) => ({
    getCommodityList () {
        dispatch(actionCreators.getCommodityList());
    },
    changeCommodityDetail (id) {
        dispatch(actionCreators.changeCommodityDetail(id));
    }
});

export default connect(mapState, mapDispatch)(CommodityList);