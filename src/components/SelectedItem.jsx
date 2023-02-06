import { IconButton } from '@mui/material';
import { React, useContext, useState, } from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { CartContext } from '../Contexts/CartContext';
import ChoseOptions from './ChoseOptions';
import { fomatCurrency } from '../common';

const SelectedItem = (props) => {
    const { setToggleEditItems, data, setQuantity, toggleEditItems, dataVariants, indexItem, action } = props;
    const dataItem = action == 0 ? data?.variants[0] : data?.variants;

    const { selectedItems, handleSelectItem, handleDeleteItem, handleVariant } = useContext(CartContext);
    const [toggleEditOption, setToggleEditOption] = useState(false);
    const [quantityEdit, setQuantityEdit] = useState(action == 0 ? selectedItems[indexItem]?.quantity : data?.quantity);

    const handleAdd = () => {

        handleSelectItem(
            {
                itemId: dataVariants?.shopping_item_id,
                itemName: dataVariants?.name,
                notes: "",
                price: dataVariants?.price,
                promoId: dataVariants?.promotion?.id,
                quantity: quantityEdit + 1,
                uuid: dataVariants?.id,
                promoPrice: dataVariants?.promotion?.selling_price
            },
            quantityEdit + 1
        );
        setQuantityEdit(quantityEdit + 1);
    }

    const handleDelete = () => {

        if (quantityEdit <= 1) {
            setQuantityEdit(0)
            handleDeleteItem(
                {
                    itemId: dataVariants?.shopping_item_id,
                    itemName: dataVariants?.name,
                    notes: "",
                    price: dataVariants?.price,
                    promoId: dataVariants?.promotion?.id,
                    quantity: 0,
                    uuid: dataVariants?.id,
                    promoPrice: dataVariants?.promotion?.selling_price
                }
            );
        }
        else {

            handleDeleteItem(
                {
                    itemId: dataVariants?.shopping_item_id,
                    itemName: dataVariants?.name,
                    notes: "",
                    price: dataVariants?.price,
                    promoId: dataVariants?.promotion?.id,
                    quantity: quantityEdit - 1,
                    uuid: dataVariants?.id,
                    promoPrice: dataVariants?.promotion?.selling_price
                }
            );
            setQuantityEdit(quantityEdit - 1)
        }




    }

    return (
        <div style={{
            borderBottom: "dotted gray 1px", paddingBottom: "15px  "
        }}>

            {toggleEditOption && <ChoseOptions indexItem={indexItem} toggleOption={toggleEditOption} setToggleOption={setToggleEditOption} data={dataVariants} quantity={quantityEdit} setQuantity={setQuantityEdit} />}


            {

                <div>
                    < div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "row",

                        }}
                    >

                        <div
                            style={{ fontSize: "15px" }}
                        >

                            {
                                dataItem?.map((item, key) => {
                                    return (
                                        <div key={key} >
                                            <span style={{
                                                marginRight: "5px",
                                                textTransform: "uppercase"
                                            }}>
                                                {item?.category_name} :
                                            </span>

                                            {item?.name}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div
                            style={{
                                fontWeight: "bold",
                                fontSize: "14pt",
                                // width: "100px"
                            }}
                        >
                            {fomatCurrency((Number(data?.promoPrice >= 0 ? data?.promoPrice : data?.price) + (data?.variants !== undefined ? (Number(data?.variants[1]) >= 0 && Number(data?.variants[1])) : 0)) * data?.quantity)}


                        </div>
                    </div>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "right",
                            alignItems: "center"

                        }}
                    >
                        <div
                            style={{
                                border: "#d2d2d2 solid 1px",
                                borderRadius: "20px",
                                padding: "5px 10px",
                                fontWeight: "bold",
                                marginRight: "10px",
                                cursor: "pointer"
                            }}
                            onClick={() => {
                                setToggleEditOption(true);
                            }}
                        >
                            Thay đổi
                        </div>
                        <div
                            style={{ display: "flex", alignItems: "center", flexDirection: "row", width: "100px" }}
                        >
                            <div onClick={handleDelete} >
                                <IconButton>
                                    <RemoveCircleOutlineIcon
                                        style={{
                                            fontSize: "30px",
                                            color: "red"
                                        }} />
                                </IconButton>
                            </div>
                            <p style={{ color: "black", fontSize: "22px", fontWeight: "bolder", margin: "0px", }} >{action == 0 ? selectedItems[indexItem]?.quantity : data?.quantity}</p>
                            <div onClick={handleAdd} >
                                <IconButton>
                                    <AddCircleOutlineIcon
                                        style={{
                                            fontSize: "30px",
                                            color: "green"
                                        }} />
                                </IconButton>
                            </div>


                        </div>

                    </div>
                </div>
            }



        </div>
    )
}




export default SelectedItem;
