import axios from 'axios';
import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

const addAllOrder = (data) => ({
    type: actionTypes.ADD_ALL_ORDER,
    data: fromJS(data)
});

const addTotalPage = (data) => ({
    type: actionTypes.ADD_TOTALPAGE,
    data: fromJS(data)
});

const addTotalPage1 = (data) => ({
    type: actionTypes.ADD_TOTALPAGE1,
    data: fromJS(data)
});

const addTotalPage2 = (data) => ({
    type: actionTypes.ADD_TOTALPAGE2,
    data: fromJS(data)
});

const addTotalPage3 = (data) => ({
    type: actionTypes.ADD_TOTALPAGE3,
    data: fromJS(data)
});

const addTotalPage4 = (data) => ({
    type: actionTypes.ADD_TOTALPAGE4,
    data: fromJS(data)
});

const addTotalPage5 = (data) => ({
    type: actionTypes.ADD_TOTALPAGE5,
    data: fromJS(data)
});

const addTotalPage6 = (data) => ({
    type: actionTypes.ADD_TOTALPAGE6,
    data: fromJS(data)
});

const addTotalPage7 = (data) => ({
    type: actionTypes.ADD_TOTALPAGE7,
    data: fromJS(data)
});

const addTotalPage8 = (data) => ({
    type: actionTypes.ADD_TOTALPAGE8,
    data: fromJS(data)
});

const addTotalPage9 = (data) => ({
    type: actionTypes.ADD_TOTALPAGE9,
    data: fromJS(data)
});

const addTotalPage10 = (data) => ({
    type: actionTypes.ADD_TOTALPAGE10,
    data: fromJS(data)
});

const addPaid = (data) => ({
    type: actionTypes.ADD_PAID,
    data: fromJS(data)
});

const addtoStayIn = (data) => ({
    type: actionTypes.ADD_TO_STAYIN,
    data: fromJS(data)
});

const addUnpaid = (data) => ({
    type: actionTypes.ADD_UNPAID,
    data: fromJS(data)
});

const adddoing = (data) => ({
    type: actionTypes.ADD_DOING,
    data: fromJS(data)
});

const addConfirmed = (data) => ({
    type: actionTypes.ADD_CONFIRMED,
    data: fromJS(data)
});

const addCancelled = (data) => ({
    type: actionTypes.ADD_CANCELLED,
    data: fromJS(data)
});

const addCompleted = (data) => ({
    type: actionTypes.ADD_COMPLETED,
    data: fromJS(data)
});

const addinvalid = (data) => ({
    type: actionTypes.ADD_INVALID,
    data: fromJS(data)
});

const addRefused = (data) => ({
    type: actionTypes.ADD_REFUSED,
    data: fromJS(data)
});

const submitVisible = () => ({
    type: actionTypes.SUBMIT_VISIBLE
});

const showDrawer1 = () => ({
    type: actionTypes.SHOWDRAWER
});

const closeDrawer1= () => ({
    type: actionTypes.CLOSEDRAWER
});

const getDetailOredr1 = (data) => ({
    type: actionTypes.GET_DETAIL_ORDER,
    data
});

const addComment = (data) => ({
    type: actionTypes.GET_COMMENT_ORDER,
    data
});

function  typechange(res) {
    for (var i = 0; i < res.data.orderInfoCards.length; i++) {
        switch (res.data.orderInfoCards[i].orderStatus) {
            case '-2':
                res.data.orderInfoCards[i].orderStatus = '已拒绝';
                break;
            case '-1':
                res.data.orderInfoCards[i].orderStatus = '无效';
                break;
            case '0':
                res.data.orderInfoCards[i].orderStatus = '未付款';
                break;
            case '1':
                res.data.orderInfoCards[i].orderStatus = '已付款';
                break;
            case '2':
                res.data.orderInfoCards[i].orderStatus = '已确定';
                break;
            case '3':
                res.data.orderInfoCards[i].orderStatus = '待入住';
                break;
            case '4':
                res.data.orderInfoCards[i].orderStatus = '进行中';
                break;
            case '5':
                res.data.orderInfoCards[i].orderStatus = '已取消';
                break;
            case '6':
                res.data.orderInfoCards[i].orderStatus = '已完成';
                break;
            case '7':
                res.data.orderInfoCards[i].orderStatus = '已评价';
                break;
            default:
                res.data.orderInfoCards[i].orderStatus = '未知错误';
        }
    }
}

