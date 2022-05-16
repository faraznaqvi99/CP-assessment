const httpStatus = require('http-status');


const errors = {
    objects: {
        AlreadyExists: {
            message: 'user_already_exists',
            status: httpStatus.CONFLICT
        },
        LoginError: {
            message: 'cannot_log_in',
            status: httpStatus.UNAUTHORIZED
        },
        AccessForbidden: {
            message: 'access_forbidden',
            status: httpStatus.FORBIDDEN
        },
        AuthRequired: {
            message: 'auth_required',
            status: httpStatus.FORBIDDEN
        },
        InvalidToken: {
            message: 'invalid_token',
            status: httpStatus.FORBIDDEN
        },
        InvalidCredentials: {
            message: 'invalid_credentials',
            status: httpStatus.FORBIDDEN
        },
        TrialExpired: {
            message: 'trial_expired',
            status: httpStatus.FORBIDDEN
        },
        MarkedSignin: {
            message: 'marked_signin',
            status: httpStatus.SERVICE_UNAVAILABLE
        },
        InvalidRequestBody: {
            message: 'invalid_request_fields',
            status: httpStatus.BAD_REQUEST
        },
        ValidationError: {
            message: 'validation_error',
            status: httpStatus.LENGTH_REQUIRED
        },
        Error: {
            message: 'validation_error',
            status: httpStatus.INTERNAL_SERVER_ERROR
        },
        TypeError: {
            message: 'type_error',
            status: httpStatus.PRECONDITION_FAILED
        },
        ReferenceError: {
            message: 'reference_error',
            status: httpStatus.GONE
        },
        MongoError: {
            message: 'error',
            status: httpStatus.INTERNAL_SERVER_ERROR
        },
        WarehouseManagerNotFound: {
            message: 'warehouse_manager_not_found',
            status: httpStatus.BAD_REQUEST
        },
        WarehouseNotFound: {
            message: 'Warehouse_not_found',
            status: httpStatus.BAD_REQUEST
        },
        AdminNotFound:{
            message: 'admin_not_found',
            status: httpStatus.BAD_REQUEST
        },
        AreaNotFound:{
            message: 'area_not_found',
            status: httpStatus.BAD_REQUEST
        },
    },
    types: [
        "ValidationError",
        "Error",
        "TypeError",
        'ReferenceError',
        'MongoError'
    ]
}

module.exports = errors;