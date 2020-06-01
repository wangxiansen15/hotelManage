import React, { Component } from "react";
import { connect } from 'react-redux';
import { Tabs, Card } from 'antd';
import Facilites from "./Component/facilities";
import BusinessInfo from "./Component/hotelBusinessInfo";
import Avatar from './Component/images';
import Base from "./Component/baseInformation";

import * as actionCreators from "./store/actionCreators";
const { TabPane } = Tabs;

class BaseInformation extends Component {


    render() {
        return (
            <Card title={"基础信息"}>
                <Tabs defaultActiveKey="1">
                <TabPane tab="基本信息" key="1">
                    <Base />
                </TabPane>
                <TabPane tab="酒店图片" key="2">
                    <Avatar />
                </TabPane>
                <TabPane tab="营业信息" key="3">
                    <BusinessInfo />
                </TabPane>
                <TabPane tab="设施信息" key="4">
                    <Facilites />
                </TabPane>
            </Tabs>
            </Card>
        );
    }

    componentDidMount() {
        this.props.getFacilites(this.props.id);
        this.props.getBaseInformation(this.props.id);
    }
}

const mapDispatch = (dispatch) => ({
    getFacilites(id) {
        dispatch(actionCreators.getFacilites(id));
    },
    getBaseInformation(id) {
        dispatch(actionCreators.getBaseInformation(id));
    }
});

const mapState = (state) => ({
    id: state.getIn(['login','hotelId']),
});


export default connect(mapState, mapDispatch)(BaseInformation);