export const getAllOrder = (id,nowpage) => {
    return (dispatch) => {
        axios.get('http://116.85.12.238:8080/aihotel/manager/order/' + id +'/8/' + nowpage + '/5').then((res) => {
             const result = res.data.orderInfoCards;
             typechange(res);
             dispatch(addAllOrder(result));
             dispatch(addTotalPage(res.data.totalPages));
        }).catch(() => {
            console.log("error");
        });
    };
};

export const gettoStayIn = (id, pagenow) => {
    return (dispatch) => {
        axios.get('http://116.85.12.238:8080/aihotel/manager/order/' + id +'/3/' + pagenow + '/5').then((res) => {
            const result = res.data.orderInfoCards;
            typechange(res);
            dispatch(addtoStayIn(result));
            dispatch(addTotalPage1(res.data.totalPages));
        }).catch(() => {
            console.log("error");
        });
    }
};

export const getUnpaid = (id, pagenow) => {
    return (dispatch) => {
        axios.get('http://116.85.12.238:8080/aihotel/manager/order/' + id +'/0/' + pagenow + '/5').then((res) => {
            const result = res.data.orderInfoCards;
            typechange(res);
            dispatch(addTotalPage2(res.data.totalPages));
            dispatch(addUnpaid(result));
        }).catch(() => {
            console.log("error");
        });
    }
};

export const getPaid = (id, pagenow) => {
    return (dispatch) => {
        axios.get('http://116.85.12.238:8080/aihotel/manager/order/' + id +'/1/' + pagenow + '/5').then((res) => {
            const result = res.data.orderInfoCards;
            typechange(res);
            dispatch(addTotalPage3(res.data.totalPages));
            dispatch(addPaid(result));
        }).catch(() => {
            console.log("error");
        });
    }
};

export const getdoing = (id, pagenow) => {
    return (dispatch) => {
        axios.get('http://116.85.12.238:8080/aihotel/manager/order/' + id +'/4/' + pagenow + '/5').then((res) => {
            const result = res.data.orderInfoCards;
            typechange(res);
            dispatch(addTotalPage4(res.data.totalPages));
            dispatch(adddoing(result));
        }).catch(() => {
            console.log("error");
        });
    }
};

export const getConfirmed = (id, pagenow) => {
    return (dispatch) => {
        axios.get('http://116.85.12.238:8080/aihotel/manager/order/' + id +'/2/' + pagenow + '/5').then((res) => {
            const result = res.data.orderInfoCards;
            typechange(res);
            dispatch(addTotalPage5(res.data.totalPages));
            dispatch(addConfirmed(result));
        }).catch(() => {
            console.log("error");
        });
    }
};

export const getCancelled = (id, pagenow) => {
    return (dispatch) => {
        axios.get('http://116.85.12.238:8080/aihotel/manager/order/' + id +'/5/' + pagenow + '/5').then((res) => {
            const result = res.data.orderInfoCards;
            typechange(res);
            dispatch(addTotalPage6(res.data.totalPages));
            dispatch(addCancelled(result));
        }).catch(() => {
            console.log("error");
        });
    }
};

export const getCompleted = (id, pagenow) => {
    return (dispatch) => {
        axios.get('http://116.85.12.238:8080/aihotel/manager/order/' + id +'/6/' + pagenow + '/5').then((res) => {
            const result = res.data.orderInfoCards;
            typechange(res);
            dispatch(addTotalPage7(res.data.totalPages));
            dispatch(addCompleted(result));
        }).catch(() => {
            console.log("error");
        });
    }
};

