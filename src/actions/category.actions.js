import {categoryConstants} from '../constants';
import {categoryService} from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const categoryActions = {
    register,
    getAll,
    delete: _delete
};

function register(category) {
    return dispatch => {
        dispatch(request(category));

        categoryService.register(category)
            .then(
                category => {
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success('Creating Category successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(category) { return { type: categoryConstants.CREATE_REQUEST, category } }
    function success(category) { return { type: categoryConstants.CREATE_SUCCESS, category } }
    function failure(error) { return { type: categoryConstants.CREATE_FAILURE, error } }
}

function getAll() {

    return dispatch => {
        dispatch(request());

        categoryService.getAll()
            .then(
                categories => dispatch(success(categories)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: categoryConstants.GETALL_REQUEST } }
    function success(categories) { return { type: categoryConstants.GETALL_SUCCESS, categories } }
    function failure(error) { return { type: categoryConstants.GETALL_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        categoryService.delete(id)
            .then(
                category => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: categoryConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: categoryConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: categoryConstants.DELETE_FAILURE, id, error } }
}
