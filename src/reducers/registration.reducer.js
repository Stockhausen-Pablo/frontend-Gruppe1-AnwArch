import { userConstants, topicConstants } from '../constants';

export function registration(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { registering: true };
        case userConstants.REGISTER_SUCCESS:
            return {};
        case userConstants.REGISTER_FAILURE:
            return {};
        case topicConstants.REGISTER_REQUEST:
            return { registering: true };
        case topicConstants.REGISTER_SUCCESS:
            console.log(action.topic); // getting undefined
            return {
                items: action.topic
            };
        case topicConstants.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
}