import { CREATE_COMMENT, FETCH_COMMENTS, DELETE_COMMENT, UPDATE_COMMENT } from '../actionTypes';

export default (comment = [], action) => {
    switch (action.type) {
        case CREATE_COMMENT:
            return [...comment, action.payload];
        case FETCH_COMMENTS:
            return action.payload;
        case DELETE_COMMENT:
            return comment.filter((comment) => comment._id !== action.payload);
        case UPDATE_COMMENT:
            return comment.map((comment) => (comment._id === action.payload._id ? action.payload : comment));
        default:
            return comment;
    }
}
