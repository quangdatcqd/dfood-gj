import * as React from 'react';
import Radio from '@mui/material/Radio';
import { FormControlLabel } from '@mui/material';
import { fomatCurrency } from '../../../common';

export default function RadioInputGroup({ variant, setListVariant, listVariant }) {
    const [selectedValue, setSelectedValue] = React.useState("b");

    const handleChange = (event) => {
        const idOption = event.target.value;
        handleSelectOne(idOption)
        setSelectedValue(idOption);
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
                variantSelected?.splice(indexItem, 1);
                variantSelected = [
                    ...variantSelected,
                    {
                        category_id: variant?.id,
                        category_name: variant?.name,
                        id: optionItem?.id,
                        name: optionItem?.name,
                        price: optionItem?.price
                    }]
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
        setSelectedValue(idOption);
    }

    const controlProps = (item) => {
        return {
            checked: selectedValue === item,
            onClick: handleChange,
            value: item,
            name: 'color-radio-button-demo',
            inputProps: { 'aria-label': item },
        }
    };
    return (
        <div>
            {
                variant?.variants?.map((item, index) => {
                    return <div className='optionItem' key={index}>
                        <div className='optionItemInput'>
                            <FormControlLabel value="female" control={<Radio
                                {...controlProps(item?.id)}
                                sx={{
                                    color: "rgb(205 118 33)",
                                    '&.Mui-checked': {
                                        color: "rgb(175, 93, 12)",
                                    },
                                }}
                            />} label={item?.name} />
                        </div>
                        <p style={{ margin: "0px" }}>{fomatCurrency(item?.price)}</p>
                    </div>
                })
            }



        </div>
    );
}
