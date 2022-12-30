import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Paper, Stack, FormGroup, Checkbox } from '@mui/material';
import { React, useLayoutEffect, useContext, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { CartContext } from '../Contexts/CartContext';
const OptionsMoreCheckbox = (props) => {

    const contexts = useContext(CartContext);

    const { data, handleChange, variantKey, variants } = props;








    // var price = 0;
    // var variants = [];
    // var lists = [];
    // document.querySelectorAll(".css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root > input").forEach((item, key) => {

    //     if (item?.checked && item?.value !== undefined) {
    //         var arr = item?.value?.split("|");
    //         lists.push(arr[2]);

    //         variants.push(JSON.parse(arr[0]));
    //         if (arr[1] != undefined)
    //             price += Number(arr[1]);
    //     }
    // })
    // setListChecked(lists);

    // contexts.handleVariant([
    //     variants,
    //     price
    // ]);




    return (

        <Stack spacing={2}>
            <Item>

                <FormControl style={{ width: "100%", }}>
                    <FormLabel style={{ color: "black", fontWeight: "bold" }} id="demo-form-control-label-placement">
                        {data?.name}
                    </FormLabel>
                    <p style={{ width: "100%", color: "red", fontWeight: "bold" }}> <span style={{ float: "left" }}>{data?.rules?.selection?.required && "Bắt buộc*"}</span><span style={{ float: "right" }}>{data?.rules?.selection?.max_quantity && "Chọn tối đa " + data?.rules?.selection?.max_quantity}</span>  </p>

                    <FormGroup style={{ width: "100%", }}>

                        {
                            data?.variants?.map((item, index) => {


                                let outStock = false;
                                if (item?.in_stock) outStock = false;
                                else outStock = true;



                                // let check = listChecked.find(checkAge);
                                let isCheck = false;
                                (variants.current?.findIndex((variant) => variant?.id === item?.id) >= 0) ? (isCheck = true) : isCheck = false
                                // contexts.selectedItems[indexItem.current]?.variants[0]?.includes(item?.id) ? (isCheck = true) : (isCheck = false);
                                // console.log(contexts.selectedItems[indexItem.current]?.variants[0])
                                // (check !== undefined) ? isCheck = true : isCheck = false;

                                return (
                                    <div key={index} style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                                        <FormControlLabel

                                            // value={key}
                                            control={
                                                <Checkbox
                                                    checked={isCheck}
                                                    disabled={outStock}
                                                    // checked={selectedValue === 'a'}
                                                    onChange={() => handleChange(index, variantKey)}
                                                    // value="a"
                                                    name={item?.id}
                                                // inputProps={{ 'aria-label': 'A' }}
                                                />
                                            }
                                            label={item?.name + " - " + item?.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                            labelPlacement="end"
                                        />

                                    </div>

                                )
                            })
                        }


                    </FormGroup>

                    {/* <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                        <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                    </FormGroup> */}


                </FormControl>
            </Item>
        </Stack >

    );
}
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default OptionsMoreCheckbox;
