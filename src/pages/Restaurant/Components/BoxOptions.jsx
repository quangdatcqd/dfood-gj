
import ModalBox from '../../../components/ModalBox';
import { Box, CardContent, CardMedia, FormControlLabel, RadioGroup, Typography, useMediaQuery, } from '@mui/material';
import { React, useState, useEffect, memo } from 'react';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import './style.css'
import RadioInputGroup from './RadioInputGroup';
import CheckInputGroup from './CheckInputGroup';
import { addDishesToCart } from '../../../store/cartSlice';
import { useDispatch } from 'react-redux';


const BoxOptions = ({ open, setOpen, data, resData }) => {
    const matchMD = useMediaQuery("(max-width:800px)")
    const [listVariant, setListVariant] = useState(null);
    const [qty, setQty] = useState(1);
    const [totalPriceDish, setTotalPriceDish] = useState(data?.promotion?.selling_price || data?.price);

    const dispatch = useDispatch();

    const handleAddDish = () => {
        if (qty <= 0) {
            handleOpenDlog(false)
            return;
        }
        const dish = {
            itemId: data?.shopping_item_id,
            itemName: data?.name,
            notes: "xin",
            originalPrice: data?.price,
            price: data?.promotion?.selling_price,
            quantity: qty,
            variants: listVariant ? listVariant : undefined,
            uuid: data?.id
        }
        dispatch(addDishesToCart({
            dishes: dish,
            resData: resData
        }))
        handleOpenDlog(false)

    }
    const handleIncreaseQty = () => {
        setQty(qty + 1)
    }
    const handleDecreaseQty = () => {
        if (qty >= 1) {
            setQty(qty - 1)
        } else {
            setQty(0)
        }
    }
    const handleOpenDlog = (state) => {
        setOpen(state);
        setQty(1)
        setListVariant(null)
    }

    useEffect(() => {
        let totalVariantPrice = listVariant ? listVariant?.reduce((total, item) => total + item?.price, 0) : 0;
        console.log(data?.promotion?.selling_price || data?.price);
        setTotalPriceDish(totalVariantPrice + (data?.promotion?.selling_price * qty || data?.price * qty));
    }, [listVariant, qty, data]);







    return (
        <ModalBox open={open} setOpen={handleOpenDlog} title="Tuỳ chọn" maxWidth="md" fullWidth={true} fulls={matchMD} useCloseBar={false}>

            <div className="containerRes">
                <div className='boxResInfo'>
                    <div className='divBtnCloseDlg' onClick={() => handleOpenDlog(false)}><KeyboardBackspaceIcon className='btnCloseDlg' /></div>
                    <div className='divResInfo'>
                        <div className='lResImage'>
                            <img src={data?.image} style={{ height: "200px" }} alt="" />
                        </div>
                        <div className='optionResInfo'  >
                            <div className="lBoxResInfo lBoxResInfoOption">
                                <p className='lResName'>{data?.name}</p>
                                <p className='lResDes'>{data?.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className='boxBtnOption'>
                        <div className='btnOptionQty'>
                            <div className='btnOptionQtyRM'>
                                <RemoveIcon onClick={() => handleDecreaseQty()} />
                            </div>
                            <span className='qtyOption'>{qty}</span>
                            <div className='btnOptionQtyRM'>
                                <AddIcon onClick={() => handleIncreaseQty()} />
                            </div>
                        </div>
                        <div className='btnSelectOption' onClick={() => handleAddDish()}>
                            {
                                qty <= 0 ? "Đóng" :
                                    totalPriceDish?.toLocaleString("vi", { style: "currency", currency: "VND" })
                            }
                        </div>
                    </div>

                </div>
                <div className='boxResDishes boxOption'>
                    {
                        data?.variant_categories?.map((variant, index) => {
                            return <div key={index}>
                                <p className='categoryTitle' style={{ color: 'rgb(219, 117, 15)' }}>{variant?.name}</p>
                                <p className='cateOptionRequire'>{variant?.rules?.selection?.required && "Bắt buộc"} {variant?.rules?.selection?.text} </p>
                                {
                                    variant?.rules?.selection?.type === "SELECT_ONE" ?
                                        <RadioInputGroup variant={variant} setListVariant={setListVariant} listVariant={listVariant} /> :
                                        <CheckInputGroup variant={variant} setListVariant={setListVariant} listVariant={listVariant} />
                                }

                            </div>
                        })
                    }
                </div>
            </div>

        </ModalBox>
    );
}

export default BoxOptions;
