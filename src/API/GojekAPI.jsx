import { randomString } from "../common";
import axiosClient from "./axiosClient";


const HEADERS = () => {

    const location = JSON.parse(localStorage.getItem("customerLoc"));
    const cusLoc = location?.latitude + "," + location?.longitude;

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const str = randomString("1234567890QWERTYUIOPLKJHGFDSAZXCVBNMazxcvbnmlkjhgfdsqwertyuiop", 5);
    return {
        headers: {

            // "access-control-allow-methods": "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS",
            // "access-control-allow-headers": "*",
            // "access-control-expose-headers": "*",
            'D1': localStorage.getItem("D1"),
            'X-Session-Id': localStorage.getItem("session_id"),
            'X-Uniqueid': localStorage.getItem("unique_id"),
            'X-Devicetoken': localStorage.getItem("token_device"),
            'User-Uuid': userInfo?.id ?? userInfo?.id,
            'Authorization': ' Bearer  ' + localStorage.getItem("G-Token"),
            'X-Location': cusLoc,
            //' AVDVDbVfnBQpM1zKB7JKU9F9faEZTHD6DURJ5V0VW92TFp6YS0KAYdgDoI6VkLxPmgiEiSvqMun2N0bzTRRUu/Ywg7yZhWE8VMswUHvucRMGO4W1X64rnFYqcPd8nujH8+T5vDlruJaiLrwZeB55nNcAiFCmp/ss2VR5O9f6wv96utIf/I3heR9lfZ9uaL99e7EoOZSMN4z3EzpyVUYwL/ccyVb4iIWiJZqGS/ue4p4SqSlZYgb8gaHpnOWAb5FeJMGPsINmhoMas0q5BvHNiLosJDqPV/WB3hWeKhhgVj964F+cGaRWY3LdyZKJRBh4Yv+tAR+t3T0aXP6iB54AfA=='
            'X-Device-Id': localStorage.getItem("device_id"),
            'X-M1': localStorage.getItem("XM1"),
            'X-Signature': ' 1001',
            'X-Signature-Time': ' 0',
            'Accept': ' application/json',
            'X-Appversion': ' 4.61.1',
            'X-Appid': ' com.gojek.app',
            'X-Platform': 'ios',
            'X-Deviceos': 'ios',
            'X-User-Type': ' customer',
            'X-Pushtokentype': ' FCM',
            'X-Phonemodel': str + "," + str,
            'X-Usertimezone': ' +07:00',
            'Accept-Language': ' vi-VN',
            'Gojek-Country-Code': '  VN',
            'Gojek-Service-Area': ' 7001',
            'Gojek-Timezone': '  Asia/Ho_Chi_Minh ',
            'X-User-Locale': ' vi_VN',
            //' AVDVDbVfnBQpM1zKB7JKU9F9faEZTHD6DURJ5V0VW92TFp6YS0KAYdgDoI6VkLxPmgiEiSvqMun2N0bzTRRUu/Ywg7yZhWE8VMswUHvucRMGO4W1X64rnFYqcPd8nujH8+T5vDlruJaiLrwZeB55nNcAiFCmp/ss2VR5O9f6wv96utIf/I3heR9lfZ9uaL99e7EoOZSMN4z3EzpyVUYwL/ccyVb4iIWiJZqGS/ue4p4SqSlZYgb8gaHpnOWAb5FeJMGPsINmhoMas0q5BvHNiLosJDqPV/WB3hWeKhhgVj964F+cGaRWY3LdyZKJRBh4Yv+tAR+t3T0aXP6iB54AfA=='

            'Content-Type': ' application/json; charset=UTF-8',
            // 'Accept-Encoding': ' gzip, deflate',
            // 'User-Agent': ' okhttp/4.10.0', 
            'X-Phonemake': str,


        },
        picked_loc: cusLoc
    }
}



