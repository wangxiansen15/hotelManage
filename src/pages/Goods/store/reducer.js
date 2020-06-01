import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    goods: [],
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_GOODS_LIST:
            return state.set('goods', action.data);
        default:
            return state;
    }
};