import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    commodity: [],
    newCommodity:[],
    commodityDetailId: '',
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_COMMODITY_LIST:
            return state.set("commodity", action.data);
        case actionTypes.CHANGE_COMMODITY_ID:
            return state.set("commodityDetailId", action.data);
        default:
            return state;
    }
};