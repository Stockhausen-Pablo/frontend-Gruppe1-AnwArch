import {topicConstants} from '../constants';
import {topicService} from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const topicActions = {
    register,
    getAll,
    getAllbyID,
    delete: _delete
};


function register(topic) {
    return dispatch => {
        dispatch(request(topic));

        topicService.register(topic)
            .then(
                topic => {
                    dispatch(success(topic));
                    history.push('/');
                    dispatch(alertActions.success('Creating Topic successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(topic) { return { type: topicConstants.CREATE_REQUEST, topic } }
    function success(topic) { return { type: topicConstants.CREATE_SUCCESS, topic } }
    function failure(error) { return { type: topicConstants.CREATE_FAILURE, error } }
}

function getAll() {

    return dispatch => {
        dispatch(request());

        topicService.getAll()
            .then(
                topics => dispatch(success(topics)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: topicConstants.GETALL_REQUEST } }
    function success(topics) { return { type: topicConstants.GETALL_SUCCESS, topics } }
    function failure(error) { return { type: topicConstants.GETALL_FAILURE, error } }
}

function getAllbyID(id) {

    return dispatch => {
        dispatch(request());

        topicService.getAllbyID(id)
            .then(
                topics => dispatch(success(topics.sort((a,b) => {
                    return new Date(a.topic_date).getTime() - new Date(b.topic_date).getTime()}).reverse()
                )),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: topicConstants.GETALLBYID_REQUEST } }
    function success(topics) { return { type: topicConstants.GETALLBYID_SUCCESS, topics } }
    function failure(error) { return { type: topicConstants.GETALLBYID_FAILURE, error } }
}


function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        topicService.delete(id)
            .then(
                topic => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: topicConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: topicConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: topicConstants.DELETE_FAILURE, id, error } }
}
