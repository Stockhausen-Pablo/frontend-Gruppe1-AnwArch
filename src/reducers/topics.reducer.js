import { topicConstants } from '../constants';

export function topics(state = {}, action) {
    switch (action.type) {
        case topicConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case topicConstants.GETALL_SUCCESS:
            return {
                items: action.topics
            };
        case topicConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case topicConstants.GETALLBYID_REQUEST:
            return {
                loading: true
            };
        case topicConstants.GETALLBYID_SUCCESS:
            return {
                items: action.topics
            };
        case topicConstants.GETALLBYID_FAILURE:
            return {
                error: action.error
            };
        case topicConstants.DELETE_REQUEST:
            // add 'deleting:true' property to topic being deleted
            return {
                ...state,
                items: state.items.map(topic =>
                    topic.topic_id === action.id
                        ? { ...topic, deleting: true }
                        : topic
                )
            };
        case topicConstants.DELETE_SUCCESS:
            // remove deleted topic from state
            return {
                items: state.items.filter(topic => topic.topic_id !== action.id)
            };
        case topicConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to topic
            return {
                ...state,
                items: state.items.map(topic => {
                    if (topic.topic_id === action.id) {
                        // make copy of topic without 'deleting:true' property
                        const { deleting, ...topicCopy } = topic;
                        // return copy of topic with 'deleteError:[error]' property
                        return { ...topicCopy, deleteError: action.error };
                    }

                    return topic;
                })
            };
        default:
            return state
    }
}