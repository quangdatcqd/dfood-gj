import { genSessionID, randomString } from "../common";
import axiosClient from "./axiosClient";

const location = JSON.parse(localStorage.getItem("customerLoc"));
const accessToken = "eyJhbGciOiJkaXIiLCJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4R0NNIiwidHlwIjoiSldUIiwiemlwIjoiREVGIn0..qRFgrSxqNNNt9FMz.qxICPT2di1i-rGu8RLAi-y_osjuBUQy2bCcmKFIOeRh4N8FmbFeH6b68nXyvjthvprEWvpj5npjX9LAVvKDJheD-x9eljC6-4mIC9DWDV08Tz6Glmqu76CnPAS8SjBdMgDwwquGDznhgj6eVOM50D14ZcboR2g7tMYc6pxw3TYTttdozKAxlcNPONkzomjN2Echl6wsQG61-0h-0gX_SVaoe-li1MuXNXObK32U7Mv1hh52spLWoiHWEPEQX3iG1Qp52c5TDdYqms6kpJ_U0YwNz7IS2bBSDRavi3I0n_DXt_-MXRJxc854qiMUyXSuftbfkIsjhfezdxG9pVdDEVrFVwrUf87hVz6RzhjOrmKzcTsPFk7sJmqe2A_wzIKZwEs_syE7K7RlD45l3n2oTRrPh-xWBEEds9fuofIGQGEsWyiu3G8CaHvFZ36BW72YJtmBiDw126QE10HF9QaCyHeVOoM118xy_MSbvNp0g3_EkWVN2ukpMEn1fOhA9N7uKB2UKaMGCdX5iEbbBf6YMO0mTqHepPhxLxmiR_iPeFKMYNii7qgCPlk9u3AkXFQvZlBr_rGFhSQiUiiwc6n0Cl-QUTolWrxCsU6SdOTThJOYnlVu6jFuS00Wte8ZAULNRSKEPjU793ERfelUa_s3_wY7GVWsUFWzPW4bNIBb9gfYkKs1If9-0pyr0VWfwsFlSl7jBagRJlH03wZD0mljHtWNJSjc54Lorko9Y5iwMZerewGTtMzMzQ5X8nydUvx5_9XzinV2vNGhaGM9G_FV9gy6ZJgjERwaub02lzSqmOPe8_7W6GN9PNCk8sjgCik2QsDdlX1wJAssmWxaO6dYGVReUy7J-5UNn19tm7NXg8nUyuK0nKotKSvUon6xx6-r2HCNM7cdusBLL858vq3tzSxIItwlzarLrQIB-Vg.A9xCVBoY8ZRUkk6M-XGk6w";
// const accessToken = localStorage.getItem("G-Token");
const pickedLoc = location?.latitude + "," + location?.longitude;
const deviceInfo = localStorage.getItem("deviceInfo") ? JSON.parse(localStorage.getItem("deviceInfo")) : null;
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const Objheaders =
{
    'X-Usertimezone': ' +07:00',
    'transaction-id': deviceInfo?.session_id,
    'X-Location': pickedLoc,
    'x-invalidate-cache': ' false',
    'accept': ' application/json',
    'content-type': 'application/json ',
    'x-appversion': ' 4.78.3',
    'x-appid': ' com.gojek.app',
    'x-session-id': deviceInfo?.session_id,
    'd1': deviceInfo?.d1,
    'x-platform': 'android',
    'x-uniqueid': deviceInfo?.unique_id,
    'Authorization': ' Bearer  ' + accessToken,
    'x-user-type': ' customer',
    'x-deviceos': ' Android,9',
    'User-Uuid': userInfo?.id || "",
    'x-devicetoken': ' ',
    'x-phonemake': ' MEIZU',
    'x-pushtokentype': ' FCM',
    'X-Location-Accuracy': ' 1.58',
    'x-phonemodel': ' Meizu,PRO 6 Plus',
    'accept-language': ' vi-VN',
    'x-user-locale': ' vi_VN',
    'gojek-country-code': ' VN',
    'gojek-service-area': ' 7001',
    'gojek-timezone': ' Asia/Ho_Chi_Minh',
    'X-M1': deviceInfo?.XM1,
    'user-agent': ' Gojek/4.78.3 (Android 9)',

}

