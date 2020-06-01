import * as actionTypes from './actionTypes';

const changeLogin1 = (data) => ({
    type: actionTypes.CHANGE_LOGIN,
    data: data
});


export const changeLogin = (dispatch) => {
    return dispatch => {
        dispatch(changeLogin1(false));
    }
};