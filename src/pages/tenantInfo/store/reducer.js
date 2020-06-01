import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    tenantInfo: [],
    totalPage: '1'
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.TENANT_INFO:
            return state.set('tenantInfo', action.data);
        case actionTypes.GET_TOTALPAGE:
            return state.set('totalPage', action.data);
        default:
            return state;
    }
};