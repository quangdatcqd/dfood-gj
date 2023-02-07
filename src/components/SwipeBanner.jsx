import { Card, CardMedia } from '@mui/material';
import React from 'react';
import { EffectCoverflow, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
const SwipeBanner = (props) => {
    const { banners } = props;

    return (
        <div>

            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 10,
                    stretch: 0,
                    depth: 50,
                    modifier: 1,
                    slideShadows: false,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper swipe-banner"
                style={{ padding: " 10px 0px ", marginTop: "10px", height: "200px" }}
            >

                {
                    banners?.content?.actions?.map((item, key) => {
                        return (
                            <SwiperSlide key={key}>
                                {/* <NavLink
                                style={{ textDecoration: "none" }}
                                to={"/selectdishes/" + item?.restaurant_id}
                            > */}
                                <Card sx={{}}>
                                    <CardMedia
                                        sx={{ height: 220 }}
                                        image={item?.image_url}
                                        title="green iguana"
                                    />


                                </Card>
                                {/* </NavLink> */}
                            </SwiperSlide>
                        )
                    })
                }




            </Swiper>
        </div>
    );
}

export default SwipeBanner;
