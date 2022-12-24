import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Paper } from '@mui/material';
import React from 'react';

import OptionsMoreRadio from './OptionsMoreRadio';
const ChoseOptions = (props) => {

    const { settoggleOption, toggleOption, data } = props;

    const handleClose = () => {
        settoggleOption(false);
    };


    return (
        <div>
            <Dialog
                open={toggleOption}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Lựa món kèm"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        {
                            data?.variant_categories?.map((item, key) => {


                                if (item?.rules?.selection?.type === "SELECT_ONE") return (<OptionsMoreRadio data={item} />)



                                // return (<OptionsMoreRadio />)
                            })
                        }

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}



export default ChoseOptions;
