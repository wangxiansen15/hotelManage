import axios from 'axios';
import * as actionTypes from './actionTypes';

const addFacilies = (data) => ({
    type: actionTypes.ADD_FACILIES,
    data: data
});

const addAllFacilies = (data) => ({
    type: actionTypes.ADD_ALL_FACILIES,
    data: data
});

const changeFacilies = (id) => ({
    type: actionTypes.CHANGE_FACILISE,
    data: id
});

const updownPic = (data) => ({
    type: actionTypes.UPDOWN_PIC,
    data: data
});

const updownBuinessInfo = (data) => ({
    type: actionTypes.UPDOWN_BUINESS_INFO,
    data: data
});

const updownBaseInfo = (data) => ({
    type: actionTypes.UPDOWN_BASE_INFO,
    data: data
});

export const getFacilites = (id) => {
    return (dispatch) => {
        axios.get('http://116.85.12.238:8080/aihotel/manager/hotelFacility').then((res) => {
            res = res.data.hotelFacilities;
            let dataSource = new Array();
            let allFacilities = new Array();
            let k = 0, j = 0;
            for (var i = 0; i < res.length; i++) {
                allFacilities[j] = {
                    key: j,
                    id: res[j].id,
                    type: res[j].facilityName,
                    name: res[j].content,
                    isNew: false
                };
                j++;
                if (res[i].facilityName == '基础设施') {
                    dataSource[k] = {
                        key: k,
                        id: res[i].id,
                        type: res[i].facilityName,
                        name: res[i].content,
                        isOpen: false
                    };
                    k++;
                }
            }
            dispatch(addFacilies(dataSource));
            dispatch(addAllFacilies(allFacilities));
        }).catch(() => {
            console.log("error");
        });
    };
};

export const getBaseInformation = (id) => {
    return (dispatch) => {
        axios.get('http://116.85.12.238:8080/aihotel/hotel/' + id).then((res) => {
            res = res.data;
            //图片
            const pic = res.hotelInfo.hotelBaseInfo.hotelPic;
            dispatch(updownPic(pic));
            //设施
            for (var i = 0; i < res.hotelInfo.hotelFacility.length; i++) {
                dispatch(changeFacilies(res.hotelInfo.hotelFacility[i].id-1));
            }
            //营业信息
            const buinessInfo = res.hotelInfo.hotelBusinessInfo;
            dispatch(updownBuinessInfo(buinessInfo));
            //基础信息
            const hotelBaseInfo = res.hotelInfo.hotelBaseInfo;
            dispatch(updownBaseInfo(hotelBaseInfo));
        }).catch(() => {
            console.log("error");
        });
    };
};

export const changeFacilites = (id, str) => {
    let formData = new FormData();
    formData.append('hotelId',1);
    formData.append('hotelFacilityNums',str);
    axios.post('http://116.85.12.238:8080/aihotel/manager/hotelFacility',formData).then((res) => {
        console.log(res);
    }).catch(() => {
        console.log("error");
    });
    return (dispatch) => {
        dispatch(changeFacilies(id-1));
    }
};