import { React, useContext } from 'react';
import { CartContext } from '../Contexts/CartContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const ListItems = (props) => {
    const { listmerchants, handleClickMore } = props;
    const dataMercharts = listmerchants?.content?.actions || listmerchants?.content?.items || listmerchants?.data?.cards;
    console.log(listmerchants);
    return (
        <div className='boxCategory'>
            <p className='categoryTitle' >{listmerchants?.content?.title} </p>
            <div className='divListRestaurant'>
                {
                    dataMercharts?.map((item, key) => {
                        return (
                            <BoxItem merchantData={item?.content || item} key={key} />
                        )
                    })
                }

            </div>
            {
                !listmerchants?.data?.cards
                && <div className='btnMoreItem' onClick={() => handleClickMore()}>
                    Xem thêm
                    <ExpandMoreIcon />
                </div>
            }

        </div>
    );
}

const BoxItem = (props) => {
    const { merchantData } = props;
    const { toggleSelectDishes, setToggleSelectDishes, selectedRes, setSelectedRes } = useContext(CartContext);
    console.log(merchantData);
    const handleSelect = (id) => {

        setToggleSelectDishes(true);
        setSelectedRes(id);
    }
    return (
        <div className='boxRestaurantItem' onClick={() => handleSelect(merchantData?.restaurant_id || merchantData?.id)}>
            <div className='boxRestaurantItemImage'  >
                <img src={merchantData?.image_url} alt="" />
            </div>
            <div className='boxResItemInfo'>
                <p className='PResName'>{merchantData?.merchant_title?.text || merchantData?.title?.text}</p>

                <p className='PResDes' >
                    {
                        merchantData?.merchant_description?.merchant_description_badge?.image_url ?
                            <img src={merchantData?.merchant_description?.merchant_description_badge?.image_url} alt="" /> : ""
                    }
                    {merchantData?.merchant_description?.text || merchantData?.description?.text}
                </p>
                <p className='PResDes1' >
                    {merchantData?.additional_info?.highlighted_text || merchantData?.merchant_additional_info?.highlighted_text}
                    < span  >
                        {merchantData?.additional_info?.normal_text || merchantData?.merchant_additional_info?.normal_text}
                    </span>
                </p>
                <p className='PResDes2'  >
                    <img src={merchantData?.tagline_two?.image_url || merchantData?.merchant_tagline_two?.image_url} alt="" />
                    {merchantData?.tagline_two?.text || merchantData?.merchant_tagline_two?.text}
                </p>
            </div>

        </div >
    )
}

export default ListItems;
