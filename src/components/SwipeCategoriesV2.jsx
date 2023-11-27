import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { React } from 'react';
import { EffectCoverflow, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
const SwipeCategoriesV2 = (props) => {
    const { products } = props;

    const handleSelect = (id) => {

    }
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
                    products?.content?.actions?.map((item, key) => {
                        return (
                            <SwiperSlide key={key} className='boxItemSCV2' >
                                <div className='divItemSCV2' onClick={() => handleSelect(item?.restaurant_id)}>
                                    <img src={item?.image_url} alt="" />
                                    <div  >
                                        <p className='itemSCV2Name'> {item?.merchant_name}</p>
                                        <p className='itemSCV2Des'>   {item?.point_1_label}</p>
                                        <p className='itemSCV2Des'>
                                            <img src={item?.point_2_icon} alt="" />
                                            <span> {item?.point_2_label}</span>
                                        </p>
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
