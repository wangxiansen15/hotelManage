import axios from 'axios';
import * as actionTypes from './actionTypes';

const getCommodityList1 = (data) => ({
    type: actionTypes.GET_COMMODITY_LIST,
    data: data
});

const changeCommodityDetail1 = (data) => ({
    type: actionTypes.CHANGE_COMMODITY_ID,
    data: data
});



export const getCommodityList = () => {
    return (dispatch) => {
        axios.get('http://116.85.12.238:8080/aihotel/manager/roomList/1').then((data) => {
            const res = data.data.data.bookRooms;
            let d = new Array();
            for(var i = 0; i < res.length; i++) {
                d[i] = {
                    key: res[i].roomId,
                    roomType: res[i].roomType,
                    breakfast: res[i].isBreakfast,
                    bedType: res[i].bedType,
                    roomSize: res[i].size,
                    price: res[i].price
                }
            }
            dispatch(getCommodityList1(d));
        }).catch(() => {
            console.log("error");
        })
    };
};

export const changeCommodityDetail = (id) => {
    return (dispatch) => {
        // axios.get('http://116.85.12.238:8080/aihotel/manager/room/' + id).then((res) => {
        //     var data = res.data;
            dispatch(changeCommodityDetail1(id));
        // }).catch(() => {
        //     console.log("error");
        // });
    };
};