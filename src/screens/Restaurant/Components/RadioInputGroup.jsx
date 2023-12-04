import React, { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import { FormControlLabel } from '@mui/material';
import { fomatCurrency } from '../../../common';

export default function RadioInputGroup({ variant, setListVariant, listVariant }) {
    const [valueSelected, setValueSelected] = useState("");
    const handleChange = (event) => {
        const idOption = event.target.value;
        handleSelectOne(idOption)
        setValueSelected(idOption)
    };
    function handleSelectOne(idOption) {
        const optionItem = variant?.variants?.find((item => item?.id === idOption));
        var variantSelected = listVariant;
        if (variantSelected === null) {
            variantSelected = [
                {
                    category_id: variant?.id,
                    category_name: variant?.name,
                    id: optionItem?.id,
                    name: optionItem?.name,
                    price: optionItem?.price
                }]
        } else {
            const indexItem = variantSelected?.findIndex((item => item?.category_id === variant?.id));
            if (indexItem >= 0) {
                variantSelected = [
                    ...variantSelected,
                    {
                        category_id: variant?.id,
                        category_name: variant?.name,
                        id: optionItem?.id,
                        name: optionItem?.name,
                        price: optionItem?.price
                    }]
                variantSelected?.splice(indexItem, 1);
            } else {
                variantSelected = [
                    ...variantSelected,
                    {
                        category_id: variant?.id,
                        category_name: variant?.name,
                        id: optionItem?.id,
                        name: optionItem?.name,
                        price: optionItem?.price
                    }
                ]
            }
        }
        setListVariant(variantSelected);
    }
    return (
        <div>
            {
                variant?.variants?.map((item, index) => {
                    const variant = listVariant?.findIndex(variant => variant?.id === item?.id)

                    return <div className='optionItem' key={index}>
                        <div className='optionItemInput'>
                            <FormControlLabel value="female" control={
                                <RadioCustom handleChange={handleChange} valueSelected={valueSelected} setValueSelected={setValueSelected} state={variant >= 0} value={item?.id} />
                            } label={item?.name} />
                        </div>
                        <p style={{ margin: "0px" }}>{fomatCurrency(item?.price)}</p>
                    </div>
                })
            }
        </div>
    );
}


const RadioCustom = ({ handleChange, valueSelected, value, setValueSelected, state }) => {
    state && setValueSelected(value)
    return <Radio
        checked={valueSelected == value}
        onClick={(e) => {
            handleChange(e)
        }}
        value={value}
        sx={{
            color: "rgb(205 118 33)",
            '&.Mui-checked': {
                color: "rgb(175, 93, 12)",
            },
        }}
    />
}
