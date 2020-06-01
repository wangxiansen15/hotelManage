import {message, Switch, Table} from 'antd';
import React from "react";
import { connect } from 'react-redux';
import * as actionCreators from '../store/actionCreators';

class Facilites extends React.Component {
    render() {
        const postFacilites = (id) => {
            var str = '';
            for (var i = 0; i < this.props.facilites.length; i++) {
                if (i + 1 !== id) {
                    if (this.props.facilites[i].isOpen === true) {
                        str += this.props.facilites[i].id + ',';
                    }
                }
                else {
                    if (this.props.facilites[i].isOpen === false) {
                        str += this.props.facilites[i].id + ',';
                    }
                }
            }
            this.props.changeFacilites(id, str);
        };
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '设施类型',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '设施名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '开关',
                key: 'button',
                render: (text, record) => (
                    <Switch checked={text.isOpen} onClick={() => postFacilites(text.id) } onChange={(e) => {
                        if (e === true) {
                            message.success("开启成功");
                        } else {
                            message.success("关闭成功");
                        }
                    }}/>
                ),
            }
        ];
        return(
            <Table dataSource={this.props.facilites} columns={columns} pagination={false}/>
        );
    }

}

const mapState = (state) => ({
    facilites: state.getIn(['baseInformation', 'facilites'])
});

const mapDispatch = (dispatch) => ({
    changeFacilites(id, str) {
        dispatch(actionCreators.changeFacilites(id, str));
    }
});

export default connect(mapState ,mapDispatch)(Facilites);