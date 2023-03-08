

import { React, useState, useContext, useLayoutEffect } from 'react';

import { useSnackbar } from 'notistack';
import ChoseOptions from './ChoseOptions';
import { CartContext } from '../Contexts/CartContext';
import QuantityInput from './QuantityInput';
import BoxSelectedItems from './BoxSelectedItems';
import { TextareaAutosize } from '@mui/material';


const BoxBtnSelect = (props) => {
    const { data } = props;

    const contexts = useContext(CartContext);
    const [toggleOption, setToggleOption] = useState(false);
    const [toggleEditItems, setToggleEditItems] = useState(false);
    const [noteItem, setNoteItem] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [indexItem, setIndexItem] = useState(-1);

    var index = contexts.payload?.items?.findIndex((payloadId) => {
        return payloadId?.uuid === data?.id;
    });
    const handleChangeQty = (qty) => {
        setQuantity(qty);
    }
    useLayoutEffect(() => {


        // console.log(index)
        if (index >= 0) {
            setQuantity(contexts.payload?.items[index]?.quantity);
        }

    }, [contexts.payload, contexts.setIndexItem]);

    const handleDelete = () => {

        // if (quantity <= 1) {
        //     setQuantity(0);
        //     contexts.handleDeleteItem(
        //         {
        //             itemId: data?.shopping_item_id,
        //             itemName: data?.name,
        //             notes: "",
        //             price: data?.price,
        //             promoId: data?.promotion?.id,
        //             quantity: 0,
        //             uuid: data?.id,
        //             promoPrice: data?.promotion?.selling_price
        //         }
        //     );
        //     setToggleEditItems(false)
        // }
        // else {
        //  
        //     contexts.handleDeleteItem(
        //         {
        //             itemId: data?.shopping_item_id,
        //             itemName: data?.name,
        //             notes: "",
        //             price: data?.price,
        //             promoId: data?.promotion?.id,
        //             quantity: quantity - 1,
        //             uuid: data?.id,
        //             promoPrice: data?.promotion?.selling_price
        //         }
        //     );
        // }


        if (quantity >= 1) {

            contexts.handleSelectItem(
                {
                    itemId: data?.shopping_item_id,
                    itemName: data?.name,
                    notes: noteItem,
                    price: data?.price,
                    promoId: data?.promotion?.id,
                    quantity: quantity - 1,
                    uuid: data?.id,
                    promoPrice: data?.promotion?.selling_price
                },
                index
                ,
                1
            );
            setQuantity(quantity <= 0 ? 0 : quantity - 1);
        }

    }
    const handleAdd = () => {
        setIndexItem(-1);

        if (data?.variant_category_ids === null) {


            contexts.handleSelectItem(
                {
                    itemId: data?.shopping_item_id,
                    itemName: data?.name,
                    notes: noteItem,
                    price: data?.price,
                    promoId: data?.promotion?.id,
                    quantity: quantity + 1,
                    uuid: data?.id,
                    promoPrice: data?.promotion?.selling_price
                },
                index,
                index >= 0 && 1


            );
            setQuantity(quantity + 1);
        } else {
            setToggleOption(true);
        }
    }



    return (
        <div >
            <BoxSelectedItems setQuantity={setQuantity} setIndexItem={setIndexItem} toggleEditItems={toggleEditItems} setToggleEditItems={setToggleEditItems} handleDelete={handleDelete} quantity={quantity} data={data} setToggleOption={setToggleOption} />

            {toggleOption && <ChoseOptions indexItem={-1} toggleOption={toggleOption} setToggleOption={setToggleOption} data={data} quantity={quantity} setQuantity={handleChangeQty} />}
            <TextareaAutosize onChange={(e) => setNoteItem(e.target.value)} value={noteItem} style={{ width: "100%", resize: "none", padding: "5px", outline: "none", border: "1px solid rgb(214 214 214)", borderRadius: "10px", fontSize: "10pt", fontWeight: "bold", marginBottom: "30px" }} />

            {(data?.variant_category_ids === null) ?
                <QuantityInput handleAdd={handleAdd} handleDelete={handleDelete} quantity={quantity} />
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

                    <span style={{ marginRight: "5px", color: "gray" }}>Tuỳ chọn</span>
                    {
                        index >= 0 && contexts.payload?.items[index]?.quantity > 0 ?
                            < button
                                onClick={() => setToggleEditItems(true)}
                                style={{
                                    outline: "none",
                                    padding: "2px 15px",
                                    borderRadius: "15px",
                                    border: "#12ae12 2px solid",
                                    backgroundColor: "white",
                                    color: "green",
                                    fontWeight: "bold"
                                }}>
                                {contexts.payload?.items[index]?.quantity > 0 && contexts.payload?.items[index]?.quantity + " mục"}

                            </button>
                            :
                            <button
                                onClick={() => handleAdd()}
                                style={{
                                    outline: "none",
                                    padding: "2px 15px",
                                    borderRadius: "15px",
                                    border: "#12ae12 2px solid",
                                    backgroundColor: "white",
                                    color: "green",
                                    fontWeight: "bold"
                                }}>
                                Thêm

                            </button>
                    }



                </div>
            }
        </div >
    )
};


export default BoxBtnSelect;
