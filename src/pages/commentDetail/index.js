import React, {Component,createElement, useState} from "react";
import { connect } from 'react-redux';
import {Card,Comment, Tooltip, List, Rate,Modal, Button,Avatar,Form,Input } from "antd";
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled,SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';
import img from '../../static/touxiang.png';

const { TextArea } = Input;
const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </div>
);


class CommentDetail extends Component {

    state = {
        evaDetail:{},
        comments: [],
        submitting: false,
        value: '',
    };


    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });
        console.log(this.state.value);
        var fr = new FormData();
        fr.append("evaId",this.props.commentId);
        fr.append("replyAccount",this.props.replyAccount);
        fr.append("replyContext",this.state.value);
        fr.append("seller",1);
        axios.post('http://116.85.12.238:8080/aihotel/evaluation/reply',fr).then((res) => {
        }).catch(() => {
            console.log("error");
        });
        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    {
                        author: '管理员',
                        avatar: img,
                        content: <p>{this.state.value}</p>,
                        datetime: moment().fromNow(),
                    },
                    ...this.state.comments,
                ],
            });
        }, 1000);
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };



    render() {
        const { comments, submitting, value } = this.state;
        return(
            <Card title={"评论"}>
                <Comment
                    actions={[
                        <span key="comment-list-reply-to-0">{this.state.evaDetail.reply}Reply</span>,
                        <span>{this.state.evaDetail.praise}<LikeOutlined/></span>]}
                    author={<a>{this.state.evaDetail.nickName}</a>}
                    avatar={
                        <Avatar
                            src={'https://lankeren-1254433704.cos.ap-guangzhou.myqcloud.com/' + this.state.evaDetail.cimg}
                        />
                    }
                    datetime={
                        <Tooltip>
                            <span>
                                {this.state.evaDetail.evaTime}
                            </span>
                        </Tooltip>
                    }
                    content={
                        <div>
                            <div style={{float:'left',width:'70%'}}>{this.state.evaDetail.evaContext}</div>
                            <div style={{float:'right',width:'30%',marginTop:'-30px'}}>
                                <Rate disabled value={this.state.evaDetail.starLevel} />
                                <p>房间类型:{this.state.evaDetail.roomType}</p>
                                <p>入住时间:{this.state.evaDetail.checkinTime}</p>
                                <p>订单编号:{this.state.evaDetail.orderId}</p>
                            </div>
                        </div>
                    }
                >
                </Comment>
                    <div>
                        {comments.length > 0 && <CommentList comments={comments} />}
                         <Comment
                            avatar={
                                <Avatar
                                    src={img}
                                    alt="管理员"
                                />
                            }
                            content={
                                <Editor
                                    onChange={(e) => {
                                        this.setState({
                                            value: e.target.value,
                                        });}
                                    }
                                    onSubmit={this.handleSubmit}
                                    submitting={submitting}
                                    value={value}
                                />
                            }
                        />
                    </div>
            </Card>
        );
    }

    componentDidMount() {
        axios.get('http://116.85.12.238:8080/aihotel/evaluation/' + this.props.commentId).then((res) => {
            console.log(res.data.data.evaluationsReplies);
            var d = res.data.data.evaluationsReplies.map((item, index) => {
                return ({
                    author: item.seller == 1 ? "管理员" : (item.nickname + item.replyAccount),
                    avatar: item.cimg ? item.cimg : img,
                    content: <p>{item.replyContext}</p>,
                    datetime: item.replyTime,
                });
            });
            res = res.data.data;
            this.setState({
                evaDetail: res,
                comments:d
            })
        }).catch(() => {
            console.log("error");
        });
    }

}

const mapState = (state) => ({
    // id: state.getIn(['login','hotelId']),
    commentId: state.getIn(['comment', 'commentId']),
    replyAccount: state.getIn(['login', 'managerId']),
});

// const mapDispatch = (dispatch) => ({
//
// });

export default connect(mapState, null)(CommentDetail);