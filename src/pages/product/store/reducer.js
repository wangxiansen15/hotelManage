import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    product: [],
    totalPage: ''
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCT_LIST:
            return state.set('product', action.data);
        case actionTypes.GET_TOTALPAGE:
            return state.set('totalPage', action.data);
        default:
            return state;
    }
};