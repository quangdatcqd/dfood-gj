import { React } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { setResId } from '../store/dialogSlice';
const ListItems = (props) => {
    const { listmerchants, handleClickMore } = props;
    const dataMercharts = listmerchants?.content?.actions || listmerchants?.content?.items || listmerchants?.data?.cards;

    return (
        <div className='boxCategory'>
            <p className='categoryTitle' >{listmerchants?.content?.title} </p>

            {
                dataMercharts?.length > 0 ?
                    <div className='divListRestaurant'>
                        {dataMercharts?.map((item, key) => {
                            return (
                                <BoxItem merchantData={item?.content || item} key={key} />
                            )
                        })}
                    </div> :
                    <p style={{ textAlign: "center", color: "gray" }}>Không tìm thấy</p>
            }
            {
                !listmerchants?.data?.cards
                && <div className='btnMoreItem' onClick={() => handleClickMore()}>
                    <p  >
                        Xem thêm nhà hàng "Cơm"
                        <ExpandMoreIcon />
                    </p>
                    <p>
                        Tìm món ăn "cơm"
                        <SearchIcon style={{ marginTop: "-3px", marginLeft: "3px", fontSize: "20px" }} />
                    </p>
                </div>
            }

        </div>
    );
}

const BoxItem = (props) => {
    const { merchantData } = props;
    const dispatch = useDispatch();
    const handleSelectRes = (id) => {
        dispatch(setResId(id))
    }

    return (
        <div className='boxRestaurantItem' onClick={() => handleSelectRes(merchantData.restaurant_id || merchantData?.id)} >
            <div className='boxRestaurantItemImage'  >
                <img src={merchantData?.image_url} alt="" />
            </div>
            <div className='boxResItemInfo'>
                <p className='PResName'>{merchantData?.merchant_title?.text || merchantData?.title?.text}</p>


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