const GojekAPI = {

    postSession(id) {
        try {
            const url = `https://lomdom.tk/dbook/public/api/postsession`;
            return axiosClient.post(url, {
                id_order: id,
                G_Token: localStorage.getItem("G-Token"),
                R_Token: localStorage.getItem("R-Token"),
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
    getGenIDRes() {
        try {

            return axiosClient.get("http://localhost:8000/api/generateidreslist");
        } catch (ex) {
            return ex;
        }
    }
    ,

    test() {
        try {

            return axiosClient.get("https://api.ipify.org?format=json");
        } catch (ex) {
            return ex;
        }
    },

    getRessDeals(page) {
        try {

            var url = `https://api.gojekapi.com/gofood/consumer/v3/restaurants?collection=V_PARTNER_CLEAN&include_banner=false&is_from_offer_page=true&page=${page}&picked_loc=${encodeURIComponent(HEADERS().picked_loc)}&redesign_enabled=true&search_id=3e8dae6de-02b4-45a0-81ed-1fafdf76e04b&super_partner_enabled=true&voucher_batch_id=&limit=15`;
            return axiosClient.get(url, HEADERS());
        } catch (ex) {
            return ex;
        }
    }
    ,
    getOrdersActive() {
        try {
            const url = 'https://api.gojekapi.com/v1/customer/card/active';
            return axiosClient.get(url, HEADERS());
        } catch (ex) {
            return ex;
        }
    }
    ,

    getOrderDetail(id) {
        try {
            const url = `https://api.gojekapi.com/v1/bookings/${id}/detail`;
            return axiosClient.get(url, HEADERS());
        } catch (ex) {
            return ex;
        }
    }
    ,
    getListOrders() {
        try {
            const url = 'https://api.gojekapi.com/gofood/consumer/v3/orders';
            return axiosClient.get(url, HEADERS());
        } catch (ex) {
            return ex;
        }
    }
    ,
    searchAddress(keyword) {
        try {
            const url = 'https://api.gojekapi.com/v2/search-places?location=20.9794367%252C105.7099217&service_type=5&location_type=dropoff&keyword=' + encodeURIComponent(keyword);

            return axiosClient.get(url, HEADERS());
        } catch (ex) {
            return ex;
        }
    },
    searchRestaurant(keyword) {
        try {

            const url = `https://api.gojekapi.com/gofood/search/v1/query_understanding?search_query=${encodeURIComponent(keyword)}&picked_loc=${HEADERS().picked_loc}&redesign_enabled=true&super_partner_enabled=true`;

            return axiosClient.get(url, HEADERS());
        } catch (ex) {
            return ex;
        }
    },


    getRestaurantV5(id) {
        try {
            // const url = `https://api.gojekapi.com/gofood/consumer/v5/restaurants/${id}`;
            const url = `https://api.gojekapi.com/gofood/consumer/v5/restaurants/${id}`;
            return axiosClient.get(url, HEADERS());
        } catch (ex) {
            return ex;
        }
    },
    getRestaurant(id) {
        try {
            const url = `https://api.gojekapi.com/gofood/consumer/v4/restaurants/${id}`;
            // const url = `https://api.gojekapi.com/gofood/consumer/v5/restaurants/2644b825-0c4e-4a36-8cbf-bb01c33ed0b1?search_position=2&search_id=0ae29d3e-49ba-46dd-931b-6356dd32d73f&location=null&order_intent=delivery&is_offer_list_experiment=true&cart_recommendations_enabled=false&picked_loc=10.687392%2C106.59386&delivery_mode_intent=regular`;
            return axiosClient.get(url, HEADERS());
        } catch (ex) {
            return ex;
        }
    },
    setAddress(id) {
        try {
            const url = `https://api.gojekapi.com/poi/v3/findLatLng?placeid=${id}&service_type=5`;


            return axiosClient.get(url, HEADERS());
        } catch (ex) {
            return ex;
        }
    },
    checkout(dataPayload) {
        try {
            const url = `https://api.gojekapi.com/haggler/public/delivery/v1/estimate`;
            return axiosClient.post(url, dataPayload,
                {
                    headers: {
                        ...HEADERS().headers,
                        'X-Platform': "",
                    }
                }
            );
        } catch (ex) {
            return ex;
        }
    },
    dealsCheckout(brandID, merchantID) {
        try {
            const url = `https://api.gojekapi.com/gofood/v2/deals/checkout?merchant_id=${merchantID}&brand_id=${brandID}&service_type=5&picked_loc=${HEADERS().picked_loc}`;
            // const url = `https://api.gojekapi.com/gofood/v2/deals/checkout?merchant_id=2644b825-0c4e-4a36-8cbf-bb01c33ed0b1&brand_id=d57bfd59-2053-4784-95a7-d74136b997e1&service_type=5&picked_loc=10.687392%2C106.59386`;


            return axiosClient.get(url, HEADERS());
        } catch (ex) {
            return ex;
        }
    },
    makeOrder(dataPayload) {
        try {
            const url = `https://api.gojekapi.com/waiter/v4/orders`;

            return axiosClient.post(url, dataPayload, HEADERS());
        } catch (ex) {
            return ex;
        }
    },
    getChannelChat(id) {
        try {
            const url = `https://api.gojekapi.com/v2/order/${id}/channel?service_type=5`;
            return axiosClient.get(url, HEADERS());
        } catch (ex) {
            return ex;
        }
    },

    getAllChat(id) {
        try {
            const url = `https://api.gojekapi.com/v2/chat/channels/${id}/messages?batch_size=20&direction=prev&message_ts=8999999999999`;

            return axiosClient.get(url, HEADERS());
        } catch (ex) {
            return ex;
        }
    },

    getMemberChat(id) {
        try {
            const url = `https://api.gojekapi.com/v2/chat/channels/${id}`;


            return axiosClient.get(url, HEADERS());
        } catch (ex) {
            return ex;
        }
    },

    sendMessage(id, text) {
        try {
            const url = `https://api.gojekapi.com/v2/chat/channels/${id}/message`;

            let payload = `{"channel_type":"group-booking","data":"{\\"tracking_id\\":\\"ff41235f-b55c-4f52-9e07-62abd8560d35\\"}","request_id":"d3e4fb1f-9cd4-4da1-8d8a-38e33ebc15dd","text":"${text}","type":"text"}`

            return axiosClient.post(url, payload, HEADERS());
        } catch (ex) {
            return ex;
        }
    },
    cancelOrder(id) {
        try {
            const url = `https://api.gojekapi.com/waiter/v1/orders/${id}/cancel`;

            let payload = `{"activitySource":2,"bookingId":0,"cancelDescription":"Cancelled by customer apps","cancelReasonCode":"CUSTOMER_CANCEL_WITH_NO_REASON","orderNo":"${id}"}`;

            return axiosClient.put(url, payload, HEADERS());
        } catch (ex) {
            return ex;
        }
    },
    getVoucher() {
        try {
            const url = `https://api.gojekapi.com/gopoints/v3/wallet/vouchers?limit=200&page=1`;

            return axiosClient.get(url, HEADERS());
        } catch (ex) {
            return ex;
        }
    },
    getToken() {
        try {
            const url = '/getrunapp';

            return axiosClient.get(url, HEADERS());
        } catch (ex) {
            return ex;
        }
    },

    tracking(id) {
        try {
            const url = `https://api.gojekapi.com/v4/booking/track`;
            let payload = `{"orderNumbers":"${id}"}`
            return axiosClient.post(url, payload, HEADERS());
        } catch (ex) {
            return ex;
        }
    },


    cardsGofoodV2() {
        try {
            const url = 'https://api.gojekapi.com/v2/customer/cards/gofood-home-v2';
            return axiosClient.get(url, HEADERS());
        } catch (ex) {
            return ex;
        }
    },

    searchSuggestions() {
        try {
            const url = `https://api.gojekapi.com/gofood/search/v2/suggestions?picked_loc=${encodeURIComponent(HEADERS().picked_loc)}`;
            return axiosClient.get(url, HEADERS());
        } catch (ex) {
            return ex;
        }
    },

    Methods(phone) {
        try {

            console.log("render")
            const url = `https://goid.gojekapi.com/nvs/v1/methods`;
            let payload = `{"client_id":"gojek:consumer:app","client_secret":"pGwQ7oi8bKqqwvid09UrjqpkMEHklb","country_code":"+84","flow":"signup","phone_number":"${phone}"}`;
            return axiosClient.post(url, payload, HEADERS());
        } catch (ex) {
            return ex;
        }
    },
    Initiate(phone, verification_id) {
        try {
            const url = `https://goid.gojekapi.com/nvs/v1/initiate`;
            let payload = `{"client_id":"gojek:consumer:app","client_secret":"pGwQ7oi8bKqqwvid09UrjqpkMEHklb","country_code":"+84","flow":"signup","phone_number":"${phone}","verification_id":"${verification_id}","verification_method":"otp","verification_ref_id":"${localStorage.getItem("session_id")}"}`
            return axiosClient.post(url, payload, HEADERS());
        } catch (ex) {
            return ex;
        }
    },
    checkPhoneHas(phone) {
        try {
            const url = `https://goid.gojekapi.com/nvs/methods`;
            let payload = `{"country_code":"+84","phone_number":"${phone}"}`;
            return axiosClient.post(url, payload, HEADERS());
        } catch (ex) {
            return ex;
        }
    },
    verifyPhone(token, otp) {
        try {
            let payload = `{"client_id":"gojek:consumer:app","client_secret":"pGwQ7oi8bKqqwvid09UrjqpkMEHklb","data":{"otp":"${otp}","otp_token":"${token}"},"flow":"signup","verification_method":"otp"}`
            const url = `https://goid.gojekapi.com/nvs/v1/verify`;
            return axiosClient.post(url, payload, HEADERS());
        } catch (ex) {
            return ex;
        }
    },
    register(phone, token) {
        try {

            let payload = `{"client_name":"gojek:consumer:app","client_secret":"pGwQ7oi8bKqqwvid09UrjqpkMEHklb","data":{"consent_given":true,"email":"${randomString("0123456789qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM" + "_", 15)}d@gmail.com","name":"dat","onboarding_partner":"android","phone":"+84${phone}"}}`;
            const url = `https://api.gojekapi.com/v7/customers/signup`;
            return axiosClient.post(url, payload, {
                headers: {
                    ...HEADERS().headers,
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
                        ...HEADERS().headers,
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
            return axiosClient.get(url, HEADERS());
        } catch (ex) {
            return ex;
        }
    },
    getOTPVOTP(id_session) {
        try {


            const url = `https://api.viotp.com/session/getv2?requestId=${id_session}&token=6da02b69278e49ce8d7b6d51b4e8d56d`;
            return axiosClient.get(url, HEADERS());
        } catch (ex) {
            return ex;
        }
    },

    dealsHome() {
        try {
            const url = 'https://api.gojekapi.com/gofood/v2/deals/home?picked_loc=' + encodeURIComponent(HEADERS().picked_loc);


            return axiosClient.get(url, HEADERS());
        } catch (ex) {
            return ex;
        }
    },

    orderDetail(id) {
        try {
            const url = `https://api.gojekapi.com/v1/bookings/${id}/detail`;


            return axiosClient.get(url, HEADERS());
        } catch (ex) {
            return ex;
        }
    },

};
export default GojekAPI;