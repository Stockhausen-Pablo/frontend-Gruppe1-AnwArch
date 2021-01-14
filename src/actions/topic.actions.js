import {topicConstants} from '../constants';
import {topicService} from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const topicActions = {
    register,
    getAll,
    getAllbyID,
    increment,
    getById,
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
                topics => dispatch(success(topics)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: topicConstants.GETALLBYID_REQUEST } }
    function success(topics) { return { type: topicConstants.GETALLBYID_SUCCESS, topics } }
    function failure(error) { return { type: topicConstants.GETALLBYID_FAILURE, error } }
}

function getById(topicId) {

    return dispatch => {
        dispatch(request(topicId));

        topicService.getById(topicId)
            .then(
                topic => dispatch(success(topic)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(topicId) { return { type: topicConstants.GETBYID_REQUEST, topicId} }
    function success(topic) { return { type: topicConstants.GETBYID_SUCCESS, topic } }
    function failure(error) { return { type: topicConstants.GETBYID_FAILURE, error } }
}

function increment(id){
    return dispatch => {
        dispatch(request(id));

        topicService.increment(id)
            .then(
                topic => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request() { return { type: topicConstants.INCREMENT_REQUEST, } }
    function success(id) { return { type: topicConstants.INCREMENT_SUCCESS, id } }
    function failure(error) { return { type: topicConstants.INCREMENT_FAILURE, error } }
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
