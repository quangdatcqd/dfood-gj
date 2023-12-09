import React, { useState, useEffect } from 'react';
import './style.css';
import { Avatar, FormControl, IconButton, TextField, useMediaQuery } from '@mui/material';
import { useSnackbar } from 'notistack';
import LoadingButton from '@mui/lab/LoadingButton';
import { AuthAPI, GojekAPI } from '../../../../API/GojekAPI';
import OTPInput from 'react-otp-input';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Dialog from "@mui/material/Dialog";
import { useRef } from 'react';
import { generateID, randomString } from '../../../../common';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const Login = ({ setOpen, open }) => {

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [formType, setFormType] = useState("CHECK");
    const [phoneNumberError, setPhoneNumberError] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState(randomString(10) + "@gmail.com");
    const [emailError, setEmailError] = useState("");
    const [OTPCode, setOTPCode] = useState("");
    const [otpError, setOTPError] = useState("");
    const [name, setName] = useState("Obama");
    const [nameError, setNameError] = useState("");
    const [countdown, setCountdown] = useState(0);
    const [verificationId, setVerificationId] = useState(null);
    const [otpToken, setOtpToken] = useState(null);

    const [loading, setLoading] = useState(false);
    // const tokenRequest = useRef("");
    const timoutCD = useRef();
    const matches = useMediaQuery('(max-width:500px)');
    const handleRequestOTP = async () => {
        clearTimeout(timoutCD.current)
        const dataRequestOTP = await AuthAPI.requestOTP(phoneNumber);
        setOTPCode("")
        setCountdown(60)
    }
    useEffect(() => {
        timoutCD.current = setTimeout(() => {
            setCountdown(countdown - 1);
        }, 1000);
        if (countdown <= 0) clearTimeout(timoutCD.current)
        return () => clearTimeout(timoutCD.current);
    }, [countdown]);

    const validForm = async () => {
        let message = "";
        if (name?.length < 1) {
            message = "Tên tối thiểu 1 ký tự!";
            setNameError(message);
            return false;
        }
        if (email?.length < 6) {
            message = "Emai tối thiểu 6 ký tự!";
            setEmailError(message);
            return false;
        }
        return true;
    }
    const handleCheckPhone = async () => {
        try {
            setLoading(true);
            const checkPhoneData = await AuthAPI.LoginMethod(phoneNumber);
            if (checkPhoneData?.success) {
                confirmAlert({
                    title: 'Lưu ý',
                    message: "Số điện thoại đă được đăng ký! \n Bạn có muốn tiếp tục đăng nhập!",
                    buttons: [{
                        label: 'Đóng',
                        onClick: () => { },
                    },
                    {
                        label: 'Tiếp tục',
                        onClick: async () => {
                            // LOGIN
                            const requestOTP = await AuthAPI.Initiate(phoneNumber, checkPhoneData?.data?.verification_id, "login_1fa")
                            setOtpToken(requestOTP?.data?.otp_token);
                            setVerificationId(checkPhoneData?.data?.verification_id)
                            setFormType("LOGIN");
                        }

                    }
                    ],
                    overlayClassName: "dlgLogin"
                });
            }
            else if (checkPhoneData?.errors[0]?.code === "auth:error:user:not_found") {
                //REGISTER
                const dataMethod = await AuthAPI.Methods(phoneNumber);
                if (dataMethod?.success) {
                    const requestOTPData = await AuthAPI.Initiate(phoneNumber, dataMethod?.data?.verification_id)
                    if (requestOTPData?.success) {
                        setOtpToken(requestOTPData?.data?.otp_token);
                        setVerificationId(dataMethod?.data?.verification_id)
                        setFormType("REGISTER");
                    } else {
                        throw new Error(
                            requestOTPData?.errors ? requestOTPData?.errors[0]?.message_title : "Không phản hồi!"
                        );
                    }


                }
                else {
                    throw new Error(
                        dataMethod?.errors ? dataMethod?.errors[0]?.message_title : "Không phản hồi!"
                    );
                }
            }
            else if (checkPhoneData?.errors?.length > 0) {
                throw new Error(
                    checkPhoneData?.errors ? checkPhoneData?.errors[0]?.message : "Không phản hồi!"
                );
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
            setLoading(false);
        } finally {
            setLoading(false);

        }
    }

    const handleGetRegister = async () => {
        try {
            const checkValid = validForm();
            if (!checkValid) {
                return;
            }

            var verifyData = await AuthAPI.verifyPhone(verificationId, otpToken, OTPCode);
            if (verifyData?.success) {
                var dataregister = await AuthAPI.register(phoneNumber, verifyData?.data?.verification_token, name, email);
                if (dataregister?.success) {
                    localStorage.setItem("userInfo", JSON.stringify(dataregister?.data?.customer));

                    const accessToken = await refreshToken(dataregister?.data?.access_token, dataregister?.data?.refresh_token);
                    let count = 0;
                    while (true) {
                        count++;
                        var getVC = await GojekAPI.getVoucher(accessToken);
                        if (getVC?.success) {
                            var indexVC = getVC?.data?.findIndex((element) => element?.sponsor_name === "GoFood");

                            if (indexVC >= 0) {
                                localStorage.setItem("idVoucher", getVC?.data[indexVC]?.code);
                                enqueueSnackbar("Lấy được mã giảm giá!", { variant: 'success' });
                                window.location.reload();
                                break;
                            }
                        }
                        if (count >= 20) {
                            enqueueSnackbar("Không có mã giảm giá!", { variant: 'success' });
                            break;
                        }
                    }
                    enqueueSnackbar("Xong!", { variant: 'success' });
                    handleSelectAddress();


                } else {
                    throw new Error(
                        dataregister?.errors ? dataregister?.errors[0]?.message_title : "Không phản hồi!"
                    );
                }
            } else {
                // console.log(data);
                throw new Error(
                    verifyData?.errors ? verifyData?.errors[0]?.message : "Không phản hồi!"
                );
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        } finally {
            setLoading(false)

        }

    }

    const handleGetLogin = async () => {
        try {
            var verifyData = await AuthAPI.verifyPhone(verificationId, otpToken, OTPCode, "login_1fa");
            if (verifyData?.success) {
                var data = await AuthAPI.accountList(verifyData?.data?.verification_token);
                if (data?.success) {
                    getTokenLogin(data?.data['1fa_token'], data?.data?.account_list[0]?.account_id);
                } else {
                    throw new Error(
                        data?.errors ? data?.errors[0]?.message_title : "Không phản hồi!"
                    );
                }
            } else {
                // console.log(data);
                throw new Error(
                    data?.errors ? data?.errors[0]?.message : "Không phản hồi!"
                );
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }
        finally {
            setLoading(false)
        }

    }
    const handleSubmit = async () => {
        setLoading(true)
        if (formType === "CHECK") {
            await handleCheckPhone();
        }
        if (formType === "LOGIN") {
            await handleGetLogin();
        }
        if (formType === "REGISTER") {
            await handleGetRegister();
        }
    }




    const refreshToken = async (access_token, refresh_token) => {
        try {
            var data = await AuthAPI.getTokenSignUp(access_token, refresh_token);
            data = await AuthAPI.getTokenSignUp(data?.data?.access_token, data?.data?.refresh_token);
            if (data?.success) {
                localStorage.setItem("G-Token", data?.data?.access_token);
                localStorage.setItem("R-Token", data?.data?.refresh_token);
                enqueueSnackbar("Đã đăng nhập", { variant: 'success' });
                handleSelectAddress();
                return data?.data?.access_token;
            } else {
                throw new Error(
                    data?.errors ? data?.errors[0]?.message_title : "Không phản hồi!"
                );
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        } finally {
            setLoading(false)
        }
    }


    async function getTokenLogin(token, user_uid) {
        try {
            var data = await AuthAPI.getToken(token, user_uid);

            if (data?.success) {
                localStorage.setItem("G-Token", data?.data?.access_token);
                localStorage.setItem("R-Token", data?.data?.refresh_token);
                enqueueSnackbar("Đã đăng nhập", { variant: 'success' });

                window.location.reload();
            } else {
                throw new Error(
                    data?.errors ? data?.errors[0]?.message_title : "Không phản hồi!"
                );
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        } finally {
            setLoading(false)
        }
    }
    const handeBackPress = () => {
        setFormType("CHECK")
        setOTPCode("")
        setEmail(randomString(10) + "@gmail.com")
        if (formType === "CHECK") setOpen(false)
    }
    return (
        <Dialog
            open={open}
            // onClose={() => setOpen(false)}
            fullScreen={matches}
            maxWidth={"xl"}
            className={"dlgLogin"}
        >

            <div className='boxLogin'>

                <p style={{ margin: "20px 0px 0px 0px" }} >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="close"
                        onClick={() => handeBackPress()}
                    >
                        <KeyboardBackspaceIcon sx={{ color: "rgb(201 100 0)", cursor: "pointer" }} />
                    </IconButton> </p>
                <p className='titleLogin'>  {formType === "REGISTER" ? "ĐĂNG KÝ" : "ĐĂNG NHẬP"}</p>
                <FormControl variant="standard" fullWidth={true} >
                    {
                        formType !== "CHECK" &&
                        <div className='boxOTPInput'>
                            <div className='divOTPInput'  >

                                <OTPInput
                                    value={OTPCode}
                                    onChange={setOTPCode}
                                    numInputs={4}
                                    renderInput={(props) => <input {...props} inputmode="numeric" placeholder='-' type='text' />}
                                />
                            </div>
                            <span style={{ fontSize: "12px", fontFamily: "sans-serif", color: "red", marginTop: "5px", textAlign: "center" }}>{otpError !== "" && otpError}</span>
                            <p  >
                                Chưa nhận được? <span style={{ cursor: "pointer", color: "#13C0BF" }} onClick={handleRequestOTP}> {countdown ? countdown : "Gửi lại"}</span>
                            </p>
                        </div>
                    }

                    {
                        formType === "REGISTER" &&
                        <>


                            <TextField id="standard-basic" label="Họ Tên"

                                error={nameError !== "" ?? true}
                                helperText={nameError}
                                variant="standard"
                                onChange={(e) => {
                                    setNameError("")
                                    setName(e.target.value)
                                }}
                                sx={{ marginTop: 1 }}
                                defaultValue={name} />
                            <TextField id="standard-basic" label="Email"
                                error={emailError !== "" ?? true}
                                helperText={emailError}
                                variant="standard"
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setEmailError("")
                                }}
                                sx={{ marginTop: 2 }}
                                defaultValue={email} />
                        </>
                    }

                    <TextField id="standard-basic" type="number"
                        disabled={formType !== "CHECK"}

                        label="Số Điện Thoại" error={phoneNumberError !== "" ?? true}
                        helperText={phoneNumberError} variant="standard" onChange={(e) => {
                            setPhoneNumber(e.target.value)
                            setPhoneNumberError("")
                        }}
                        defaultValue={phoneNumber}
                        sx={{ marginTop: 2 }} />



                    <LoadingButton
                        loading={loading}
                        loadingPosition="center"
                        variant="contained"
                        color="success"
                        sx={{ marginTop: 4, backgroundColor: "rgb(201 100 0)", color: "white", borderRadius: "500px" }}
                        onClick={() => handleSubmit()}
                    >
                        {formType === "REGISTER" ? "ĐĂNG KÝ" : "ĐĂNG NHẬP"}
                    </LoadingButton>

                </FormControl>
            </div>
            <div style={{ margin: "0 auto", marginBottom: "10px" }}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="close"
                    onClick={() => generateID()}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'rgb(201 100 0)', cursor: "pointer" }}  >
                        <AutorenewIcon />
                    </Avatar>
                </IconButton >
            </div>
        </Dialog >
    );
}




async function handleSelectAddress() {
    try {
        var id = JSON.parse(localStorage.getItem("customerLoc")).placeid;
        var data = await GojekAPI.setAddress(id);
    } catch (error) {

    }
    finally {
        return true;
    }
}



export default Login;
