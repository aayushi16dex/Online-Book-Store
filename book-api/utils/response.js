const createDataResponse = (data = '', flag = 1 ) => {
    return {
        data,
        flag
    };
};

const createSuccessResponse = (msg = '',flag = 1 ) => {
    return {
        msg,
        flag
    };
};

const createResponse = (msg = '', data = null, token = null, flag = 1 ) => {
    return {
        data,
        token,
        msg,
        flag
    };
};

const createErrorResponse = (error = 'Internal Server Error', flag = 2) => {
    return {
        flag,
        error
    };
};

module.exports = {
    createDataResponse,
    createSuccessResponse,
    createResponse,
    createErrorResponse
};