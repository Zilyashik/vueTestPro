import axios from "axios";

export const HTTP = axios.create({
    baseURL: 'https://mobile.fakebook.press/',
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

HTTP.interceptors.request.use(function (config) {
    let token = localStorage.getItem('token');
    config.headers["Authorization"] = 'Bearer ' + token;
    return config;
});