const headerToArray = (header) => {
    var temp = [];
    for (const key in header) {
        if (Object.hasOwnProperty.call(header, key)) {
            temp.push(`${key}:${header[key]}`)
        }
    }
    return JSON.stringify(temp);
}

const StrArrHeaders = headerToArray(Objheaders);


export const GojekAPI = {
    getListSupport() {
        try {
            const url = `https://api.gojekapi.com/support/customer/v1/tokens?limit=1`;

            return axiosClient.post("", {
                type: "GET",
                header: StrArrHeaders,
                url: url
            });

        } catch (ex) {
            return ex;
        }
    },
    countOrders() {
        try {
            const url = `https://lomdom.tk/dbook/public/api/countorders/${localStorage.getItem("username")}`;
            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    },
    checkPassword(password) {
        try {
            const pass = password != "" ? password : localStorage.getItem("password");
            const url = `https://lomdom.tk/dbook/public/api/checkpassword/${pass}`;
            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    },
    postSession(id) {
        try {
            const url = `https://lomdom.tk/dbook/public/api/postsession`;
            return axiosClient.post(url, {
                id_order: id,
                G_Token: localStorage.getItem("G-Token"),
                R_Token: localStorage.getItem("R-Token"),
                username: localStorage.getItem("username"),
            });
        } catch (ex) {
            return ex;
        }
    },
    postDataRestaurant(id, data, best) {
        try {
            const url = `https://lomdom.tk/dbook/public/api/postdatarestaurant`;
            return axiosClient.post(url, {
                id: id,
                data: JSON.stringify(data),
                best: best ? 1 : 0
            });
        } catch (ex) {
            return ex;
        }
    },
    deleteResList(id) {
        try {
            const url = `https://lomdom.tk/dbook/public/api/deleteleslist/` + id;
            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    },
    getGenIDRes() {
        try {

            return axiosClient.get("http://localhost:8000/api/generateidreslist");
        } catch (ex) {
            return ex;
        }
    },

    test() {
        try {

            const url = "https://api.ipify.org?format=json";
            return axiosClient.post("", {
                type: "GET",
                header: "[]",
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },

    getRessDeals(page) {
        try {

            var url = `https://api.gojekapi.com/gofood/consumer/v3/restaurants?collection=V_PARTNER_CLEAN&include_banner=false&is_from_offer_page=true&page=${page}&picked_loc=${encodeURIComponent(pickedLoc)}&redesign_enabled=true&search_id=3e8dae6de-02b4-45a0-81ed-1fafdf76e04b&super_partner_enabled=true&voucher_batch_id=&limit=15`;

            return axiosClient.post("", {
                type: "GET",
                header: StrArrHeaders,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    searchAddress(keyword) {
        try {
            const url = 'https://api.gojekapi.com/v2/search-places?location=20.9794367%252C105.7099217&service_type=5&location_type=dropoff&keyword=' + encodeURIComponent(keyword);

            return axiosClient.post("", {
                type: "GET",
                header: StrArrHeaders,
                url: url
            });

        } catch (ex) {
            return ex;
        }
    },
    searchRestaurant(keyword) {
        try {

            const url = `https://api.gojekapi.com/gofood/search/v1/query_understanding?search_query=${encodeURIComponent(keyword)}&picked_loc=${pickedLoc}&redesign_enabled=true&super_partner_enabled=true`;

            return axiosClient.post("", {
                type: "GET",
                header: StrArrHeaders,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    searchRestaurantMore(keyword) {
        try {

            const url = `https://api.gojekapi.com/gofood/consumer/v3/search?search=${encodeURIComponent(keyword)}&location=${encodeURIComponent(pickedLoc)}&intent=restaurant&filter_enabled=true&is_dynamic_filter_applied=false&picked_loc=${encodeURIComponent(pickedLoc)}&redesign_enabled=true&super_partner_enabled=true`;

            return axiosClient.post("", {
                type: "GET",
                header: StrArrHeaders,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    searchRestaurantByURL(urlinput) {
        try {

            const url = `https://api.gojekapi.com/gofood/consumer/v1/app-links/${urlinput}`;
            return axiosClient.post("", {
                type: "GET",
                header: StrArrHeaders,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    getRestaurantV5(id) {
        try {
            // const url = `https://api.gojekapi.com/gofood/consumer/v5/restaurants/${id}`;
            const url = `https://api.gojekapi.com/gofood/consumer/v5/restaurants/${id}`;
            return axiosClient.post("", {
                type: "GET",
                header: StrArrHeaders,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    getRestaurant(id) {
        try {
            const url = `https://api.gojekapi.com/gofood/consumer/v4/restaurants/${id}`;
            // const url = `https://api.gojekapi.com/gofood/consumer/v5/restaurants/2644b825-0c4e-4a36-8cbf-bb01c33ed0b1?search_position=2&search_id=0ae29d3e-49ba-46dd-931b-6356dd32d73f&location=null&order_intent=delivery&is_offer_list_experiment=true&cart_recommendations_enabled=false&picked_loc=10.687392%2C106.59386&delivery_mode_intent=regular`;
            return axiosClient.post("", {
                type: "GET",
                header: StrArrHeaders,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    setAddress(id) {
        try {
            const url = `https://api.gojekapi.com/poi/v3/findLatLng?placeid=${id}&service_type=5`;
            return axiosClient.post("", {
                type: "GET",
                header: StrArrHeaders,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    getVoucher(accessToken) {
        try {
            const url = `https://api.gojekapi.com/gopoints/v3/wallet/vouchers?limit=200&page=1`;
            return axiosClient.post("", {
                type: "GET",
                header: headerToArray({
                    ...Objheaders,
                    Authorization: ' Bearer ' + accessToken,
                }),
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    getToken() {
        try {
            const url = '/getrunapp';

            return axiosClient.get(url, {});
        } catch (ex) {
            return ex;
        }
    },
    cardsGofoodV2() {
        try {
            const url = 'https://api.gojekapi.com/v2/customer/cards/gofood-home-v2';
            return axiosClient.post("", {
                type: "GET",
                header: StrArrHeaders,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    searchSuggestions() {
        try {
            const url = `https://api.gojekapi.com/gofood/search/v2/suggestions?picked_loc=${encodeURIComponent(pickedLoc)}`;
            return axiosClient.post("", {
                type: "GET",
                header: StrArrHeaders,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    dealsHome() {
        try {
            const url = 'https://api.gojekapi.com/gofood/v2/deals/home?picked_loc=' + encodeURIComponent(pickedLoc);

            return axiosClient.post("", {
                type: "GET",
                header: StrArrHeaders,
                url: url
            });;
        } catch (ex) {
            return ex;
        }
    },



};
export const ChatAPI = {

    getChannelChat(id) {
        try {
            const url = `https://api.gojekapi.com/v2/order/${id}/channel?service_type=5`;
            return axiosClient.post("", {
                type: "GET",
                header: StrArrHeaders,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },

    getAllChat(id) {
        try {
            const url = `https://api.gojekapi.com/v2/chat/channels/${id}/messages?batch_size=20&direction=prev&message_ts=8999999999999`;
            return axiosClient.post("", {
                type: "GET",
                header: StrArrHeaders,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },

    getMemberChat(id) {
        try {
            const url = `https://api.gojekapi.com/v2/chat/channels/${id}`;
            return axiosClient.post("", {
                type: "GET",
                header: StrArrHeaders,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },

    sendMessage(id, text) {
        try {
            const url = `https://api.gojekapi.com/v2/chat/channels/${id}/message`;
            let payload = {
                "channel_type": "group-booking",
                "data": {
                    "tracking_id": "ff41235f-b55c-4f52-9e07-62abd8560d35"
                },
                "request_id": "d3e4fb1f-9cd4-4da1-8d8a-38e33ebc15dd",
                "text": text,
                "type": "text"
            };

            return axiosClient.post("", {
                type: "POST",
                body: JSON.stringify(payload),
                header: StrArrHeaders,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },


}

export const OrderAPI = {




    quickCancel(id) {
        try {
            const url = `https://api.gojekapi.com/waiter/v1/orders/${id}/cancel`;
            var payload = {
                "activitySource": 2,
                "bookingId": 0,
                "cancelDescription": "Cancelled by customer apps",
                "cancelReasonCode": "CUSTOMER_CANCEL_WITH_NO_REASON",
                "orderNo": id
            }

            return axiosClient.post("", {
                type: "PUT",
                body: JSON.stringify(payload),
                header: StrArrHeaders,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    getOrdersActive() {
        try {
            const url = 'https://api.gojekapi.com/v1/customer/card/active';

            return axiosClient.post("", {
                type: "GET",
                header: StrArrHeaders,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },

    getOrderDetail(id) {
        try {
            const url = `https://api.gojekapi.com/v1/bookings/${id}/detail`;
            return axiosClient.post("", {
                type: "GET",
                header: StrArrHeaders,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    getListOrders() {
        try {
            const url = 'https://api.gojekapi.com/gofood/consumer/v3/orders';
            return axiosClient.post("", {
                type: "GET",
                header: StrArrHeaders,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    checkout(dataPayload) {
        try {
            const url = `https://api.gojekapi.com/haggler/public/delivery/v1/estimate`;
            const headers = headerToArray({
                ...Objheaders,
                'X-Platform': "*",
            })

            return axiosClient.post("", {
                type: "POST",
                body: JSON.stringify(dataPayload),
                header: headers,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    dealsCheckout(brandID, merchantID) {
        try {
            const url = `https://api.gojekapi.com/gofood/v2/deals/checkout?merchant_id=${merchantID}&brand_id=${brandID}&service_type=5&picked_loc=${pickedLoc}`;
            // const url = `https://api.gojekapi.com/gofood/v2/deals/checkout?merchant_id=2644b825-0c4e-4a36-8cbf-bb01c33ed0b1&brand_id=d57bfd59-2053-4784-95a7-d74136b997e1&service_type=5&picked_loc=10.687392%2C106.59386`;
            return axiosClient.post("", {
                type: "GET",
                header: StrArrHeaders,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    makeOrder(dataPayload) {
        try {
            const url = `https://api.gojekapi.com/waiter/v4/orders`;
            return axiosClient.post("", {
                type: "POST",
                body: JSON.stringify(dataPayload),
                header: StrArrHeaders,
                url: url
            });

        } catch (ex) {
            return ex;
        }
    },
    tracking(id) {
        try {
            const url = `https://api.gojekapi.com/v4/booking/track`;
            let payload = {
                "orderNumbers": id
            }

            return axiosClient.post("", {
                type: "POST",
                body: JSON.stringify(payload),
                header: StrArrHeaders,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    orderDetail(id) {
        try {
            const url = `https://api.gojekapi.com/v1/bookings/${id}/detail`;

            return axiosClient.post("", {
                type: "GET",
                header: StrArrHeaders,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    cancelOrder(idOrder, phone, userID) {

        try {
            const url = `https://api.gojekapi.com/zendesk/nanorep/v1/tickets?booking_country_code=VN`;

            let payload = {
                "ticket": {
                    "fields": [
                        {
                            "name": "custom_field_n_Issue_Type__c",
                            "value": "The item is out of stock"
                        },
                        {
                            "name": "custom_field_api_version",
                            "value": "V2"
                        },
                        {
                            "name": "GOVIET_CCU_Issue_Level_1__c",
                            "value": "Yêu cầu huỷ đơn hàng"
                        },
                        {
                            "name": "GOVIET_CCU_Issue_Level_3__c",
                            "value": "Yêu cầu huỷ đơn hàng"
                        },
                        {
                            "name": "System_Customer_Phone__c",
                            "value": phone
                        },
                        {
                            "name": "Order_Number__c",
                            "value": idOrder
                        },
                        {
                            "name": "System_Customer_ID__c",
                            "value": userID
                        },
                        {
                            "name": "Service_Type_ID_S__c",
                            "value": "5"
                        },
                        {
                            "name": "blueprint_form_id_s__c",
                            "value": "2992"
                        },
                        {
                            "name": "System_Customer_Email__c",
                            "value": "linhnguyen@gmail.com"
                        },
                        {
                            "name": "unit__c",
                            "value": "CCU"
                        },
                        {
                            "name": "Issue__c",
                            "value": "order__request_system_cancellation__general_request_system_cancellation"
                        },
                        {
                            "name": "System_Device_Type__c",
                            "value": "Android"
                        },
                        {
                            "name": "country__c",
                            "value": "VN"
                        },
                        {
                            "name": "IP_Address__c",
                            "value": "fe80::b4e2:37ff:fef2:8b6f%dummy0"
                        },
                        {
                            "name": "System_Device_OS_Version__c",
                            "value": "230413028"
                        },
                        {
                            "name": "System_Customer_App_Version__c",
                            "value": "4.61.1"
                        },
                        {
                            "name": "custom_field_Go_Type__c",
                            "value": "Customer"
                        },
                        {
                            "name": "custom_field_Origin",
                            "value": "In-Apps"
                        },
                        {
                            "name": "custom_field_RecordType",
                            "value": "GOVIET CCU Support"
                        },
                        {
                            "name": "System_Device_Name__c",
                            "value": "lge,LGM-V300L"
                        }
                    ],
                    "subject": "[In App Help][General][general request system cancellation]",
                    "tags": [
                        "nanorep",
                        "nanorep-customer",
                        "consumer-app",
                        "inapphelp",
                        "inapphelp_order",
                        "order__request_system_cancellation__general_request_system_cancellation"
                    ]
                }
            };
            return axiosClient.post("", {
                type: "POST",
                body: JSON.stringify(payload),
                header: StrArrHeaders,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },

}
export const AuthAPI = {

    getHeader() {
        return {
            'transaction-id': deviceInfo?.session_id,
            'x-appid': ' com.gojek.app',
            'x-user-type': ' customer',
            'x-uniqueid': deviceInfo?.unique_id,
            'x-deviceos': ' Android,9',
            'x-authsdk-version': ' 1.2.2',
            'x-cvsdk-version': ' 1.3.3',
            'x-appversion': ' 4.78.3',
            'x-phonemake': ' LGE',
            'accept-language': ' vi-VN',
            'x-phonemodel': ' lge,LGM-V300L',
            'x-m1': deviceInfo?.XM1,
            'content-type': ' application/json; charset=UTF-8',
            'user-agent': ' Gojek/4.78.3 (Android 9)',
        }
    },

    LoginMethod(phone) {
        try {
            const url = `https://accounts.goto-products.com/goto-auth/login/methods`;
            let payload = {
                "client_id": "gojek:consumer:app",
                "client_secret": "pGwQ7oi8bKqqwvid09UrjqpkMEHklb",
                "country_code": "+84",
                "email": "",
                "phone_number": phone
            };
            const headers = headerToArray(this.getHeader())
            return axiosClient.post("", {
                type: "POST",
                body: JSON.stringify(payload),
                header: headers,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    Methods(phone) {
        try {
            const url = `https://accounts.goto-products.com/cvs/v1/methods`;
            let payload = {
                "client_id": "gojek:consumer:app",
                "client_secret": "pGwQ7oi8bKqqwvid09UrjqpkMEHklb",
                "country_code": "+84",
                "flow": "signup",
                "phone_number": phone
            };
            const headers = headerToArray({
                ...this.getHeader(),
                authorization: ""
            })
            return axiosClient.post("", {
                type: "POST",
                body: JSON.stringify(payload),
                header: headers,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    Initiate(phone, verification_id, flow = "signup") {
        try {
            const url = `https://accounts.goto-products.com/cvs/v1/initiate`;
            let payload = {
                "client_id": "gojek:consumer:app",
                "client_secret": "pGwQ7oi8bKqqwvid09UrjqpkMEHklb",
                "country_code": "+84",
                "flow": flow,
                "phone_number": phone,
                "verification_id": verification_id,
                "verification_method": "otp_sms"
            }
            let custom = this.getHeader();
            delete custom['x-m1'];
            const headers = headerToArray(custom)
            return axiosClient.post("", {
                type: "POST",
                body: JSON.stringify(payload),
                header: headers,
                url: url
            });

        } catch (ex) {
            return ex;
        }
    },
    checkPhoneHas(phone) {
        try {
            const url = `https://goid.gojekapi.com/nvs/methods`;
            let payload = {
                "country_code": "+84",
                "phone_number": phone
            };
            const headers = headerToArray({
                ...Objheaders,
                Authorization: ""
            })
            return axiosClient.post("", {
                type: "POST",
                body: JSON.stringify(payload),
                header: headers,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    verifyPhone(verificationId, token, otp, flow = "signup") {
        try {
            let payload = {
                "client_id": "gojek:consumer:app",
                "client_secret": "pGwQ7oi8bKqqwvid09UrjqpkMEHklb",
                "data": {
                    "otp": otp,
                    "otp_token": token
                },
                "flow": flow,
                "verification_id": verificationId,
                "verification_method": "otp_sms"
            }
            const url = `https://accounts.goto-products.com/cvs/v1/verify`;
            const headers = headerToArray(this.getHeader())
            return axiosClient.post("", {
                type: "POST",
                body: JSON.stringify(payload),
                header: headers,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    register(phone, token, name = null, email = null) {
        try {
            var first = ["Nguyễn", "Trần", "Lê", "Vũ", "Trịnh"];
            var last = ["Minh", "Hải", "Tuấn", "Đại", "Hương"];
            var nameG = name !== null ? name : first[Math.floor(Math.random() * 5)] + last[Math.floor(Math.random() * 5)]
            var emailG = email !== null ? email : randomString("0123456789qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM" + "_", 15) + "@gmail.com";
            let payload = {
                "client_name": "gojek:consumer:app",
                "client_secret": "pGwQ7oi8bKqqwvid09UrjqpkMEHklb",
                "data": {
                    "consent_given": true,
                    "email": emailG,
                    "name": nameG,
                    "onboarding_partner": "android",
                    "phone": "+84" + phone,
                    "signed_up_country": "VN"
                }
            }
            const url = `https://api.gojekapi.com/v7/customers/signup`;
            const headers = headerToArray({
                'x-devicechecktoken': ' LITMUS_DISABLED',
                'x-signature': ' 2001',
                'x-signature-time': new Date().getTime(),
                'accept': ' application/json',
                'd1': deviceInfo?.d1,
                'x-appversion': ' 4.78.3',
                'x-appid': ' com.gojek.app',
                'x-platform': ' Android',
                'x-uniqueid': deviceInfo?.unique_id,
                'x-session-id': genSessionID(),
                'x-user-type': ' customer',
                'x-deviceos': ' Android,9',
                'user-uuid': ' ',
                'x-devicetoken': deviceInfo?.device_token,
                'x-phonemake': ' LGE',
                'x-pushtokentype': ' FCM',
                'x-phonemodel': ' lge,LGM-V300L',
                'accept-language': ' vi-VN',
                'x-user-locale': ' vi_VN',
                'x-location': ' ',
                'x-location-accuracy': '',
                'gojek-country-code': ' VN',
                'x-m1': deviceInfo?.XM1,
                'content-type': ' application/json; charset=UTF-8',
                'user-agent': ' okhttp/4.10.0',
                'Verification-Token': 'Bearer ' + token,
                'Authorization': 'Basic ZjM4OTcxMDktOGJjZi00NjU4LWE2M2QtMTAwNjI1NjJiNTgx',
            })
            return axiosClient.post("", {
                type: "POST",
                body: JSON.stringify(payload),
                header: headers,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    refreshToken(access_token, refresh_token, user_uid) {
        try {

            let payload = {
                "client_id": "gojek:consumer:app",
                "client_secret": "pGwQ7oi8bKqqwvid09UrjqpkMEHklb",
                "data": {
                    "refresh_token": refresh_token
                },
                "grant_type": "refresh_token", "scopes": []
            }
            const url = `https://goid.gojekapi.com/goid/token`;
            const headers = headerToArray({
                ...this.getHeaderV1,
                'Authorization': 'Bearer ' + access_token,
                'User-Uuid': user_uid
            })
            return axiosClient.post("", {
                type: "POST",
                body: JSON.stringify(payload),
                header: headers,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    getNumberVOTP(APIKey) {
        try {
            const url = `https://api.viotp.com/request/getv2?token=${APIKey}&serviceId=12&network=VIETTEL`;
            return axiosClient.post("", {
                type: "GET",
                header: StrArrHeaders,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    getOTPVOTP(APIKey, id_session) {
        try {
            const url = `https://api.viotp.com/session/getv2?requestId=${id_session}&token=${APIKey}`;
            return axiosClient.post("", {
                type: "GET",
                header: StrArrHeaders,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    getToken(token, accountId) {
        try {

            let payload = {
                "account_id": accountId,
                "client_id": "gojek:consumer:app",
                "client_secret": "pGwQ7oi8bKqqwvid09UrjqpkMEHklb",
                "grant_type": "cvs",
                "token": token
            }
            const url = `https://accounts.goto-products.com/goto-auth/token`;
            const headers = headerToArray({
                'transaction-id': localStorage.getItem("session_id"),
                'x-appid': ' com.gojek.app',
                'x-user-type': ' customer',
                'x-uniqueid': localStorage.getItem("unique_id"),
                'x-deviceos': ' Android,9',
                'x-authsdk-version': ' 1.2.2',
                'x-cvsdk-version': ' 1.3.3',
                'x-appversion': ' 4.78.3',
                'x-phonemake': ' LGE',
                'accept-language': ' vi-VN',
                'x-phonemodel': ' lge,LGM-V300L',
                'x-m1': ' 1:UNKNOWN,2:UNKNOWN,3:1700371917828-781069432338739537,4:52251,5:msm8998|1900|8,6:00:0A:F5:AA:0F:66,7:<unknown ssid>,8:720x1356,9:,10:1,11:TEdNQzIwMTcwNTA4MTA0MDAwNDk1NTM4AAAAAAAAAAA=,12:INITIALISING,13:1002,14:1700560664,16:0,17:1',
                'content-type': ' application/json; charset=UTF-8',
                'accept-encoding': ' gzip',
                'user-agent': ' okhttp/4.10.0',
                'Cookie': ''
            })
            return axiosClient.post("", {
                type: "POST",
                body: JSON.stringify(payload),
                header: headers,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },
    getTokenSignUp(access_token, refresh_token) {
        try {

            let payload = {
                "client_id": "gojek:consumer:app",
                "client_secret": "pGwQ7oi8bKqqwvid09UrjqpkMEHklb",
                "grant_type": "refresh_token",
                "token": refresh_token
            }
            const url = `https://accounts.goto-products.com/goto-auth/token`;
            let custom = this.getHeader();
            delete custom['transaction-id'];
            const headers = headerToArray({
                ...custom,
                authorization: ' Bearer ' + access_token,
            })
            return axiosClient.post("", {
                type: "POST",
                body: JSON.stringify(payload),
                header: headers,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },

    accountList(verifyToken, refresh_token, user_uid) {
        try {

            let payload = {
                "client_id": "gojek:consumer:app",
                "client_secret": "pGwQ7oi8bKqqwvid09UrjqpkMEHklb"
            }
            const url = `https://accounts.goto-products.com/goto-auth/accountlist`;
            const headers = headerToArray({
                'transaction-id': deviceInfo?.session_id,
                'verification-token': ' Bearer ' + verifyToken,
                'x-appid': ' com.gojek.app',
                'x-user-type': ' customer',
                'x-uniqueid': deviceInfo?.unique_id,
                'x-deviceos': ' Android,9',
                'x-authsdk-version': ' 1.2.2',
                'x-cvsdk-version': ' 1.3.3',
                'x-appversion': ' 4.78.3',
                'x-phonemake': ' LGE',
                'accept-language': ' vi-VN',
                'x-phonemodel': ' lge,LGM-V300L',
                'x-m1': deviceInfo?.XM1,
                'content-type': ' application/json; charset=UTF-8',
                'accept-encoding': ' gzip',
                'user-agent': ' okhttp/4.10.0',
                'Cookie': ''
            })
            return axiosClient.post("", {
                type: "POST",
                body: JSON.stringify(payload),
                header: headers,
                url: url
            });
        } catch (ex) {
            return ex;
        }
    },


};
