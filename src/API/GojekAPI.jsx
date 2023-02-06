import axiosClient from "./axiosClient";;

const GojekAPI = {
    searchAddress(keyword) {
        try {
            const url = '/searchaddress';
            var payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "session_id": localStorage.getItem("session_id"),
                "keyword": keyword
            }
            // var headers = {
            //     'Authorization': 'Bearer ' + localStorage.getItem("G-Token")
            // }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    searchRestaurant(keyword) {
        try {
            var location = JSON.parse(localStorage.getItem("customerLoc"));
            var cusLoc = location?.latitude + "," + location?.longitude;
            const url = '/searchrestaurant';
            var payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "keyword": keyword,
                "picked_loc": cusLoc
            }
            // var headers = {
            //     'Authorization': 'Bearer ' + localStorage.getItem("G-Token")
            // }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    getRestaurant(id) {
        try {
            const url = '/getrestaurant';
            var payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "id_res": id
            }
            // var headers = {
            //     'Authorization': 'Bearer ' + localStorage.getItem("G-Token")
            // }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    setAddress(id) {
        try {
            const url = '/setaddress';
            var payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "idlocation": id
            }
            // var headers = {
            //     'Authorization': 'Bearer ' + localStorage.getItem("G-Token")
            // }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    checkout(payload) {
        try {
            const url = '/checkout';
            var payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "payload": JSON.stringify(payload),

            }
            // var headers = {
            //     'Authorization': 'Bearer ' + localStorage.getItem("G-Token")
            // }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    makeOrder(payload, picked_loc) {
        try {
            const url = '/makeoder';
            var payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "payload": JSON.stringify(payload),
                "picked_loc": picked_loc

            }
            // var headers = {
            //     'Authorization': 'Bearer ' + localStorage.getItem("G-Token")
            // }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    getChannelChat(id) {
        try {
            const url = '/getchannelchat';
            var payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "idOrder": id,

            }
            // var headers = {
            //     'Authorization': 'Bearer ' + localStorage.getItem("G-Token")
            // }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },

    getAllChat(id) {
        try {
            const url = '/getallchat';
            var payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "idChannel": id,

            }
            // var headers = {
            //     'Authorization': 'Bearer ' + localStorage.getItem("G-Token")
            // }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },

    getMemberChat(id) {
        try {
            const url = '/getmemberchat';
            var payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "idChannel": id,

            }
            // var headers = {
            //     'Authorization': 'Bearer ' + localStorage.getItem("G-Token")
            // }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },

    sendMessage(id, text) {
        try {
            const url = '/sendmessage';
            var payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "idChannel": id,
                "text": text

            }
            // var headers = {
            //     'Authorization': 'Bearer ' + localStorage.getItem("G-Token")
            // }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    cancelOrder(id) {
        try {
            const url = '/cancelorder';
            var payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "id_order": id,

            }
            // var headers = {
            //     'Authorization': 'Bearer ' + localStorage.getItem("G-Token")
            // }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    getVoucher() {
        try {
            const url = '/getvoucher';
            var payload = {
                "G_Token": localStorage.getItem("G-Token")

            }
            // var headers = {
            //     'Authorization': 'Bearer ' + localStorage.getItem("G-Token")
            // }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },
    getToken() {
        try {
            const url = '/getrunapp';
            // var payload = {
            //     "G_Token": localStorage.getItem("G-Token")

            // }
            // var headers = {
            //     'Authorization': 'Bearer ' + localStorage.getItem("G-Token")
            // }

            return axiosClient.get(url);
        } catch (ex) {
            return ex;
        }
    },

    tracking() {
        try {
            const url = '/tracking';
            var payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "idOrder": localStorage.getItem("idOrder")

            }
            // var headers = {
            //     'Authorization': 'Bearer ' + localStorage.getItem("G-Token")
            // }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },


    cardsGofoodV2() {
        try {
            const url = '/cardsgofoodv2';
            var location = JSON.parse(localStorage.getItem("customerLoc"));
            var cusLoc = location?.latitude + "," + location?.longitude;
            var payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "picked_loc": cusLoc
            }
            // var headers = {
            //     'Authorization': 'Bearer ' + localStorage.getItem("G-Token")
            // }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },

    searchSuggestions() {
        try {
            const url = '/searchsuggestions';
            var location = JSON.parse(localStorage.getItem("customerLoc"));
            var cusLoc = location?.latitude + "," + location?.longitude;
            var payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "picked_loc": cusLoc

            }
            // var headers = {
            //     'Authorization': 'Bearer ' + localStorage.getItem("G-Token")
            // }

            return axiosClient.post(url, payload);
        } catch (ex) {
            return ex;
        }
    },

};
export default GojekAPI;