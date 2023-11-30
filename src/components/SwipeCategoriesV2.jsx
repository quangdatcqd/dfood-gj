import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { React } from 'react';
import { EffectCoverflow, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { useDispatch } from 'react-redux';
import { setResId } from '../store/dialogSlice';
const SwipeCategoriesV2 = (props) => {
    const { products } = props;
    const dispatch = useDispatch();
    const handleSelectRes = (id) => {
        if (id)
            dispatch(setResId(id))
    }
    const data = products?.content?.actions || products?.content?.items;

    return (
        <div>
            <p className='categoryTitle'>{products?.content?.title} </p>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 0,
                    modifier: 0,
                    slideShadows: false,
                }}
                // pagination={true}
                modules={[EffectCoverflow, Pagination]}
                style={{ padding: " 10px 0px " }}

            >
                {
                    data?.map((item, key) => {
                        return (
                            <SwiperSlide key={key} className={`boxItemSCV2 ${item?.restaurant_id === undefined && "boxItemSCV2Search"}`} >
                                <div className='divItemSCV2' onClick={() => handleSelectRes(item?.restaurant_id)}>
                                    <img src={item?.image_url} alt="" />
                                    <div  >
                                        <p className='itemSCV2Name'> {item?.merchant_name || item?.name}</p>
                                        <p className='itemSCV2Des'>   {item?.point_1_label}</p>
                                        {
                                            item?.point_2_icon &&
                                            <p className='itemSCV2Des'>
                                                <img src={item?.point_2_icon} alt="" />
                                                <span> {item?.point_2_label}</span>
                                            </p>
                                        }

                                    </div>
                                </div>

                            </SwiperSlide>
                        )
                    })
                }




            </Swiper >
        </div>
    );
}

export default SwipeCategoriesV2;
