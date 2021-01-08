import {postConstants, topicConstants} from '../constants';
import {postService, topicService} from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const postActions = {
    register,
    getAll,
    getAllbyID,
    getById,
    delete: _delete
};


function register(post) {
    return dispatch => {
        dispatch(request(post));

        postService.register(post)
            .then(
                post => {
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success('post Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(post) { return { type: postConstants.REGISTER_REQUEST, post } }
    function success(post) { return { type: postConstants.REGISTER_SUCCESS, post } }
    function failure(error) { return { type: postConstants.REGISTER_FAILURE, error } }
}

function getAll() {

    return dispatch => {
        dispatch(request());

        postService.getAll()
            .then(
                posts => dispatch(success(posts)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GETALL_REQUEST } }
    function success(posts) { return { type: postConstants.GETALL_SUCCESS, posts } }
    function failure(error) { return { type: postConstants.GETALL_FAILURE, error } }
}

function getAllbyID(id) {

    return dispatch => {
        dispatch(request());

        postService.getAllbyID(id)
            .then(
                posts => dispatch(success(posts.sort())),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GETALLBYID_REQUEST } }
    function success(posts) { return { type: postConstants.GETALLBYID_SUCCESS, posts } }
    function failure(error) { return { type: postConstants.GETALLBYID_FAILURE, error } }
}

function getById(id) {

    return dispatch => {
        dispatch(request());

        postService.getById(id)
            .then(
                post => dispatch(success(post)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GETBYID_REQUEST} }
    function success(post) { return { type: postConstants.GETBYID_SUCCESS, post } }
    function failure(error) { return { type: postConstants.GETBYID_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        postService.delete(id)
            .then(
                post => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: postConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: postConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: postConstants.DELETE_FAILURE, id, error } }
}