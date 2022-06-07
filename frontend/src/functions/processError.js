// Function to process errors sent by the server
const processError = err => {
    const response = err.response;
    const errors = response.data.data.error;
    const isArray = Array.isArray(errors);

    return {
        status: response.status,
        statusText: response.statusText,
        error: isArray ? errors.map(error => error.msg) : [errors]
    }
}

export default processError;
