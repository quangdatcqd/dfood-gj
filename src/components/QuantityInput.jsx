import { Button, IconButton, TextField } from '@mui/material';
import { React, useState, useContext, useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useSnackbar } from 'notistack';
import ChoseOptions from './ChoseOptions';
import { CartContext } from '../Contexts/CartContext';
const QuantityInput = (props) => {
    const contexts = useContext(CartContext);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { data } = props;
    const [selectedItems, setselectedItems] = useState();
    const [toggleOption, setToggleOption] = useState(false);
    const [quantity, setQuantity] = useState(0);
    // console.log(data) /

    useEffect(() => {
        var index = contexts.payload?.items?.findIndex((payloadId) => {
            return payloadId?.uuid === data?.id;
        });
        // console.log(index)
        if (index >= 0) {
            setQuantity(contexts.payload?.items[index]?.quantity);
        }
    }, [contexts.payload]);

    const handleDelete = () => {

        if (quantity < 1) {
            enqueueSnackbar("Đã xoá món này!", {
                variant: 'warning'
            });
            setQuantity(0);
            contexts.handleDeleteItem(
                {
                    itemId: data?.shopping_item_id,
                    itemName: data?.name,
                    notes: "",
                    price: data?.price,
                    promoId: data?.promotion?.id,
                    quantity: quantity,
                    uuid: data?.id,
                    promoPrice: data?.promotion?.selling_price
                }
            );
        }
        else {
            setQuantity(quantity - 1);
            contexts.handleDeleteItem(
                {
                    itemId: data?.shopping_item_id,
                    itemName: data?.name,
                    notes: "",
                    price: data?.price,
                    promoId: data?.promotion?.id,
                    quantity: quantity - 1,
                    uuid: data?.id,
                    promoPrice: data?.promotion?.selling_price
                }
            );
        }




    }
    const handleAdd = () => {

        if (data?.variant_category_ids === null) {
            setQuantity(quantity + 1);

            contexts.handleSelectItem(
                {
                    itemId: data?.shopping_item_id,
                    itemName: data?.name,
                    notes: "",
                    price: data?.price,
                    promoId: data?.promotion?.id,
                    quantity: quantity + 1,
                    uuid: data?.id,
                    promoPrice: data?.promotion?.selling_price
                }
            );

        } else {
            setToggleOption(true);
        }
    }


    return (
        <div >
            {toggleOption && <ChoseOptions toggleOption={toggleOption} settoggleOption={setToggleOption} setselectedItems={setselectedItems} data={data} />}
            {(data?.variant_category_ids === null) ?
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
                            size="small"  >

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
                :
                <div
                    style={{
                        position: "absolute",
                        right: "5px",
                        bottom: "5px",
                        height: "35px",
                        display: "flex",
                        alignItems: "center",


                    }}
                >
                    <span style={{ marginRight: "5px", color: "red" }}>Tuỳ chọn</span>
                    <Button onClick={handleAdd} variant="outlined" style={{ outline: "none", padding: "0px 8px", borderRadius: "15px" }}>
                        Thêm
                    </Button>
                </div>
            }
        </div >
    );
}

export default QuantityInput;
