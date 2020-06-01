import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    coupon: [],
    totalPage: ''
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_COUPON_LIST:
            return state.set('coupon', action.data);
        case actionTypes.GET_TOTAL_PAGE:
            return state.set('totalPage', action.data);
        default:
            return state;
    }
};