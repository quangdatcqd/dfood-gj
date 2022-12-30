import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Paper, IconButton } from '@mui/material';
import { React, useState, useLayoutEffect, useEffect, useRef, useContext, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import "./style.css";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import OptionsMoreCheckbox from './OptionsMoreCheckbox';
import { CartContext } from '../Contexts/CartContext';
import zIndex from '@mui/material/styles/zIndex';
const ChoseOptions = (props) => {
    const { settoggleOption, toggleOption, data } = props;
    const contexts = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);
    const [pricePreview, setPricePreview] = useState(data?.price);

    var variantsSelected;
    var total = 0;
    var price = 0;
    var hasvariant;
    useMemo(() => {

        hasvariant = contexts.selectedItems?.findIndex((itemSelected) => itemSelected?.uuid === data?.id);

        if (hasvariant >= 0) {
            setQuantity(contexts.selectedItems[hasvariant]?.quantity);

            variantsSelected = contexts.selectedItems[hasvariant]?.variants[0];
            price = Number(contexts.selectedItems[hasvariant]?.variants[1]);

            console.log(contexts.selectedItems[hasvariant]?.quantity)
            total = ((price + Number(data?.promotion?.selling_price ? data?.promotion?.selling_price : data?.price)) * quantity)

            setPricePreview(total)

        } else {
            variantsSelected = [];

        }
    }, [])
    var price = useRef(price);




    const handleOK = () => {

        settoggleOption(false);


        contexts.handleSelectItem(
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
    };



    useMemo(() => {
        setPricePreview((price.current + data?.price) * quantity)
    }, [quantity, price.current])




    var variants = useRef(variantsSelected);
    const handleChange = (variantItemKey, variantKey) => {


        var hasItem = variants.current?.findIndex((variant) => variant?.id === data?.variant_categories[variantKey]?.variants[variantItemKey]?.id);
        if (hasItem >= 0) {

            price.current -= data?.variant_categories[variantKey]?.variants[variantItemKey]?.price;
            variants.current = variants.current?.filter(item => item?.id !== data?.variant_categories[variantKey]?.variants[variantItemKey]?.id);


        } else {
            price.current += data?.variant_categories[variantKey]?.variants[variantItemKey]?.price;

            variants.current.push({
                category_id: data?.variant_categories[variantKey]?.id,
                category_name: data?.variant_categories[variantKey]?.name,
                id: data?.variant_categories[variantKey]?.variants[variantItemKey]?.id,
                name: data?.variant_categories[variantKey]?.variants[variantItemKey]?.name,
            });

        }

        // total = ((price.current + Number(data?.promotion?.selling_price ? data?.promotion?.selling_price : data?.price)) * quantity);

        contexts.handleVariant([variants.current, price.current])

    }



    // variants = useRef(variantsSelected);




    const handleDelete = () => {
        if (quantity <= 0) {
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
            settoggleOption(false);

        } else {
            setQuantity(quantity - 1);
        }


    }

    const handleAdd = () => {
        setQuantity(quantity + 1);

    }

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (toggleOption) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [toggleOption]);

    return (
        <div>


            <Dialog
                open={true}
                onClose={() => settoggleOption(false)}
                scroll={"paper"}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                cx={{ margin: "0px" }}
            >

                <DialogTitle id="scroll-dialog-title">Chọn món kèm   </DialogTitle>

                <DialogContent style={{ padding: "0px" }} >
                    <div
                        dividers={'paper'}
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {
                            data?.variant_categories?.map((item, index) => {
                                return (<OptionsMoreCheckbox handleChange={handleChange} variants={variants} variantKey={index} key={index} data={item} />)

                            })
                        }
                    </div>


                </DialogContent>
                <div style={{ backgroundColor: "#dddddd" }}>
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-around", alignItems: "center" }}> <span style={{ fontSize: "20px", fontWeight: "bold", padding: "5px 10px" }}>Số lượng món ăn</span>
                        <div
                            style={{ display: "flex", alignItems: "center", flexDirection: "row", width: "100px" }}
                        >


                            <div onClick={handleDelete} >
                                <IconButton >
                                    <RemoveCircleOutlineIcon
                                        style={{
                                            fontSize: "35px",
                                            color: "red"
                                        }} />
                                </IconButton>
                            </div>
                            <p style={{ color: "black", fontSize: "22px", fontWeight: "bolder", margin: "0px", }} >{quantity}</p>
                            <div onClick={handleAdd} >
                                <IconButton>
                                    <AddCircleOutlineIcon
                                        style={{
                                            fontSize: "35px",
                                            color: "green"
                                        }} />
                                </IconButton>
                            </div>


                        </div>
                    </div>
                    <div
                        style={{
                            backgroundColor: "rgb(0 119 32)",
                            padding: "10px 10px",
                            textAlign: "center",
                            fontSize: "17pt",
                            color: "white",
                            borderRadius: "40px",
                            margin: " 0px 10px 10px 10px ",
                            cursor: "pointer"
                        }}
                        className="box-select"
                        onClick={handleOK}>
                        Thêm món -
                        <span> {pricePreview}</span>

                    </div>
                </div>
            </Dialog >
        </div >
    );
}



export default ChoseOptions;
