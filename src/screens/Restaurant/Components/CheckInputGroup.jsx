import React, { useEffect } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { fomatCurrency } from '../../../common';

export default function CheckInputGroup({ variant, setListVariant, listVariant }) {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    function handleChange(e) {
        const idOption = e.target.value;
        const optionItem = variant?.variants?.find((item => item?.id === idOption));

        if (listVariant === null) {
            setListVariant([{
                category_id: variant?.id,
                category_name: variant?.name,
                id: optionItem?.id,
                name: optionItem?.name,
                price: optionItem?.price
            }])
        } else {

            if (e.target.checked) {
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
            } else {
                setListVariant(listVariant?.filter((item => item?.id !== optionItem?.id)));
            }
        }


    }

    return (
        <div>
            {
                variant?.variants?.map((item, index) => {
                    return <div className='optionItem' key={index}>
                        <div className='optionItemInput'>
                            <FormControlLabel
                                value={item?.id}
                                control={
                                    <Checkbox
                                        {...label}
                                        onClick={handleChange}
                                        sx={{
                                            color: "rgb(205 118 33)",
                                            '&.Mui-checked': {
                                                color: "rgb(175, 93, 12)",
                                            },
                                        }}
                                    />
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
