import axios from 'axios';
const location = JSON.parse(localStorage.getItem("customerLoc"));
const cusLoc = location?.latitude + "," + location?.longitude;

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

// Set config defaults when creating the instance
const axiosClient = axios.create({
    // baseURL: 'https://lomdom.tk/dbook/public/api/',
    // baseURL: 'http://localhost:8000/api/',
    headers: {
        'X-Signature': ' 1001',
        'X-Signature-Time': ' 0',
        'D1': localStorage.getItem("D1"),
        'Accept': ' application/json',
        'X-Appversion': ' 4.61.1',
        'X-Appid': ' com.gojek.app',
        'X-Session-Id': localStorage.getItem("session_id"),
        'X-Platform': ' Android',
        'X-Uniqueid': localStorage.getItem("unique_id"),
        'X-Deviceos': ' Android,7.1.2',
        'X-User-Type': ' customer',
        'X-Devicetoken': localStorage.getItem("token_device"),
        'X-Pushtokentype': ' FCM',
        'X-Phonemodel': ' google,G011A',
        'User-Uuid': userInfo?.id ?? userInfo?.id,
        'Authorization': ' Bearer  ' + localStorage.getItem("G-Token"),

        'Accept-Language': ' vi-ID',
        'X-Location ': cusLoc,
        'Gojek-Country-Code': '  VN',
        'Gojek-Service-Area': ' 7001',
        'Gojek-Timezone': '  Asia/Ho_Chi_Minh ',
        'X-User-Locale': ' vi_ID',
        //' AVDVDbVfnBQpM1zKB7JKU9F9faEZTHD6DURJ5V0VW92TFp6YS0KAYdgDoI6VkLxPmgiEiSvqMun2N0bzTRRUu/Ywg7yZhWE8VMswUHvucRMGO4W1X64rnFYqcPd8nujH8+T5vDlruJaiLrwZeB55nNcAiFCmp/ss2VR5O9f6wv96utIf/I3heR9lfZ9uaL99e7EoOZSMN4z3EzpyVUYwL/ccyVb4iIWiJZqGS/ue4p4SqSlZYgb8gaHpnOWAb5FeJMGPsINmhoMas0q5BvHNiLosJDqPV/WB3hWeKhhgVj964F+cGaRWY3LdyZKJRBh4Yv+tAR+t3T0aXP6iB54AfA=='
        'X-Device-Id': localStorage.getItem("device_id"),
        'X-M1': localStorage.getItem("XM1"),
        'Content-Type': ' application/json; charset=UTF-8',
        // 'Accept-Encoding': ' gzip, deflate',
        // 'User-Agent': ' okhttp/4.10.0',
        'X-MyCustomHeader': 'MyCustomValue',
        'X-Phonemake': 'LGE',

        // X-Appid: com.gojek.app
        // X-User-Type: customer
        // X-Deviceos: Android,9
        // X-Uniqueid: 8a739b8780cdxede
        // X-Appversion: 4.61.1
        // X-Phonemake: LGE
        // //Transaction-Id: da73ea9a-c08c-4d1e-9daf-ddfe461f212a
        // Accept-Language: vi_ID
        // X-Phonemodel: lge,LGM-V300L
        // Content-Type: application/json; charset=UTF-8
        // Accept-Encoding: gzip, deflate
        // User-Agent: okhttp/4.10.0



    }
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


    return Promise.reject(error);
});

export default axiosClient;
