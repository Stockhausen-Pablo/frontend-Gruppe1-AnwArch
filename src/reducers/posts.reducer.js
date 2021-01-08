import {postConstants} from '../constants';

export function posts(state = {}, action) {
    switch (action.type) {
        case postConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case postConstants.GETALL_SUCCESS:
            return {
                items: action.posts
            };
        case postConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case postConstants.GETALLBYID_REQUEST:
            return {
                loading: true
            };
        case postConstants.GETALLBYID_SUCCESS:
            return {
                items: action.posts
            };
        case postConstants.GETALLBYID_FAILURE:
            return {
                error: action.error
            };
        case postConstants.GETBYID_REQUEST:
            return {
                loading: true
            };
        case postConstants.GETBYID_SUCCESS:
            return {
                ...state,
                item: action.payload
            };
        case postConstants.GETBYID_FAILURE:
            return {
                error: action.error
            };
        case postConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(post =>
                    upost.post_id === action.id
                        ? { ...post, deleting: true }
                        : post
                )
            };
        case postConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(post => post.post_id !== action.id)
            };
        case postConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user
            return {
                ...state,
                items: state.items.map(post => {
                    if (post.post_id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...postCopy } = post;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...postCopy, deleteError: action.error };
                    }

                    return post;
                })
            };
        default:
            return state
    }
}