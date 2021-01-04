import { categoryConstants } from '../constants';

export function categories(state = {}, action) {
    switch (action.type) {
        case categoryConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case categoryConstants.GETALL_SUCCESS:
            return {
                items: action.categories
            };
        case categoryConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case categoryConstants.DELETE_REQUEST:
            // add 'deleting:true' property to category being deleted
            return {
                ...state,
                items: state.items.map(category =>
                    category.cat_id === action.id
                        ? { ...category, deleting: true }
                        : category
                )
            };
        case categoryConstants.DELETE_SUCCESS:
            // remove deleted category from state
            return {
                items: state.items.filter(category => category.cat_id !== action.id)
            };
        case categoryConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to category
            return {
                ...state,
                items: state.items.map(category => {
                    if (category.cat_id === action.id) {
                        // make copy of category without 'deleting:true' property
                        const { deleting, ...categoryCopy } = category;
                        // return copy of category with 'deleteError:[error]' property
                        return { ...categoryCopy, deleteError: action.error };
                    }

                    return category;
                })
            };
        default:
            return state
    }
}