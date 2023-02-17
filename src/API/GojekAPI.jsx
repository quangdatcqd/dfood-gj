import axiosClient from "./axiosClient";

const location = JSON.parse(localStorage.getItem("customerLoc"));
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const cusLoc = location?.latitude + "," + location?.longitude;


console.log("renderGojek");
const GojekAPI = {
    searchAddress(keyword) {
        try {
            const url = '/searchaddress';
            let payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "session_id": localStorage.getItem("session_id"),
                "picked_loc": cusLoc,
                "user_uuid": userInfo?.id ?? userInfo?.id,
                "uniqueid": localStorage.getItem("unique_id"),
                "keyword": keyword
            }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    searchRestaurant(keyword) {
        try {

            const url = '/searchrestaurant';

            let payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "session_id": localStorage.getItem("session_id"),
                "picked_loc": cusLoc,
                "user_uuid": userInfo?.id ?? userInfo?.id,
                "uniqueid": localStorage.getItem("unique_id"),
                "keyword": keyword
            }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    getRestaurant(id) {
        try {
            const url = '/getrestaurant';
            let payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "session_id": localStorage.getItem("session_id"),
                "picked_loc": cusLoc,
                "user_uuid": userInfo?.id ?? userInfo?.id,
                "uniqueid": localStorage.getItem("unique_id"),
                "id_res": id
            }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    setAddress(id) {
        try {
            const url = '/setaddress';
            let payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "session_id": localStorage.getItem("session_id"),
                "picked_loc": cusLoc,
                "user_uuid": userInfo?.id ?? userInfo?.id,
                "uniqueid": localStorage.getItem("unique_id"),
                "idlocation": id
            }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    checkout(dataPayload) {
        try {
            const url = '/checkout';

            let payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "session_id": localStorage.getItem("session_id"),
                "picked_loc": cusLoc,
                "user_uuid": userInfo?.id ?? userInfo?.id,
                "uniqueid": localStorage.getItem("unique_id"),
                "payload": JSON.stringify(dataPayload),
            }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    makeOrder(dataPayload) {
        try {
            const url = '/makeoder';
            let payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "session_id": localStorage.getItem("session_id"),
                "picked_loc": cusLoc,
                "user_uuid": userInfo?.id ?? userInfo?.id,
                "uniqueid": localStorage.getItem("unique_id"),
                "payload": JSON.stringify(dataPayload)
            }
            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    getChannelChat(id) {
        try {
            const url = '/getchannelchat';

            let payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "session_id": localStorage.getItem("session_id"),
                "picked_loc": cusLoc,
                "user_uuid": userInfo?.id ?? userInfo?.id,
                "uniqueid": localStorage.getItem("unique_id"),
                "idOrder": id,
            }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },

    getAllChat(id) {
        try {
            const url = '/getallchat';
            let payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "session_id": localStorage.getItem("session_id"),
                "picked_loc": cusLoc,
                "user_uuid": userInfo?.id ?? userInfo?.id,
                "uniqueid": localStorage.getItem("unique_id"),
                "idChannel": id,
            }
            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },

    getMemberChat(id) {
        try {
            const url = '/getmemberchat';

            let payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "session_id": localStorage.getItem("session_id"),
                "picked_loc": cusLoc,
                "user_uuid": userInfo?.id ?? userInfo?.id,
                "uniqueid": localStorage.getItem("unique_id"),
                "idChannel": id,
            }
            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },

    sendMessage(id, text) {
        try {
            const url = '/sendmessage';

            let payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "session_id": localStorage.getItem("session_id"),
                "picked_loc": cusLoc,
                "user_uuid": userInfo?.id ?? userInfo?.id,
                "uniqueid": localStorage.getItem("unique_id"),
                "idChannel": id,
                "text": text
            }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    cancelOrder(id) {
        try {
            const url = '/cancelorder';

            let payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "session_id": localStorage.getItem("session_id"),
                "picked_loc": cusLoc,
                "user_uuid": userInfo?.id ?? userInfo?.id,
                "uniqueid": localStorage.getItem("unique_id"),
                "id_order": id,
            }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    getVoucher() {
        try {
            const url = '/getvoucher';
            let payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "session_id": localStorage.getItem("session_id"),
                "picked_loc": cusLoc,
                "user_uuid": userInfo?.id ?? userInfo?.id,
                "uniqueid": localStorage.getItem("unique_id"),

            }
            return axiosClient.post(url, payload);
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

    tracking() {
        try {
            const url = '/tracking';
            let payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "session_id": localStorage.getItem("session_id"),
                "picked_loc": cusLoc,
                "user_uuid": userInfo?.id ?? userInfo?.id,
                "uniqueid": localStorage.getItem("unique_id"),
                "idOrder": localStorage.getItem("idOrder")
            }


            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },


    cardsGofoodV2() {
        try {
            const url = '/cardsgofoodv2';
            let payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "session_id": localStorage.getItem("session_id"),
                "picked_loc": cusLoc,
                "user_uuid": userInfo?.id ?? userInfo?.id,
                "uniqueid": localStorage.getItem("unique_id"),

            }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },

    searchSuggestions() {
        try {
            const url = '/searchsuggestions';
            let payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "session_id": localStorage.getItem("session_id"),
                "picked_loc": cusLoc,
                "user_uuid": userInfo?.id ?? userInfo?.id,
                "uniqueid": localStorage.getItem("unique_id"),

            }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },

    Methods(phone) {
        try {
            const url = `/methods`;
            let payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "session_id": localStorage.getItem("session_id"),
                "picked_loc": cusLoc,
                "user_uuid": userInfo?.id ?? userInfo?.id,
                "uniqueid": localStorage.getItem("unique_id"),
                "phone": phone
            }
            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    Initiate(phone, verification_id) {
        try {
            const url = `/initiate`;
            let payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "session_id": localStorage.getItem("session_id"),
                "picked_loc": cusLoc,
                "user_uuid": userInfo?.id ?? userInfo?.id,
                "uniqueid": localStorage.getItem("unique_id"),
                "phone": phone,
                "verification_id": verification_id
            }
            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    checkPhoneHas(phone) {
        try {
            const url = `/checkphonehas`;
            let payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "session_id": localStorage.getItem("session_id"),
                "picked_loc": cusLoc,
                "user_uuid": userInfo?.id ?? userInfo?.id,
                "uniqueid": localStorage.getItem("unique_id"),
                "phone": phone
            }
            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    verifyPhone(token, otp) {
        try {
            let payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "session_id": localStorage.getItem("session_id"),
                "picked_loc": cusLoc,
                "user_uuid": userInfo?.id ?? userInfo?.id,
                "uniqueid": localStorage.getItem("unique_id"),
                "otp": otp,
                "token": token
            }
            const url = `/verifyphone`;
            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    register(phone, token) {
        try {

            let payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "session_id": localStorage.getItem("session_id"),
                "picked_loc": cusLoc,
                "user_uuid": userInfo?.id ?? userInfo?.id,
                "uniqueid": localStorage.getItem("unique_id"),
                "token": token,
                "phone": phone
            }
            const url = `/register `;
            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    refreshToken(accessToken, refreshToken, user_uuid) {
        try {

            let payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "session_id": localStorage.getItem("session_id"),
                "picked_loc": cusLoc,
                "user_uuid": userInfo?.id ?? userInfo?.id,
                "uniqueid": localStorage.getItem("unique_id"),
                "accessToken": accessToken,
                "refreshToken": refreshToken,
                "user_uuid": user_uuid
            }
            const url = `/refreshtoken`;
            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    getNumberVOTP() {
        try {


            const url = `/getnumbervotp`;
            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    },
    getOTPVOTP(id_session) {
        try {


            const url = `/getvotp/${id_session}`;
            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    },

    dealsHome() {
        try {
            const url = '/dealshome';
            let payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "session_id": localStorage.getItem("session_id"),
                "picked_loc": cusLoc,
                "user_uuid": userInfo?.id ?? userInfo?.id,
                "uniqueid": localStorage.getItem("unique_id"),

            }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },

};
export default GojekAPI;