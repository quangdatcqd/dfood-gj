import { Dialog, DialogContent, DialogTitle, IconButton, TextareaAutosize } from '@mui/material';
import { React, useState, useLayoutEffect, useEffect, useRef, useContext, useMemo, memo } from 'react';

import "./style.css";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import OptionsMoreCheckbox from './OptionsMoreCheckbox';
import { CartContext } from '../Contexts/CartContext';
import { fomatCurrency } from '../common';
const ChoseOptions = memo((props) => {
    const { setToggleOption, toggleOption, data, indexItem } = props;
    const contexts = useContext(CartContext);
    const [noteItem, setNoteItem] = useState();
    const [quantity, setQuantity] = useState(1);
    const [pricePreview, setPricePreview] = useState(data?.promotion?.selling_price ? data?.promotion?.selling_price : data?.price);

    var variants = useRef([]);
    var total = 0;
    var hasvariant;
    const price = useRef(0);
    useEffect(() => {
        hasvariant = contexts.selectedItems?.findIndex((itemSelected) => itemSelected?.uuid === data?.id);

        if (hasvariant >= 0 && indexItem >= 0) {
            setQuantity(contexts.selectedItems[indexItem]?.quantity >= 1 ? contexts.selectedItems[indexItem]?.quantity : 1);
            setNoteItem(contexts.selectedItems[indexItem]?.notes)
            variants.current = contexts.selectedItems[indexItem]?.variants[0] !== undefined ? contexts.selectedItems[indexItem]?.variants[0] : [];
            price.current = Number(contexts.selectedItems[indexItem]?.variants[1]) >= 0 ? Number(contexts.selectedItems[indexItem]?.variants[1]) : 0;

            // total = (((Number(data?.promotion?.selling_price ? data?.promotion?.selling_price : data?.price)) * quantity) + pricein);
            contexts.handleVariant([variants.current, price.current]);
            setPricePreview(total);
        } else {
            variants.current = [];
            setQuantity(1);
        }
    }, []);

    useEffect(() => {
        setPricePreview(((Number(price.current) >= 0 && Number(price.current)) + (data?.promotion?.selling_price ? data?.promotion?.selling_price : data?.price)) * quantity)
        console.log(((Number(price.current) >= 0 && Number(price.current)) + (data?.promotion?.selling_price ? data?.promotion?.selling_price : data?.price)) * quantity);
    }, [quantity, price.current]);



    const handleOK = () => {
        // indexItem < 0 hành động thêm mới món 
        if (indexItem < 0) {
            contexts.handleSelectItem(
                {
                    itemId: data?.shopping_item_id,
                    itemName: data?.name,
                    notes: noteItem,
                    price: data?.price,
                    promoId: data?.promotion?.id,
                    quantity: quantity,
                    uuid: data?.id,
                    promoPrice: data?.promotion?.selling_price
                }

            );
        } else {

            //indexItem > 0 hành động cập nhật món
            contexts.handleSelectItem(
                {
                    itemId: data?.shopping_item_id,
                    itemName: data?.name,
                    notes: noteItem,
                    price: data?.price,
                    promoId: data?.promotion?.id,
                    quantity: quantity,
                    uuid: data?.id,
                    promoPrice: data?.promotion?.selling_price
                },
                indexItem,
                2
                // hành động cập nhật món và món kèm
            );
        }
        setToggleOption(false);
    };



    const handleChange = (variantItemKey, variantKey) => {

        var hasItem = variants.current?.findIndex((variant) => variant?.id === data?.variant_categories[variantKey]?.variants[variantItemKey]?.id);

        if (hasItem >= 0) {

            price.current = Number(price.current) - (Number(data?.variant_categories[variantKey]?.variants[variantItemKey]?.price) >= 0 ? Number(data?.variant_categories[variantKey]?.variants[variantItemKey]?.price) : 0);

            variants.current = variants.current?.filter(item => item?.id !== data?.variant_categories[variantKey]?.variants[variantItemKey]?.id);


        } else {
            price.current = Number(price.current) + (Number(data?.variant_categories[variantKey]?.variants[variantItemKey]?.price) >= 0 ? Number(data?.variant_categories[variantKey]?.variants[variantItemKey]?.price) : 0);

            variants.current.push({
                category_id: data?.variant_categories[variantKey]?.id,
                category_name: data?.variant_categories[variantKey]?.name,
                id: data?.variant_categories[variantKey]?.variants[variantItemKey]?.id,
                name: data?.variant_categories[variantKey]?.variants[variantItemKey]?.name,
            });

        }
        contexts.handleVariant([variants.current, price.current])
        // total = ((price.current + Number(data?.promotion?.selling_price ? data?.promotion?.selling_price : data?.price)) * quantity);




    }
    // variants = useRef(variantsSelected);

    const handleDelete = () => {
        if (quantity <= 1) {
            contexts.handleDeleteItem(
                {
                    itemId: data?.shopping_item_id,
                    itemName: data?.name,
                    notes: noteItem,
                    price: data?.price,
                    promoId: data?.promotion?.id,
                    quantity: quantity,
                    uuid: data?.id,
                    promoPrice: data?.promotion?.selling_price
                }
            );
            setQuantity(0);

            setToggleOption(false);

        } else {
            setQuantity(quantity > 1 ? quantity - 1 : 1);
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
                onClose={() => setToggleOption(false)}
                scroll={"paper"}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                cx={{ margin: "0px" }}
            >


                <DialogTitle style={{
                    position: "relative"
                }} >
                    {
                        indexItem < 0 ? "Chọn món kèm" : "Sửa món"
                    }
                    <div style={{
                        position: "absolute",
                        right: "0px",
                        top: "0px",
                        borderRadius: "50px",
                        padding: "6px 16px",
                        backgroundColor: "red",
                        color: "white",
                        boxShadow: " 0px 0px 7px 3px #c1c1c1",
                        fontSize: "14pt",
                        cursor: "pointer"




                    }}
                        onClick={() => setToggleOption(false)}
                    >X</div>  </DialogTitle>


                <DialogContent style={{ padding: "0px" }} >
                    <div
                        dividers={'paper'}
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <div>
                            <p
                                style={{
                                    marginBottom: "0px",
                                    marginLeft: "10px",
                                    fontSize: "12pt",
                                    fontWeight: "bold"
                                }}
                            >Ghi chú món ăn</p>
                            <TextareaAutosize onChange={(e) => setNoteItem(e.target.value)} value={noteItem} style={{ width: "calc(100% - 20px)", resize: "none", margin: "5px 10px", padding: "5px 10px", outline: "none", border: "1px solid rgb(214 214 214)", borderRadius: "10px", fontSize: "10pt", fontWeight: "bold", }} />

                        </div>
                        {
                            data?.variant_categories?.map((item, index) => {
                                return (<OptionsMoreCheckbox handleChange={handleChange} variants={variants} variantKey={index} key={index} data={item} />)

                            })
                        }
                    </div>


                </DialogContent>
                <div style={{ backgroundColor: "rgb(230 255 238)" }}>
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
                        {
                            indexItem < 0 ? " Thêm món " : "Cập nhật "
                        }
                        -

                        <span>  {fomatCurrency(Number(pricePreview))} </span>

                    </div>
                </div>
            </Dialog >
        </div >
    );
})



export default ChoseOptions;



