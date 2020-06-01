import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    Login: false,
    hotelId: '',
    managerId: ''
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.UPDOWN_STATUS:
            return state.set('Login', true);
        case actionTypes.UPDOWN_LOGIN:
            return state.set('hotelId', action.data);
        case actionTypes.UPDOWN_ID:
            return state.set('managerId', action.data);
        case actionTypes.CHANGE_LOGIN:
            return state.set('Login', action.data);
        default:
            return state;
    }
};