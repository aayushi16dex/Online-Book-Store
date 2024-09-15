const buildDataResponse = (data = "", flag = 1) => {
  return {
    data,
    flag,
  };
};

const buildSuccessResponse = (msg = "", flag = 1) => {
  return {
    msg,
    flag,
  };
};

const buildErrorResponse = (error = "Internal Server Error", flag = 2) => {
  return {
    flag,
    error,
  };
};

const buildDataSuccessResponse = (msg = "", data = "", flag = 1) => {
  return {
    msg,
    data,
    flag,
  };
};

const buildResponse = (msg = "", data = null, token = null, flag = 1) => {
  return {
    data,
    token,
    msg,
    flag,
  };
};

module.exports = {
  buildDataResponse,
  buildSuccessResponse,
  buildResponse,
  buildErrorResponse,
  buildDataSuccessResponse,
};
