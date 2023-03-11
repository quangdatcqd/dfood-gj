import { React, useState, useLayoutEffect, Children } from 'react';
import { Container } from '@mui/material';


import { NavLink } from 'react-router-dom';
import InputBox from '../components/InputBox';
import { LoadingButton } from '@mui/lab';
import GojekAPI from '../API/GojekAPI';

const CheckUserValid = ({ children }) => {
    const [loading, setloading] = useState(false);
    const [trustAuth, setTrustAuth] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [password, setPassword] = useState(localStorage.getItem("password"));
    const [statusMessage, setStatusMessage] = useState("");
    const onChangePassword = (e) => {
        setPassword(e.target.value)

    }
    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }
    useLayoutEffect(() => {
        handleSubmit();

    }, []);
    const handleSubmit = async () => {
        setloading(true)
        try {
            var data = await GojekAPI.checkPassword(password);
            if (data == 1) {
                localStorage.setItem("password", password);
                localStorage.setItem("username", username);
                setStatusMessage("Thành công! đang chuyển hướng.")
                setTrustAuth(true)
            } else {
                setStatusMessage("Mật khẩu Không đúng !")
            }
        } catch (error) {

        } finally {
            setloading(false)

        }

    }
    return (
        <div>
            {
                trustAuth ?
                    children
                    :

                    < Container component="main" maxWidth="xs"
                        style={{
                            marginTop: "50px"
                        }
                        }
                    >
                        <p>{statusMessage}</p>
                        <div
                            style={{
                                textAlign: "center",
                                marginTop: "10px"
                            }}>
                            <InputBox placeholder="Nhập Tên của bạn" type="text" onChange={onChangeUsername} value={username} />
                        </div>
                        <div
                            style={{
                                textAlign: "center",
                                marginTop: "10px"
                            }}>
                            <InputBox placeholder="Nhập mật khẩu" type="text" onChange={onChangePassword} value={password} />
                        </div>
                        <div
                            style={{
                                textAlign: "center",
                                marginTop: "10px"
                            }}
                        >
                            <LoadingButton
                                size="small"
                                onClick={handleSubmit}
                                loading={loading}
                                loadingIndicator="Đợi.."
                                variant="contained"
                                sx={{
                                    padding: "10px 50px"
                                }}

                            >
                                XÁC THỰC
                            </LoadingButton>
                        </div>

                    </Container >
            }
        </div>
    );
}
export default CheckUserValid;