export const getinvalid = (id, pagenow) => {
    return (dispatch) => {
        axios.get('http://116.85.12.238:8080/aihotel/manager/order/' + id +'/-1/' + pagenow + '/5').then((res) => {
            const result = res.data.orderInfoCards;
            typechange(res);
            dispatch(addTotalPage8(res.data.totalPages));
            dispatch(addinvalid(result));
        }).catch(() => {
            console.log("error");
        });
    }
};

export const getRefused = (id, pagenow) => {
    return (dispatch) => {
        axios.get('http://116.85.12.238:8080/aihotel/manager/order/' + id +'/-2/' + pagenow + '/5').then((res) => {
            const result = res.data.orderInfoCards;
            typechange(res);
            dispatch(addTotalPage9(res.data.totalPages));
            dispatch(addRefused(result));
        }).catch(() => {
            console.log("error");
        });
    }
};

export const changeComment = (id, pagenow) => {
    return (dispatch) => {
        axios.get('http://116.85.12.238:8080/aihotel/manager/order/' + id +'/7/' + pagenow + '/5').then((res) => {
            const result = res.data.orderInfoCards;
            typechange(res);
            dispatch(addTotalPage10(res.data.totalPages));
            dispatch(addComment(result));
        }).catch(() => {
            console.log("error");
        });
    }
};

export const changeVisible = () => {
    return (dispatch) => {
        dispatch(submitVisible());
    }
};

export const showDrawer = () => {
    return (dispatch) => {
        dispatch(showDrawer1());
    }
};

export const closeDrawer = () => {
    return (dispatch) => {
        dispatch(closeDrawer1());
    }
};

export const getDetailOrder = (orderId) => {
    return (dispatch) => {
        axios.post('http://116.85.12.238:8080/aihotel/manager/order',{
            orderId: orderId
        }).then((data) => {
            let res = data.data.orderInfo;
            dispatch(getDetailOredr1(res));
        }).catch(() => {
            console.log('error');
        })
    }
};

export const acceptOrder = (orderId,id) => {
    return (dispatch) => {
        axios.post('http://116.85.12.238:8080/aihotel/manager/order/accept',{
            orderId: orderId
        }).then((data) => {
            dispatch(closeDrawer1());
        }).catch(() => {
            console.log('error');
        });
        axios.get('http://116.85.12.238:8080/aihotel/manager/order/' + id +'/1/' + '1' + '/5').then((res) => {
            const result = res.data.orderInfoCards;
            typechange(res);
            dispatch(addTotalPage3(res.data.totalPages));
            dispatch(addPaid(result));
        }).catch(() => {
            console.log("error");
        });
    }
};

export const refuseOrder = (orderId,id) => {
    return (dispatch) => {
        axios.post('http://116.85.12.238:8080/aihotel/manager/order/refuse',{
            orderId: orderId
        }).then((data) => {
            console.log(data);
            dispatch(closeDrawer1());
        }).catch(() => {
            console.log('error');
        });
        axios.get('http://116.85.12.238:8080/aihotel/manager/order/' + id +'/-2/' + '1' + '/5').then((res) => {
            const result = res.data.orderInfoCards;
            typechange(res);
            dispatch(addTotalPage9(res.data.totalPages));
            dispatch(addRefused(result));
        }).catch(() => {
            console.log("error");
        });
    }
};

export const completeOrder = (orderId,id) => {
    return (dispatch) => {
        axios.post('http://116.85.12.238:8080/aihotel/manager/order/finish',{
            orderId: orderId
        }).then((data) => {
            console.log(data);
            dispatch(closeDrawer1());
        }).catch(() => {
            console.log('error');
        });
        axios.get('http://116.85.12.238:8080/aihotel/manager/order/' + id +'/4/' + '1' + '/5').then((res) => {
            const result = res.data.orderInfoCards;
            typechange(res);
            dispatch(addTotalPage4(res.data.totalPages));
            dispatch(adddoing(result));
        }).catch(() => {
            console.log("error");
        });
    }
};
