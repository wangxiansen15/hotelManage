import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    facilites: [],
    allFacilites: [],
    Pic: {},
    hotelBusinessInfo: {},
    hotelBaseInfo: {}
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ADD_FACILIES:
            return state.set('facilites', action.data);
        case actionTypes.ADD_ALL_FACILIES:
            return state.set('allFacilites', action.data);
        case actionTypes.CHANGE_FACILISE:
            if (state.getIn(['facilites',action.data,'isOpen']) == false)
                return state.setIn(['facilites',action.data,'isOpen'],true);
            else
                return state.setIn(['facilites',action.data,'isOpen'],false);
        case actionTypes.UPDOWN_PIC:
            return state.set('Pic', action.data);
        case actionTypes.UPDOWN_BUINESS_INFO:
            return state.set('hotelBusinessInfo', action.data);
        case actionTypes.UPDOWN_BASE_INFO:
            return state.set('hotelBaseInfo', action.data);
        default:
            return state;
    }
}