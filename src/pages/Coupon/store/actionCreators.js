import axios from 'axios';
import * as actionTypes from './actionTypes';

const getCouponList1 = (data) => ({
    type: actionTypes.GET_COUPON_LIST,
    data: data
});

const getCouponTotalPages = (data) => ({
    type: actionTypes.GET_TOTAL_PAGE,
    data: data
});

export const getCouponList = (id,current,pagesize) => {
    return (dispatch) => {
        axios.get('http://116.85.12.238:8080/aihotel/ssd/coupon/' + id + '/' + current + '/' + pagesize).then((res) => {
            const data = res.data.data;
            var d = new Array();
            for (var i = 0; i < data.couponInfos.length; i++) {
                d[i] = {
                    key: data.couponInfos[i].id,
                    coupon_name: data.couponInfos[i].coupon_name,
                    explain: data.couponInfos[i].explain,
                    price: data.couponInfos[i].price,
                    put_away: data.couponInfos[i].put_away ? true : false
                }
            }
            dispatch(getCouponList1(d));
            dispatch(getCouponTotalPages(data.totalPages));
        }).catch(() => {
            console.log("error");
        });
    };
};