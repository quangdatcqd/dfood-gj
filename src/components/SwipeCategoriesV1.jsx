
import React from 'react';
import { EffectCoverflow, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
const SwipeCategoriesV1 = (props) => {
    const { data } = props;

    return (
        <div className='boxSwipeCategoriesV1'>
            <p className='categoryTitle' >{data?.content?.title} </p>
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
                    data?.content?.actions?.map((item, key) => {

                        return (
                            <SwiperSlide key={key} className='divitemCV1'  >
                                <div className='boxitemCV1'>
                                    <img src={item?.image_url} alt="" />
                                    <p >{item.title || item.description}</p>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }




            </Swiper >
        </div>
    );
}

export default SwipeCategoriesV1;
