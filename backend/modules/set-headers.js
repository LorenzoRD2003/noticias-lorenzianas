const setHeaders = (req, res, next) => {
    // Where to connect from
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods available
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers allowed
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, Content-Type');

    // Allow Credentials
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
}

module.exports = { setHeaders };
