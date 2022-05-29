import axios from "axios";

const nodeReq = axios.create({
    baseURL: location.origin,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json"
    },
    timeout: 20000,
    responseEncoding: "utf-8",
    responseType: "text"
});

nodeReq.interceptors.request.use(req => {
    try {
        return req;
    } catch (err) {
        return Promise.reject(err);
    }
}, err => Promise.reject(err));

nodeReq.interceptors.response.use(res => {
    try {
        return res;
    } catch (err) {
        return Promise.reject(err);
    }
}, err => Promise.reject(err));

module.exports = { axios: nodeReq };