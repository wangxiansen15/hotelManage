import React from 'react';
import {Component} from "react";
import {connect} from 'react-redux';
import {Button, Card, Form, Input, Table} from 'antd';
import {actionCreators} from "./store";


class TenantInfo extends Component {

    state = {
        pagenow: 1,
        totalPage: 1,
        pageSize: 7
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

        const { tenantInfo } = this.props;
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '房间号',
                dataIndex: 'roomNum',
                key: 'roomNum',
            },
            {
                title: '订单号',
                dataIndex: 'orderId',
                key: 'orderId',
            },
            {
                title: '手机',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '身份证号码',
                dataIndex: 'idCard',
                key: 'idCard',
            },
        ];
        const paginationProps = {
            total: this.state.totalPage*7,
            current: this.state.pagenow,
            pageSize: this.state.pageSize,
            onChange: (e) => {
                this.setState({
                    current: e
                });
                this.props.getTenantInfo(this.props.hotelId,e,7);
            }
        };
        return (
            <Card title={
                <Form name="horizontal_login" layout="inline">
                    <Form.Item
                        label={"房客搜索"}
                        name="orderId"
                    >
                        <Input/>
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
                <Table bordered columns={columns} dataSource={tenantInfo ? tenantInfo : null} pagination={ paginationProps }/>
            </Card>
        );
    }

    componentDidMount() {
        const { getTenantInfo } = this.props;
        getTenantInfo(this.props.hotelId,1,7);
    }
}

const mapState = (state) => ({
    hotelId: state.getIn(['login','hotelId']),
    tenantInfo: state.getIn(['tenantInfo', 'tenantInfo']),
    totalPage: state.getIn(['tenantInfo', 'totalPage']),
});

const mapDispatch = (dispatch) => ({
    getTenantInfo(id, pagenow, current) {
        dispatch(actionCreators.getTenantInfo(id, pagenow, current));
    }
});

export default connect(mapState, mapDispatch)(TenantInfo);