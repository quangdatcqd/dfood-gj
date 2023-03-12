import { LoadingButton } from '@mui/lab';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, TextareaAutosize } from '@mui/material';
import { Container } from '@mui/system';
import { React, useState } from 'react';

const CancelOrder = ({ idOrder, setToggle, toggle }) => {
    const [loadingBtnCancel, setLoadingBtnCancel] = useState(false);
    return (
        <Container>
            <Dialog
                open={toggle}
                onClose={() => setToggle(false)}
                scroll={"paper"}
                cx={{ margin: "0px", width: "400px" }}

            >
                <DialogTitle id="scroll-dialog-title">Huỷ đơn hàng
                </DialogTitle>
                <DialogContent style={{ height: "500px", backgroundColor: "rgb(255 239 239)", paddingTop: "10px" }}  >
                    <div>
                        <LoadingButton
                            size="small"
                            loading={loadingBtnCancel}
                            loadingIndicator="Đợi.."
                            variant="contained"
                            color='warning'
                            sx={{
                                padding: "5px 20px"
                            }}
                        // onClick={() => setToggleLogin(true)}
                        > Huỷ đơn với lí do thay đổi món</LoadingButton>
                    </div>




                </DialogContent>


            </Dialog >
        </Container>
    );
}

export default CancelOrder;
