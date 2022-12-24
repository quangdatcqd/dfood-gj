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
    searchRestaurant(keyword, picked_loc) {
        try {
            const url = '/searchrestaurant';
            var payload = {
                "G_Token": localStorage.getItem("G-Token"),
                "keyword": keyword,
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
                "session_id": localStorage.getItem("session_id"),
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

};
export default GojekAPI;