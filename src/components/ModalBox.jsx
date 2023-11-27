import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import './style.css'
import { useMediaQuery } from '@mui/material';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalBox(props) {
    const { open, setOpen, children, title, fulls, fullWidth, maxWidth, useCloseBar } = props;
    const useCloseDialogBar = useCloseBar === false ? false : true;

    const fullScreen = useMediaQuery("(max-width:600px)")
    return (
        <Dialog
            fullScreen={fulls || fullScreen}
            open={open}
            onClose={() => setOpen(false)}
            TransitionComponent={Transition}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
        >{
                useCloseDialogBar &&
                <div className='CPNBarDialog' onClick={() => setOpen(false)} >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <p className='titleDialog'  > {title}</p>
                </div>
            }
            {
                children
            }

        </Dialog>
    );
}