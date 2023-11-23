import { Card, CardMedia } from '@mui/material';
import React from 'react';
import { EffectCoverflow, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
const SwipeCategoriesV1 = (props) => {
    const { banners } = props;

    return (
        <div>
            <hr />
            <h4 style={{ fontWeight: "bolder" }} >{banners?.content?.title} </h4>
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
                className="mySwiper swipe-cateV1"
                style={{ padding: " 10px 0px " }}
            >

                {
                    banners?.content?.actions?.map((item, key) => {
                        return (
                            <SwiperSlide key={key} style={{ padding: "0px 5px" }}>
                                {/* <NavLink
                                style={{ textDecoration: "none" }}
                                to={"/selectdishes/" + item?.restaurant_id}
                            > */}
                                <Card sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                    <CardMedia
                                        sx={{ height: 100, width: 100, borderRadius: "100px" }}
                                        image={item?.image_url}
                                        title="green iguana"
                                    />
                                    <p style={{ margin: "0px", padding: "4px 0px", fontSize: "10pt", fontWeight: "bold" }} >{item?.title}</p>
                                </Card>
                                {/* </NavLink> */}
                            </SwiperSlide>
                        )
                    })
                }




            </Swiper >
        </div>
    );
}

export default SwipeCategoriesV1;
