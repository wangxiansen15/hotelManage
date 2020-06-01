import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    comment: [],
    commentId: '',
    totalPage: '',
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.SET_COMMENTLIST:
            return state.set('comment', action.data);
        case actionTypes.COMMENT_ID:
            return state.set('commentId', action.data);
        case actionTypes.SET_TOTALPAGE:
            return state.set('totalPage', action.data);
        default:
            return state;
    }
};