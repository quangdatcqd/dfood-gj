import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { fomatCurrency } from '../../../common';

export default function CheckInputGroup({ variant, setListVariant, listVariant }) {

    function handleChange(e) {
        const idOption = e.target.value;
        const optionItem = variant?.variants?.find((item => item?.id === idOption));
        if (e.target.checked) {

            if (listVariant === null) {
                setListVariant([{
                    category_id: variant?.id,
                    category_name: variant?.name,
                    id: optionItem?.id,
                    name: optionItem?.name,
                    price: optionItem?.price
                }])
            } else {
                setListVariant([
                    ...listVariant,
                    {
                        category_id: variant?.id,
                        category_name: variant?.name,
                        id: optionItem?.id,
                        name: optionItem?.name,
                        price: optionItem?.price
                    }
                ])
            }
        } else {
            setListVariant(listVariant?.filter((item => item?.id !== optionItem?.id)));
        }
    }

    return (
        <div>
            {
                variant?.variants?.map((item, index) => {
                    const variant = listVariant?.findIndex(variant => variant?.id === item?.id)
                    if (item?.in_stock)
                        return <div className='optionItem' key={index}>
                            <div className='optionItemInput'>
                                <FormControlLabel

                                    control={
                                        <CheckBoxCustom handleChange={handleChange} state={variant >= 0} value={item?.id} />
                                    }
                                    label={item?.name}
                                // onClick={() => handleSelectMany(index)}
                                />
                            </div>
                            <p style={{ margin: "0px" }}>{fomatCurrency(item?.price)}</p>
                        </div>
                })
            }



        </div>
    );
}

const CheckBoxCustom = ({ handleChange, state, value }) => {

    const [check, setCheck] = useState(state);
    useEffect(() => {
        setCheck(state)
    }, [state]);
    return <Checkbox
        onClick={(e) => {
            handleChange(e)
            setCheck(e.target.checked)
        }}
        value={value}
        checked={check}
        sx={{
            color: "rgb(205 118 33)",
            '&.Mui-checked': {
                color: "rgb(175, 93, 12)",
            },
        }}
    />
}
