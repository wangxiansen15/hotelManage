import axios from 'axios';
import * as actionTypes from './actionTypes';

const getGoodsList1 = (data) => ({
    type: actionTypes.GET_GOODS_LIST,
    data: data
});

export const getGoodsList = (id) => {
    return (dispatch) => {
        axios.get('http://116.85.12.238:8080/aihotel/ssd/goodsType/' + id + '/1/12').then((res) => {
            const data = res.data.data;
            var d = new Array();
            for (var i = 0; i < data.goodsTypeList.length; i++) {
                d[i] = {
                    key: data.goodsTypeList[i].id,
                    type_name: data.goodsTypeList[i].type_name,
                    explain: data.goodsTypeList[i].explain,
                    put_away: data.goodsTypeList[i].put_away ? true : false
                }
            }
            dispatch(getGoodsList1(d));
        }).catch(() => {
            console.log("error");
        });
    };
};