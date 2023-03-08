import axios from 'axios';


// Set config defaults when creating the instance
const axiosClient = axios.create({
    // baseURL: 'https://lomdom.tk/dbook/public/api/',
    // baseURL: 'http://localhost:8000/api/',

});



// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
    // Do something before request is sent


    return config;
}, function (error) {
    // localStorage.clear();
    // window.location.reload(false);
    // Do something with request error

    return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data


    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // localStorage.clear();
    // window.location.reload(false);
    if (error.response && error.response.data && error.response.data.errors) {

        throw new Error(
            error.response.data.errors[0]?.message_title
        );
    }
    // return Promise.reject(error);
});

export default axiosClient;
