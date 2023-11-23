export const fomatCurrency = (number) => {
    return Number(number) > 0 ? number.toLocaleString('it-IT', { style: 'currency', currency: "VND" }) : 0;
}
const characters = "1234567890QWERTYUIOPLKJHGFDSAZXCVBNMazxcvbnmlkjhgfdsqwertyuiop";
export const randomString = (length, char = null) => {
    char = char !== null ? char : characters;
    console.log(char);
    let result = "";
    for (let i = 0; i < length; i++) {
        result += char.charAt(Math.floor(Math.random() * char.length));
    }
    return result;
}
export const genSessionID = () => {

    let uuid = '';

    for (let i = 0; i < 36; i++) {
        if (i === 8 || i === 13 || i === 18 || i === 23) {
            uuid += '-';
        } else if (i === 14) {
            uuid += '4';
        } else if (i === 19) {
            uuid += characters[(Math.random() * 4) | 8];
        } else {
            uuid += characters[Math.floor(Math.random() * 16)];
        }
    }
    return uuid.toLowerCase();
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

export const generateID = () => {

    var device_token = ''
    //' cSSlj9eTQue4nCivj6hX6d:APA91bHB4udOd4-TgRAI0ExrIzfdDxHcz-6lh1Dr8eK46uhHhP2yKBHpwtRLmSYJMKhmuUVZRDrhGHVdpXP4jJ5Rvht8jnKTjR6CFKZTr61KBf_hCav2AGrBJKJplnjuWShqUsuMR75j';
    var XM1 = `1:UNKNOWN,2:UNKNOWN,3:${new Date().getTime()}-${randomString(18, "0123456789")},4:52251,5:msm8998|1900|8,6:${randomMAC()},7:"${randomString(10)}",8:720x1356,9:passive\\,gps\\,network,10:1,11:TEdNQzIwMTcwNTA4MTA0MDAwNDk1NTM4AAAAAAAAAAA=,12:INITIALISING,13:1002,14:${new Date().getTime()},16:0,17:1`
    var deviceInfo = {
        XM1: XM1,
        unique_id: randomString(16).toLowerCase(),
        session_id: genSessionID(),
        d1: genD1(),
        device_token: device_token
    }
    localStorage.setItem("deviceInfo", JSON.stringify(deviceInfo));
}



//1:UNKNOWN,2:UNKNOWN,3:1700409994122-14817512642040248,4:52251,5:msm8998|1900|8,6:D0:2F:5F:A3:A2:F5,7:"Tony Nghia",8:720x1356,9:passive,gps,network,10:1,11:TEdNQzIwMTcwNTA4MTA0MDAwNDk1NTM4AAAAAAAAAAA=,12:INITIALISING,13:1002,14:1700556662,16:0,17:1
//1:UNKNOWN,2:UNKNOWN,3:1700371917828-781069432338739537,4:52251,5:msm8998|1900|8,6:00:0A:F5:AA:0F:66,7:<unknown ssid>,8:720x1356,9:,10:1,11:TEdNQzIwMTcwNTA4MTA0MDAwNDk1NTM4AAAAAAAAAAA=,12:VGUARD_NOT_INITIALISED,13:2001,14:1700554601,16:0,17:1
var phoneModels = [
    'lge,LGM-V300L',
    'samsung,SM-G975F',
    'apple,iPhone 12',
    'huawei,P30 Pro',
    'xiaomi,Redmi Note 9',
    'google,Pixel 6',
    'oneplus,OnePlus 9 Pro',
    'oppo,Find X3 Pro',
    'vivo,V21',
    'motorola,Moto G Power',
    'nokia,Nokia 8.3',
    'sony,Xperia 1 III'
];