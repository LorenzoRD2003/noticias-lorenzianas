import axios from "axios";

const nodeReq = axios.create({
    baseURL: "http://localhost:5000/",
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json"
    },
    timeout: 20000,
    responseEncoding: "utf-8",
    responseType: "text",
    withCredentials: true
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
        return Promise.reject(err.data);
    }
}, err => Promise.reject(err));

export default nodeReq;
