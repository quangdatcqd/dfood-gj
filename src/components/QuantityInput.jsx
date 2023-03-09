import { IconButton } from '@mui/material';
import { React } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const QuantityInput = (props) => {

    const { handleAdd, handleDelete, quantity } = props;


    return (
        <div style={{
            position: "absolute",
            right: "5px",
            bottom: "5px",
            height: "35px",
            display: "flex",
            alignItems: "center",


        }} >
            <div
                onClick={handleDelete}
            >
                <IconButton
                    size="small"
                >
                    <RemoveCircleOutlineIcon
                        style={{
                            fontSize: "26px",
                            color: "red"
                        }} />
                </IconButton>
            </div>
            <p style={{
                margin: "0px", fontSize: "18px", fontWeight: "bolder",
            }}>{quantity}</p>

            <div
                onClick={handleAdd}
            >
                < IconButton >
                    <AddCircleOutlineIcon
                        style={{
                            fontSize: "26px",
                            color: "green"
                        }} />
                </IconButton>
            </div>
        </div >
    );
}

export default QuantityInput;
