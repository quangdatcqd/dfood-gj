import { Box, Container, Dialog, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { React, useEffect, useState, useRef } from 'react';
import { TextareaAutosize } from '@mui/base';
import { ChatAPI, GojekAPI } from '../API/GojekAPI';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';

// var customer = "";
const ChatBox = (props) => {
    const { setToggleChat, makeCancel, idOrder, channelID } = props;

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [allMessages, setAllMessages] = useState([]);
    const [idChannel, setIdChannel] = useState(channelID);
    const [message, setMessage] = useState("");
    const [customer, setCustomer] = useState("");
    const [loadingCancel, setLoadingCancel] = useState(false);
    let idchannel;

    const timerChat = useRef()


    useEffect(() => {

        const getMembers = async (id) => {
            var messages = await ChatAPI.getMemberChat(id);

            messages?.data?.members?.map((item) => {

                // console.log("ngu", item?.owner_type == "customer" ? item?.id : "")
                if (item?.owner_type == "customer") {
                    setCustomer(item?.id);
                    return "";
                }
                if (customer != undefined) {
                    getMessages(id);
                }
            })
        }
        const getChannelId = async () => {
            try {
                var data = await ChatAPI.getChannelChat(idOrder);

                if (data?.success) {
                    idchannel = data?.data?.channel_id;
                    setIdChannel(data?.data?.channel_id);
                    // console.log("idChannel", idChannel)
                    getMembers(data?.data?.channel_id);
                    return idchannel;
                } else {
                    throw new Error(data?.errors ? data?.errors[0]?.message_title : "Không phản hồi!")
                }
            } catch (error) {
                enqueueSnackbar(error.message, { variant: 'error' });

            }
        }


        const fetchChat = async () => {
            if (idOrder != undefined) {
                let idchannel = null;
                if (channelID == "") {
                    idchannel = await getChannelId();
                } else {
                    idchannel = channelID;
                    await getMembers(idchannel);
                    getMessages(idchannel);
                }
                if (idchannel?.length >= 10) {
                    timerChat.current = setInterval(() => {
                        getMessages(idchannel);
                    }, 10000);

                }
            }
        }
        fetchChat();
        return () => clearInterval(timerChat.current);
    }, []);

    const handleCancel = () => {
        setLoadingCancel(true)
        makeCancel();
        setLoadingCancel(false)
    }
    const getMessages = async (id) => {
        var messages = await ChatAPI.getAllChat(id);
        var res = messages?.data?.reduceRight(function (arr, last, index, coll) {
            return (arr = arr.concat(last))
        }, []);
        setAllMessages(res);
    }
    const sendMessage = async () => {

        var data = await ChatAPI.sendMessage(idChannel, message);
        if (data?.success) {
            setMessage("");
        }
    }
    return (
        <Container style={{ marginTop: "50px" }}>
            <Dialog
                open={true}
                onClose={() => setToggleChat(false)}
                scroll={"paper"}
                cx={{ margin: "0px", width: "400px" }}

            >
                <DialogTitle id="scroll-dialog-title">{channelID == "" ? "Nhắn tin với tài xế" :
                    <LoadingButton
                        size="small"
                        loading={loadingCancel}
                        loadingIndicator="Đợi.."
                        variant="contained"
                        color='success'
                        onClick={() => handleCancel()}
                    >
                        Yêu cầu huỷ đơn tiếp
                    </LoadingButton>
                }
                </DialogTitle>
                <DialogContent style={{ height: "500px", backgroundColor: "rgb(61 61 61)", paddingTop: "10px" }}  >

                    {
                        allMessages?.map((item, key) => {
                            // console.log(customer)
                            return (

                                item?.sender?.id == customer ?
                                    (<Box key={key} style={{ position: "relative", width: "100%", backgroundColor: "rgb(132 255 240)", wordWrap: "break-word", fontSize: "16px", padding: "5px 10px", borderRadius: "5px", marginBottom: "5px" }}>
                                        <div style={{
                                            clipPath: "polygon(0 0, 100% 50%, 0 100%)", position: "absolute", top: "0px", right: "-20px", width: "30px", height: "30px", backgroundColor: "rgb(132 255 240)"
                                        }}></div>

                                        {item?.text}
                                    </Box>)
                                    :

                                    <Box key={key} style={{ position: "relative", width: "100%", backgroundColor: "white", wordWrap: "break-word", fontSize: "16px", padding: "5px 10px", borderRadius: "5px", marginBottom: "5px" }}>
                                        <div style={{
                                            clipPath: "polygon(100% 34%, 54% 45%, 100% 55%)", position: "absolute", clipPath: "polygon(100% 0, 0 50%, 100% 100%)", position: "absolute", top: "2px", left: "-20px", width: "30px", height: "30px", backgroundColor: "white"
                                        }}></div>
                                        {item?.text}


                                    </Box>


                            )
                        })
                    }



                </DialogContent>
                <Box style={{ backgroundColor: "rgb(61, 61, 61)", width: "calc(100%-20px)" }}>

                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            backgroundColor: "white",

                            padding: "10px 0px 7px 10px  "
                        }}
                    >
                        <TextareaAutosize onChange={(e) => setMessage(e.target.value)} value={message} style={{ width: "100%", resize: "none", outline: "none", backgroundColor: "rgb(244 244 244)", border: "0px solid #ff0086", padding: "2px 5px", borderRadius: "8px", fontSize: "13pt" }} />
                        <IconButton onClick={sendMessage} style={{ borderRadius: "5px", color: "green", padding: "2px" }}  >
                            <SendIcon />
                        </IconButton>
                    </div>
                </Box>

            </Dialog >
        </Container >
    );
}

export default ChatBox;
