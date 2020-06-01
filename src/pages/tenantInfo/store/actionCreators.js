import axios from 'axios';
import * as actionTypes from "./actionTypes";


const getTenantInfo1 = (data) => ({
    type: actionTypes.TENANT_INFO,
    data: data
});

const gettotalPage = (data) => ({
    type: actionTypes.GET_TOTALPAGE,
    data: data
});

export const getTenantInfo = (id, pagenow,current) => {
    return (dispatch) => {
        axios.get('http://116.85.12.238:8080/aihotel/gatherSearch/consumerList/' + id + '/' + pagenow + '/' + current).then((res) => {
            res = res.data.data;
            dispatch(getTenantInfo1(res.consumerList));
            dispatch(gettotalPage(res.totalPage));
        }).catch(() => {
            console.log("error");
        });
    }

};