import { IconButton, TextField } from '@mui/material';
import { React, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useSnackbar } from 'notistack';
import ChoseOptions from './ChoseOptions';
const QuantityInput = (props) => {

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { data, } = props;
    const [quantity, setQuantity] = useState(0);
    const [toggleOption, setToggleOption] = useState(false);


    const handleDelete = () => {
        if (quantity <= 0) {
            enqueueSnackbar("Đã xoá món này!", {
                variant: 'warning'
            });
            setQuantity(0);
        } else {
            setQuantity(quantity - 1);
        }


    }
    const handleAdd = () => {
        if (data?.variant_category_ids === null) {
            setQuantity(quantity + 1);
        } else {
            setToggleOption(true);
        }


        const handleClose = () => {
            setToggleOption(false);
        };
    }
    return (
        <div style={{
            position: "absolute",
            right: "5px",
            bottom: "5px",
            height: "35px",
            display: "flex",
            alignItems: "center",


        }}>
            <ChoseOptions toggleOption={toggleOption} settoggleOption={setToggleOption} data={data} />
            {data?.variant_category_ids != null ? "Tuỳ chọn" : ""}
            <IconButton
                size="small" onClick={handleDelete}  >

                <RemoveCircleOutlineIcon

                    style={{

                        fontSize: "26px",
                        color: "red"
                    }} />
            </IconButton>
            <input type="text" value={quantity} style={{ width: "25px", height: "25px", fontSize: "18px", fontWeight: "bolder", textAlign: "center", outline: "none", padding: "2px", border: "none" }} />
            <IconButton>


                <AddCircleOutlineIcon
                    onClick={handleAdd}
                    style={{

                        fontSize: "26px",
                        color: "green"
                    }} />
            </IconButton>
        </div>
    );
}

export default QuantityInput;
