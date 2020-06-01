import React, {Component,createElement, useState} from "react";
import { connect } from 'react-redux';
import { actionCreators } from './store';
import {Card, Comment, Tooltip, List, Rate, Modal, Button, Avatar, Pagination} from "antd";
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled,SearchOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";

class Comment1 extends Component {

    state = {
        visible: false,
    };

    render() {
        const data1 = this.props.comment.map((item, index) => {
            return (
                {
                    actions: [
                        <span key="comment-list-reply-to-0">{item.reply}Reply</span>,
                        <span>{item.praise}<LikeOutlined/></span>,
                        <span>
                            <Link to='/commentDetail'>
                                <Button shape="circle" icon={<SearchOutlined />} onClick={() => this.props.commentId(item.id)} size={'small'}/>
                            </Link>
                        </span>],
                    author: item.username,
                    avatar: item.avatar,
                    content: (
                        <div>
                            <div style={{float:'left',width:'70%'}}>{item.content}</div>
                            <div style={{float:'right',width:'30%',marginTop:'-30px'}}>
                                <Rate disabled defaultValue={item.starNum} />
                                <p>房间类型:{item.roomType}</p>
                                <p>入住时间:{item.inTime}</p>
                                <p>订单编号:{item.orderNum}</p>
                            </div>
                        </div>
                    ),
                    datetime: (
                        <Tooltip>
                            <span>
                                {item.commentTime}
                            </span>
                        </Tooltip>
                    ),
                }
            );
        });
        return(
            <Card title={"评论"}>
                <List
                    className="comment-list"
                    itemLayout="horizontal"
                    dataSource={data1}
                    renderItem={item => (
                        <li>
                            <Comment
                                actions={item.actions}
                                author={item.author}
                                avatar={item.avatar}
                                content={item.content}
                                datetime={item.datetime}
                            />
                        </li>
                    )}
                />
                <Pagination style={{float: 'right'}} current={this.state.current11} total={3*this.props.totalPage} pageSize={3} onChange={(e) => {
                    this.props.getCommentList(this.props.id,e,3);
                }
                }/>
            </Card>
        );
    }

    componentDidMount() {
        this.props.getCommentList(this.props.id,1,3);
    }

}
const mapState = (state) => ({
    id: state.getIn(['login','hotelId']),
    comment: state.getIn(['comment', 'comment']),
    totalPage: state.getIn(['comment', 'totalPage']),
});

const mapDispatch = (dispatch) => ({
    getCommentList(id,current,pageSize) {
        dispatch(actionCreators.getCommentList(id,current,pageSize));
    },
    commentId(id) {
        dispatch(actionCreators.changeCommentId(id));
    }
});

export default connect(mapState, mapDispatch)(Comment1);
