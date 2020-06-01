import axios from 'axios';
import * as actionTypes from './actionTypes';

const getProductList1 = (data) => ({
    type: actionTypes.GET_PRODUCT_LIST,
    data: data
});

const getProductTotalpage = (data) => ({
    type: actionTypes.GET_TOTALPAGE,
    data: data
});

export const getProductList = (id,current,pageSize) => {
    return (dispatch) => {
        axios.get('http://116.85.12.238:8080/aihotel/ssd/goodsInfo/' + id + '/' + current + '/' + pageSize).then((res) => {
            const data = res.data.data;
            console.log(data);
            var d = new Array();
            for (var i = 0; i < data.goodsInfoList.length; i++) {
                d[i] = {
                    key: data.goodsInfoList[i].id,
                    goods_name: data.goodsInfoList[i].goods_name,
                    explain: data.goodsInfoList[i].explain,
                    price: data.goodsInfoList[i].price,
                    type_name: data.goodsInfoList[i].type_name,
                    coupon_name: data.goodsInfoList[i].coupon_name,
                    coupon_id: data.goodsInfoList[i].coupon_id,
                    put_away: data.goodsInfoList[i].put_away ? true : false,
                    img: data.url_pre + data.goodsInfoList[i].goods_pic + '?' + Math.ceil(Math.random()*100)
                }
            }
            dispatch(getProductList1(d));
            dispatch(getProductTotalpage(data.totalPages));
        }).catch(() => {
            console.log("error");
        });
    };
};
