import { React, useContext, useRef, useEffect } from 'react';
import SelectedItem from './SelectedItem';
import { CartContext } from '../Contexts/CartContext';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

const BoxSelectedItems = (props) => {
    const { setToggleEditItems, data, quantity, setQuantity, toggleEditItems, setToggleOption } = props;

    const { selectedItems, handleVariant } = useContext(CartContext);
    var index = selectedItems?.findIndex((item) => item?.itemId === data?.shopping_item_id);


    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (toggleEditItems) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [toggleEditItems]);



    return (
        <div>


            <Dialog
                open={toggleEditItems}
                onClose={() => setToggleEditItems(false)}
                scroll={"paper"}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                cx={{ margin: "0px" }}
            >


                <DialogTitle style={{
                    position: "relative",
                    color: "black",
                    fontWeight: "bolder"
                }} >{selectedItems[index]?.itemName}
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
                        onClick={() => setToggleEditItems(false)}
                    >X</div>  </DialogTitle>


                <DialogContent style={{ padding: "0px" }} >
                    <div
                        dividers={'paper'}
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                        style={{ padding: '14px 26px', borderTop: "dotted gray 1px", }}
                    >

                        {
                            selectedItems?.map((item, key) => {

                                return (

                                    item?.itemId == data?.shopping_item_id &&
                                    <SelectedItem data={item} indexItem={key} key={key} dataVariants={data} action={0} />
                                )

                            })
                        }
                    </div>


                </DialogContent>
                <div style={{ backgroundColor: "rgb(230 255 238)" }}>

                    <div
                        style={{
                            backgroundColor: "rgb(0 119 32)",
                            padding: "8px 10px",
                            textAlign: "center",
                            fontSize: "16pt",
                            color: "white",
                            borderRadius: "40px",
                            margin: " 0px 10px 10px 10px ",
                            cursor: "pointer"
                        }}
                        className="box-select"
                        onClick={() => {
                            setToggleOption(true);

                            setQuantity(0);
                            handleVariant([]);
                        }}>
                        Thêm món tuỳ chỉnh khác



                    </div>
                </div>
            </Dialog >
        </div >
    )

}
export default BoxSelectedItems;
