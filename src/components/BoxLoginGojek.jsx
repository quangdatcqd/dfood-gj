
import { Avatar, Container } from '@mui/material';
import { React, useState, useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GojekAPI from '../API/GojekAPI';
import { useSnackbar } from 'notistack';
import InputBox from './InputBox';
import { NavLink } from 'react-router-dom';
import { generateID } from '../common';
const BoxLoginGojek = (props) => {
    const { setToggleLogin } = props;



    const [loading, setLoading] = useState(false);
    const [ipAddress, setIpAddress] = useState("Kiểm tra");
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [loadingROTP, setLoadingROTP] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [APIKey, setAPIKey] = useState(localStorage.getItem("api_key"));
    const [logginStatus, setLogginStatus] = useState("");
    const [OTP, setOTP] = useState("");
    const [otpToken, setOTPToken] = useState("");
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const onOTPChange = (e) => {
        setOTP(e.target.value)
    };
    const onPhoneChange = (e) => {
        setPhoneNumber(e.target.value)
    };

    useEffect(() => {
        checkIPAddress();

    }, []);
    const fetchToken = async () => {
        setLogginStatus("");
        generateID();

        try {
            localStorage.setItem("api_key", APIKey);
            setLoading(true);
            var data = await GojekAPI.getNumberVOTP(APIKey);

            if (data?.success) {
                // localStorage.setItem("G-Token", data?.access_token);
                // setToggleLogin(false);

                enqueueSnackbar(data?.message + " " + data.data?.re_phone_number, { variant: 'success' });
                var phone_number = data.data?.phone_number;
                var token = await requestOTP(phone_number);


                if (token.length >= 2) {
                    let count = 0;
                    mainloop:
                    while (true) {


                        var datav = await GojekAPI.getOTPVOTP(APIKey, data.data?.request_id);
                        if (datav?.success && datav?.data?.Code !== null) {
                            verifyPhone(datav?.data?.Code, token, phone_number);
                            enqueueSnackbar("Lấy được OTP " + datav?.data?.Code, { variant: 'success' });
                            break mainloop;
                        } else {
                            if (count >= 15) {
                                setLoading(false);
                                setLogginStatus("Không có otp bấm lấy lại đi!")
                                throw new Error(
                                    "Không có otp bấm lấy lại đi!"
                                )
                            }
                            await new Promise(resolve => setTimeout(resolve, 2000));
                            count++;
                        }

                    }




                } else {
                    setLoading(false);
                    throw new Error(
                        "Không có token!"
                    )
                }

            } else {
                setLoading(false);
                throw new Error(
                    data?.message || "Không phản hồi!"
                )


            }
        } catch (error) {
            setLoading(false);

            enqueueSnackbar(error.message, { variant: 'error' });
        } finally {

        }
    }

    const requestOTP = async (number = "") => {
        setLoading(true);
        setLogginStatus("")
        var numberPhone = phoneNumber;
        if (number != "") {
            numberPhone = number;

        }
        else {

            setLoadingROTP(true);
            generateID();
        }
        try {

            let data = await GojekAPI.checkPhoneHas(numberPhone);

            if (data?.success) {

                if (!data?.data?.additional_methods_required) {
                    data = await GojekAPI.Methods(numberPhone);
                    if (data?.success) {
                        data = await GojekAPI.Initiate(numberPhone, data?.data?.verification_id);
                        if (data?.success) {

                            setOTPToken(() => data?.data?.otp_token);
                            enqueueSnackbar("Đã gửI yêu cầu OTP!", { variant: 'success' });
                            number != "" && setLoadingROTP(false);
                            return data?.data?.otp_token;
                        }
                        else {
                            throw new Error(
                                data?.errors ? data?.errors[0]?.message_title : "Không phản hồi!"
                            );
                        }
                    }
                    else {
                        throw new Error(
                            data?.errors ? data?.errors[0]?.message_title : "Không phản hồi!"
                        );
                    }

                } else {
                    throw new Error(
                        "Số điện thoại này đã được sử dụng!"
                    );
                }

                // setOTPToken(data?.data?.otp_token);
            } else {
                throw new Error(
                    data?.errors ? data?.errors[0]?.message_title : "Không phản hồi!"
                );
            }

        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
            setLoading(false);
        } finally {
            setLoadingROTP(false);


        }
    };
    const verifyPhone = async (otpv = "", otp_tokenv = "", phone_numberv = "") => {
        try {
            var otp = OTP;
            var otp_token = otpToken;
            var phone_number = phoneNumber;
            if (otpv != "" && otp_tokenv != "", phone_numberv != "") {

                otp = otpv;
                otp_token = otp_tokenv;
                phone_number = phone_numberv;
            } else setLoadingSubmit(true);


            if (otp.length !== 4) {
                throw new Error("Kiểm tra lại OTP 4 số :" + otp)
            }
            if (otp_token.length <= 4) {

                throw new Error("Chưa yêu cầu OTP!")
            }
            var data = await GojekAPI.verifyPhone(otp_token, otp);
            if (data?.success) {
                register(phone_number, data?.data?.verification_token);
            } else {
                // console.log(data);

            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
            setLoading(false);
        } finally {
            setLoadingSubmit(false);
        }
    }
    const register = async (phoneNumber, token) => {
        try {
            var data = await GojekAPI.register(phoneNumber, token);
            if (data?.success) {
                localStorage.setItem("userInfo", JSON.stringify(data?.data?.customer));
                localStorage.setItem("G-Token", data?.data?.access_token);

                refreshToken(data?.data?.access_token, data?.data?.refresh_token, data?.data?.customer?.id);

            } else {
                throw new Error(
                    data?.errors ? data?.errors[0]?.message_title : "Không phản hồi!"
                );
            }
        } catch (error) {
            setLoading(false);
            throw new Error(error.message);

        } finally {
            setLoadingSubmit(false);
        }
    }

    const refreshToken = async (access_token, refresh_token, user_uid) => {
        try {
            var data = await GojekAPI.refreshToken(access_token, refresh_token, user_uid);
            data = await GojekAPI.refreshToken(data?.access_token, data?.refresh_token, data);
            if (data?.access_token) {
                localStorage.setItem("G-Token", data?.access_token);
                localStorage.setItem("R-Token", data?.refresh_token);

                // setToggleLogin(false);

                setLogginStatus("Đã đăng nhập thành công!");
                enqueueSnackbar("Đã lấy được token", { variant: 'success' });
                handleSelectAddress();
            } else {
                setLoadingSubmit(false);
                throw new Error(
                    data?.errors ? data?.errors[0]?.message_title : "Không phản hồi!"
                );
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        } finally {

        }
    }

    const checkIPAddress = async () => {
        var data = await GojekAPI.test();
        setIpAddress(data?.ip)
        enqueueSnackbar(data?.ip, { variant: 'success' })
    }
    const handleSelectAddress = async () => {


        try {
            var id = JSON.parse(localStorage.getItem("customerLoc")).placeid;
            var data = await GojekAPI.setAddress(id);
        } catch (error) {

        }
        finally {
            setLoadingSubmit(false);
            setLoading(false);
        }

    }

    return (
        <Container component="main" maxWidth="xs"
            style={{
                width: "100%",
                minHeight: "100vh",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: "20px",
                backgroundColor: "#fafff4bf"

            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'success.dark' }}>
                <LockOutlinedIcon />
            </Avatar>
            <div className='mb-2 w-100  '>
                <InputBox
                    placeholder={"API đăng nhập nhanh"}
                    onChange={(e) => setAPIKey(e.target.value)}
                    value={APIKey}
                    type={"text"} />
            </div>
            <LoadingButton
                size="small"
                onClick={fetchToken}
                loading={loading}
                loadingIndicator="Đợi.."
                variant="contained"
                color='warning'
            >
                ĐĂNG NHẬP NHANH
            </LoadingButton>

            <h6 style={{
                fontWeight: "bold",
                margin: "10px"
            }}>Hoặc là</h6>

            <div
                style={{
                    width: "100%"
                }}
            >
                <div
                    style={{
                        width: "100%",
                        position: "relative"
                    }}

                >
                    <div
                        style={{
                            position: "absolute",
                            right: "0px",
                            top: "0px",
                            height: "100%",
                            backgroundColor: "rgb(255 251 240)",
                            textAlign: "center",

                            fontSize: "16px",
                            fontWeight: "bold",
                            borderTopRightRadius: "20px",
                            borderBottomRightRadius: "20px",
                            color: "gray",
                            cursor: "pointer"

                        }}

                    // onClick={requestOTP}
                    >
                        <LoadingButton
                            size="small"
                            style={{
                                height: "100%",
                                width: "100%",
                                borderTopRightRadius: "20px",
                                borderBottomRightRadius: "20px",
                            }}
                            loading={loadingROTP}
                            loadingIndicator="Đợi.."
                            variant="contained"
                            color="success"
                            onClick={() => requestOTP()}
                        >
                            Gửi mã
                        </LoadingButton>

                    </div>

                    {/* <div
                        style={{
                            position: "absolute",
                            right: "70px",
                            top: "0px",
                            height: "100%",
                            textAlign: "center",

                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "gray",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",


                        }}

                    // onClick={requestOTP}
                    >
                        <HighlightOffIcon sx={{ fontSize: "24pt" }} />
                    </div> */}
                    <InputBox placeholder={"Nhập số điện thoại"}
                        onChange={onPhoneChange}
                        value={phoneNumber}
                        type={"number"} />
                </div>
                <div
                    style={{
                        width: "100%",
                        position: "relative",
                        marginTop: "20px"
                    }}

                >
                    <div style={{
                        position: "absolute",
                        right: "0px",
                        top: "0px",
                        height: "100%",
                        backgroundColor: "rgb(255 251 240)",
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: "bold",
                        borderTopRightRadius: "20px",
                        borderBottomRightRadius: "20px",
                        color: "gray",
                        cursor: "pointer"

                    }}

                    >
                        <LoadingButton
                            size="small"
                            style={{
                                height: "100%",
                                width: "100%",
                                borderTopRightRadius: "20px",
                                borderBottomRightRadius: "20px",
                            }}
                            loading={loadingSubmit}
                            loadingIndicator="Đợi.."
                            variant="contained"
                            color="success"
                            onClick={() => verifyPhone()}
                        >
                            Submit
                        </LoadingButton>
                    </div>
                    <InputBox placeholder={"Nhập OTP"} onChange={onOTPChange} value={OTP} type={"number"} />
                </div>
            </div>
            <p style={{
                fontSize: "12pt",
                color: "red",
                margin: "5px",
                fontWeight: "bold"
            }}>
                {logginStatus}
            </p>
            <div style={
                {
                    marginTop: "10px",
                    fontSize: "20px",
                    fontWeight: "bolder",
                    color: "orange",
                    cursor: "pointer"
                }} onClick={checkIPAddress}>
                {ipAddress}
            </div>




            {
                !loading &&


                <div style={
                    {
                        marginTop: "20px",
                        fontSize: "20px",
                        fontWeight: "bolder"
                    }
                }>
                    <NavLink to={"/home"}>Đến với FOOD</NavLink>
                </div>
            }
        </Container >
    );
}

export default BoxLoginGojek;



// const fetchToken = async () => {

//     try {
//         setLoading(true);
//         var data = await GojekAPI.getToken();
//         if (data?.access_token) {
//             localStorage.setItem("G-Token", data?.access_token);
//             setToggleLogin(false);
//             enqueueSnackbar("Đã lấy được token", { variant: 'success' })
//         } else {
//             throw new Error(
//                 data?.errors ? data?.errors[0]?.message_title : "Không phản hồi!"
//             )
//         }
//     } catch (error) {
//         enqueueSnackbar(error.message, { variant: 'error' });
//     } finally {
//         setLoading(false)
//     }
// }

// const requestOTP = async () => {
//     setLoadingROTP(true);

//     try {
//         if (phoneNumber.length >= 9 && phoneNumber.length <= 11) {
//             const data = await GojekAPI.requestOTP(phoneNumber);
//             if (data?.success) {
//                 setOTPToken(data?.data?.otp_token);
//                 enqueueSnackbar(data?.data?.message, { variant: 'success' });
//             } else {
//                 throw new Error(
//                     data?.errors ? data?.errors[0]?.message_title : "Không phản hồi!"
//                 );
//             }
//         } else {
//             throw new Error("Hãy kiểm tra lại số điện thoại!");
//         }
//     } catch (error) {
//         enqueueSnackbar(error.message, { variant: 'error' });
//     } finally {
//         setLoadingROTP(false);
//     }
// };
// const verifyPhone = async () => {
//     try {
//         setLoadingSubmit(true);
//         if (OTP.length !== 4) {
//             throw new Error("Kiểm tra lại OTP 4 số!")
//         }
//         if (otpToken.length <= 4) {
//             throw new Error("Chưa yêu cầu OTP!")
//         }
//         var data = await GojekAPI.verifyPhone(otpToken, OTP);
//         if (data?.success) {
//             register(phoneNumber, data?.data?.signup_request_user?.phone_verification_token);
//         } else {
//             throw new Error(
//                 data?.errors ? data?.errors[0]?.message_title : "Không phản hồi!"
//             );
//         }
//     } catch (error) {
//         enqueueSnackbar(error.message, { variant: 'error' });

//     } finally {
//         setLoadingSubmit(false);
//     }
// }
// const register = async (phoneNumber, token) => {
//     try {
//         var data = await GojekAPI.register(phoneNumber, token);
//         if (data?.success) {
//             localStorage.setItem("userInfo", JSON.stringify(data?.data?.customer));
//             refreshToken(data?.data?.access_token, data?.data?.refresh_token, data?.data?.customer?.id);
//         } else {
//             throw new Error(
//                 data?.errors ? data?.errors[0]?.message_title : "Không phản hồi!"
//             );
//         }
//     } catch (error) {
//         throw new Error(error.message);
//     } finally {
//         setLoadingSubmit(false);
//     }
// }

// const refreshToken = async (access_token, refresh_token, user_uid) => {
//     try {
//         var data = await GojekAPI.refreshToken(access_token, refresh_token, user_uid);
//         if (data?.access_token) {
//             localStorage.setItem("G-Token", data?.access_token);
//             localStorage.setItem("R-Token", data?.refresh_token);
//             enqueueSnackbar("Đã lấy được token", { variant: 'success' });
//             handleSelectAddress();
//             setToggleLogin(false);


//         } else {
//             setLoadingSubmit(false);
//             throw new Error(
//                 data?.errors ? data?.errors[0]?.message_title : "Không phản hồi!"
//             );
//         }
//     } catch (error) {
//         enqueueSnackbar(error.message, { variant: 'error' });
//     } finally {
//         setLoadingSubmit(false);
//     }
// }