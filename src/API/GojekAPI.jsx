import { randomString } from "../common";
import axiosClient from "./axiosClient";

const location = JSON.parse(localStorage.getItem("customerLoc"));

const cusLoc = location?.latitude + "," + location?.longitude;



const GojekAPI = {

    getOrdersActive() {
        try {
            const url = 'https://api.gojekapi.com/v1/customer/card/active';
            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    }
    ,

    getOrderDetail(id) {
        try {
            const url = `https://api.gojekapi.com/v1/bookings/${id}/detail`;
            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    }
    ,
    getListOrders() {
        try {
            const url = 'https://api.gojekapi.com/gofood/consumer/v3/orders';
            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    }
    ,
    searchAddress(keyword) {
        try {
            const url = 'https://api.gojekapi.com/v2/search-places?location=20.9794367%252C105.7099217&service_type=5&location_type=dropoff&keyword=' + encodeURIComponent(keyword);

            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    },
    searchRestaurant(keyword) {
        try {

            const url = `https://api.gojekapi.com/gofood/search/v1/query_understanding?search_query=${encodeURIComponent(keyword)}&picked_loc=${cusLoc}&redesign_enabled=true&super_partner_enabled=true`;

            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    },
    getRestaurant(id) {
        try {
            const url = `https://api.gojekapi.com/gofood/consumer/v4/restaurants/${id}`;


            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    },
    setAddress(id) {
        try {
            const url = `https://api.gojekapi.com/poi/v3/findLatLng?placeid=${id}&service_type=5`;


            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    },
    checkout(dataPayload) {
        try {
            const url = `https://api.gojekapi.com/haggler/public/delivery/v1/estimate`;
            return axiosClient.post(url, dataPayload);
        } catch (ex) {
            return ex;
        }
    },
    dealsCheckout(brandID, merchantID) {
        try {
            const url = `https://api.gojekapi.com/gofood/v2/deals/checkout?merchant_id=${merchantID}&brand_id=${brandID}&service_type=5&picked_loc=${cusLoc}`;


            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    },
    makeOrder(dataPayload) {
        try {
            const url = `https://api.gojekapi.com/waiter/v4/orders`;

            return axiosClient.post(url, dataPayload);
        } catch (ex) {
            return ex;
        }
    },
    getChannelChat(id) {
        try {
            const url = `https://api.gojekapi.com/v2/order/${id}/channel?service_type=5`;
            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    },

    getAllChat(id) {
        try {
            const url = `https://api.gojekapi.com/v2/chat/channels/${id}/messages?batch_size=20&direction=prev&message_ts=8999999999999`;

            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    },

    getMemberChat(id) {
        try {
            const url = `https://api.gojekapi.com/v2/chat/channels/${id}`;


            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    },

    sendMessage(id, text) {
        try {
            const url = `https://api.gojekapi.com/v2/chat/channels/${id}/message`;

            let payload = `{"channel_type":"group-booking","data":"{\\"tracking_id\\":\\"ff41235f-b55c-4f52-9e07-62abd8560d35\\"}","request_id":"d3e4fb1f-9cd4-4da1-8d8a-38e33ebc15dd","text":"${text}","type":"text"}`

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    cancelOrder(id) {
        try {
            const url = `https://api.gojekapi.com/waiter/v1/orders/${id}/cancel`;

            let payload = `{"activitySource":2,"bookingId":0,"cancelDescription":"Cancelled by customer apps","cancelReasonCode":"CUSTOMER_CANCEL_WITH_NO_REASON","orderNo":"${id}"}`;

            return axiosClient.put(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    getVoucher() {
        try {
            const url = `https://api.gojekapi.com/gopoints/v3/wallet/vouchers?limit=200&page=1`;

            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    },
    getToken() {
        try {
            const url = '/getrunapp';

            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    },

    tracking(id) {
        try {
            const url = `https://api.gojekapi.com/v4/booking/track`;
            let payload = `{"orderNumbers":"${id}"}`
            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },


    cardsGofoodV2() {
        try {
            const url = 'https://api.gojekapi.com/v2/customer/cards/gofood-home-v2';
            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    },

    searchSuggestions() {
        try {
            const url = `https://api.gojekapi.com/gofood/search/v2/suggestions?picked_loc=${encodeURIComponent(cusLoc)}`;
            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    },

    Methods(phone) {
        try {
            const url = `https://goid.gojekapi.com/nvs/v1/methods`;
            let payload = `{"client_id":"gojek:consumer:app","client_secret":"pGwQ7oi8bKqqwvid09UrjqpkMEHklb","country_code":"+84","flow":"signup","phone_number":"${phone}"}`;
            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    Initiate(phone, verification_id) {
        try {
            const url = `https://goid.gojekapi.com/nvs/v1/initiate`;
            let payload = `{"client_id":"gojek:consumer:app","client_secret":"pGwQ7oi8bKqqwvid09UrjqpkMEHklb","country_code":"+84","flow":"signup","phone_number":"${phone}","verification_id":"${verification_id}","verification_method":"otp","verification_ref_id":"${localStorage.getItem("session_id")}"}`
            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    checkPhoneHas(phone) {
        try {
            const url = `https://goid.gojekapi.com/nvs/methods`;
            let payload = `{"country_code":"+84","phone_number":"${phone}"}`;
            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    verifyPhone(token, otp) {
        try {
            let payload = `{"client_id":"gojek:consumer:app","client_secret":"pGwQ7oi8bKqqwvid09UrjqpkMEHklb","data":{"otp":"${otp}","otp_token":"${token}"},"flow":"signup","verification_method":"otp"}`
            const url = `https://goid.gojekapi.com/nvs/v1/verify`;
            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    register(phone, token) {
        try {

            let payload = `{"client_name":"gojek:consumer:app","client_secret":"pGwQ7oi8bKqqwvid09UrjqpkMEHklb","data":{"consent_given":true,"email":"${randomString("0123456789qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM" + "_", 10)}d@gmail.com","name":"dat","onboarding_partner":"android","phone":"+84${phone}"}}`;
            const url = `https://api.gojekapi.com/v7/customers/signup`;
            return axiosClient.post(url, payload, {
                headers: {
                    'Verification-Token': 'Bearer ' + token,
                    'Authorization': 'Basic ZjM4OTcxMDktOGJjZi00NjU4LWE2M2QtMTAwNjI1NjJiNTgx',
                }
            });
        } catch (ex) {
            return ex;
        }
    },
    refreshToken(access_token, refresh_token, user_uid) {
        try {

            let payload = `{"client_id":"gojek:consumer:app","client_secret":"pGwQ7oi8bKqqwvid09UrjqpkMEHklb","data":{"refresh_token":"${refresh_token}"},"grant_type":"refresh_token","scopes":[]}`
            const url = `https://goid.gojekapi.com/goid/token`;
            return axiosClient.post(url, payload,
                {
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'User-Uuid': user_uid
                    }
                });
        } catch (ex) {
            return ex;
        }
    },
    getNumberVOTP() {
        try {


            const url = `https://api.viotp.com/request/getv2?token=6da02b69278e49ce8d7b6d51b4e8d56d&serviceId=12`;
            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    },
    getOTPVOTP(id_session) {
        try {


            const url = `https://api.viotp.com/session/getv2?requestId=${id_session}&token=6da02b69278e49ce8d7b6d51b4e8d56d`;
            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    },

    dealsHome() {
        try {
            const location = JSON.parse(localStorage.getItem("customerLoc"));
            const cusLoc = location?.latitude + "," + location?.longitude;
            const url = 'https://api.gojekapi.com/gofood/v2/deals/home?picked_loc=' + encodeURIComponent(cusLoc);


            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    },

    orderDetail(id) {
        try {
            const url = `https://api.gojekapi.com/v1/bookings/${id}/detail`;


            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    },

};
export default GojekAPI;