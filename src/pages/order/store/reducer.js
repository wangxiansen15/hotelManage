import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    allOrder: [],
    toStayIn: [],
    Unpaid: [],
    Paid: [],
    doing: [],
    Confirmed: [],
    Cancelled: [],
    Completed: [],
    invalid: [],
    refused: [],
    comment: [],
    Visible: false,
    orderDetail: '',
    totalPages: '',
    totalPages1: '',
    totalPages2: '',
    totalPages3: '',
    totalPages4: '',
    totalPages5: '',
    totalPages6: '',
    totalPages7: '',
    totalPages8: '',
    totalPages9: '',
    totalPages10: '',
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ALL_ORDER:
            return state.set('allOrder', action.data);
        case actionTypes.ADD_TOTALPAGE:
            return state.set('totalPages', action.data);
        case actionTypes.ADD_TOTALPAGE1:
            return state.set('totalPages1', action.data);
        case actionTypes.ADD_TOTALPAGE2:
            return state.set('totalPages2', action.data);
        case actionTypes.ADD_TOTALPAGE3:
            return state.set('totalPages3', action.data);
        case actionTypes.ADD_TOTALPAGE4:
            return state.set('totalPages4', action.data);
        case actionTypes.ADD_TOTALPAGE5:
            return state.set('totalPages5', action.data);
        case actionTypes.ADD_TOTALPAGE6:
            return state.set('totalPages6', action.data);
        case actionTypes.ADD_TOTALPAGE7:
            return state.set('totalPages7', action.data);
        case actionTypes.ADD_TOTALPAGE8:
            return state.set('totalPages8', action.data);
        case actionTypes.ADD_TOTALPAGE9:
            return state.set('totalPages9', action.data);
        case actionTypes.ADD_TOTALPAGE10:
            return state.set('totalPages10', action.data);
        case actionTypes.ADD_TO_STAYIN:
            return state.set('toStayIn', action.data);
        case actionTypes.ADD_UNPAID:
            return state.set('Unpaid', action.data);
        case actionTypes.ADD_PAID:
            return state.set('Paid', action.data);
        case actionTypes.ADD_DOING:
            return state.set('doing', action.data);
        case actionTypes.ADD_CONFIRMED:
            return state.set('Confirmed', action.data);
        case actionTypes.ADD_CANCELLED:
            return state.set('Cancelled', action.data);
        case actionTypes.ADD_COMPLETED:
            return state.set('Completed', action.data);
        case actionTypes.ADD_INVALID:
            return state.set('invalid', action.data);
        case actionTypes.ADD_REFUSED:
            return state.set('refused', action.data);
        case actionTypes.SUBMIT_VISIBLE:
            return state.set('Visible', true);
        case actionTypes.SHOWDRAWER:
            return state.set('Visible', true);
        case actionTypes.CLOSEDRAWER:
            return state.set('Visible', false);
        case actionTypes.GET_DETAIL_ORDER:
            return state.set('orderDetail', action.data);
        case actionTypes.GET_COMMENT_ORDER:
            return state.set('comment', action.data);
        default:
            return state;
    }
}