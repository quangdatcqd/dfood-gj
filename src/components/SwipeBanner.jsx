import { Card, CardMedia, useMediaQuery } from '@mui/material';
import React from 'react';
import { EffectCoverflow, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
const SwipeBanner = (props) => {
    const { banners } = props;
    const matchMD = useMediaQuery("(max-width:500px)")
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
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper swipe-banner"
                style={{ marginTop: "55px", borderRadius: "10px", }}
            >
                {
                    banners?.content?.actions?.map((item, index) => {
                        const images = banners?.content?.actions?.slice(index, index + 2);
                        if (!matchMD) {
                            if (images?.length === 2 && (index === 0 || index % 2 === 0)) {
                                return (
                                    <SwiperSlide key={index}>
                                        <Card  >
                                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", }}>
                                                <div style={{ width: "calc(50% - 5px)" }} >
                                                    <img src={images[0]?.image_url} alt="" style={{ objectFit: 'contain', borderRadius: "15px" }} />
                                                </div>

                                                <div style={{ width: "calc(50% - 5px)", }} >
                                                    <img src={images[1]?.image_url} alt="" style={{ objectFit: 'contain', borderRadius: "15px" }} />
                                                </div>

                                            </div>
                                        </Card>
                                    </SwiperSlide>
                                )
                            }
                        } else {
                            return (
                                <SwiperSlide key={index}>
                                    <Card  >
                                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", }}>
                                            <div style={{ width: "100%" }} >
                                                <img src={item?.image_url} alt="" style={{ objectFit: 'contain', borderRadius: "15px" }} />
                                            </div>

                                        </div>
                                    </Card>
                                </SwiperSlide>
                            )
                        }

                    })
                }




            </Swiper>
        </div>
    );
}

export default SwipeBanner;
