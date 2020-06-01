import * as actionTypes from './actionTypes';

const updownLogin1 = (data) => ({
    type: actionTypes.UPDOWN_LOGIN,
    data: data
});

const updownLogin2 = (data) => ({
    type: actionTypes.UPDOWN_STATUS,
    data: data
});
const updownLogin3 = (data) => ({
    type: actionTypes.UPDOWN_ID,
    data: data
});


const changeLogin1 = (data) => ({
    type: actionTypes.CHANGE_LOGIN,
    data: data
});

export const updownLogin = (id,mid) => {
    return (dispatch) => {
        dispatch(updownLogin1(id));
        dispatch(updownLogin2(true));
        dispatch(updownLogin3(mid));
    }
};


export const changeLogin = (dispatch) => {
    return dispatch => {
        dispatch(changeLogin1(false));
    }
};