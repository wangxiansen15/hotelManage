import axios from 'axios';
import * as actionTypes from './actionTypes';

const setCommentList = (data) => ({
    type: actionTypes.SET_COMMENTLIST,
    data: data
});

const commentId = (data) => ({
    type: actionTypes.COMMENT_ID,
    data: data
});

const setTotalPage = (data) => ({
    type: actionTypes.SET_TOTALPAGE,
    data: data
});

export const getCommentList = (id,current,pageSize) => {
    return (dispatch) => {
        axios.get('http://116.85.12.238:8080/aihotel/hotelEvaList/' + id + '/' + current + '/' + pageSize).then((data) => {
            data = data.data.data;
            console.log(data);
            let commentList = new Array();
            for (var i = 0; i < data.evaList.length; i++) {
                commentList[i] = {
                    id: data.evaList[i].evaId,
                    username: data.evaList[i].nickName,
                    avatar: data.urlpre + data.evaList[i].cimg,
                    starNum: data.evaList[i].starLevel,
                    praise: data.evaList[i].praise,
                    reply: data.evaList[i].reply,
                    roomType: data.evaList[i].roomType,
                    inTime: data.evaList[i].checkinTime,
                    commentTime: data.evaList[i].evaTime,
                    orderNum: data.evaList[i].orderId,
                    content: data.evaList[i].evaContext
                }
            }
            dispatch(setCommentList(commentList));
            dispatch(setTotalPage(data.totalPages));
        }).catch(() => {
            console.log("error");
        });
    };
};

export const changeCommentId = (id) => {
    return (dispatch) => {
        dispatch(commentId(id));
    }
};