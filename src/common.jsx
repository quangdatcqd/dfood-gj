export const fomatCurrency = (number) => {
    return Number(number) > 0 ? number.toLocaleString('it-IT', { style: 'currency', currency: "VND" }) : 0;
}
export const randomString = (characters, length) => {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export const generateID = () => {




    const chars = '0123456789qwertyuioplkjhgfdsazxcvbnm';
    const fullchars = '0123456789qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM';
    const genSessionID = () => {

        let uuid = '';

        for (let i = 0; i < 36; i++) {
            if (i === 8 || i === 13 || i === 18 || i === 23) {
                uuid += '-';
            } else if (i === 14) {
                uuid += '4';
            } else if (i === 19) {
                uuid += chars[(Math.random() * 4) | 8];
            } else {
                uuid += chars[Math.floor(Math.random() * 16)];
            }
        }
        localStorage.setItem("session_id", uuid);


    }
    function genD1() {
        let result = "";
        for (let i = 0; i < 64; i++) {
            if (i % 2 === 0 && i > 0) {
                result += ":";
            }
            let hex = Math.floor(Math.random() * 16).toString(16).toUpperCase();
            result += hex;
        }
        return result;
    }
    localStorage.setItem("D1", genD1());


    function randomMAC() {
        let mac = "";
        for (let i = 0; i < 6; i++) {
            mac += Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
            if (i < 5) {
                mac += ":";
            }
        }
        return mac.toUpperCase();
    }
    var XM1 = ' 1:__' + randomString(chars, 36) +
        ',2:asdfsdf,3:' + new Date().getTime() +
        '-7026432932894132169,4:52251,5:' + randomString(fullchars, 8) +
        '|19eew00|8,6:' + randomMAC() +
        ',7:"' + randomString(fullchars, 15) +
        '",8:720x1356,9:asdf,10:2,11:' + randomString(fullchars, 32) +
        'AAAAAAAAAAA=,12:' + randomString(chars, 40) +
        ',13:33005,14:7026432932894132169';
    localStorage.setItem("XM1", XM1);

    localStorage.setItem("device_id", randomString(fullchars + "+/", 325) + "==")

    localStorage.setItem("unique_id", randomString(chars, 33));
    var tokenDevice = randomString(fullchars, 18) + "-DHZ:" + randomString(fullchars, 163);
    localStorage.setItem("token_device", tokenDevice);

    genSessionID();




}