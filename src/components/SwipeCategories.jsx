import { Card, CardMedia } from '@mui/material';
import React from 'react';
import { EffectCoverflow, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
const SwipeCategories = (props) => {
    const { banners } = props;

    const slideNum = Math.ceil(banners?.content?.actions?.length / 2);
    var listItems = [];
    for (let i = 0; i < slideNum; i++) {
        listItems.push("0");
    }
    var count = 0;
    return (
        <div>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                // centeredSlides={true}
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
                className="mySwiper swipe-cate"
                style={{ padding: "  10px 0px " }}
            >
                {

                    listItems?.map((item, key) => {
                        var sizePage = count + count;
                        count++;
                        return (
                            <SwiperSlide key={key}   >
                                {/* <NavLink
                                style={{ textDecoration: "none" }}
                                to={"/selectdishes/" + item?.restaurant_id}
                            > */}
                                <div style={{
                                    border: "solid 2px rgb(234 234 234)",
                                    borderRadius: "10px",
                                    marginRight: "3px"
                                }}>
                                    <img
                                        style={{
                                            width: "100%"
                                        }}
                                        src={banners?.content?.actions[sizePage]?.image_url}
                                        title="green iguana"
                                    />
                                    <p style={{ fontWeight: "bold", fontSize: "8pt" }}> {banners?.content?.actions[sizePage]?.description}</p>
                                </div>
                                <div style={{
                                    border: "solid 2px rgb(234 234 234)",
                                    borderRadius: "10px",
                                    marginTop: "5px",
                                    marginRight: "5px"

                                }}>
                                    <img
                                        style={{
                                            width: "100%"
                                        }}
                                        src={banners?.content?.actions[sizePage + 1]?.image_url}
                                        title="green iguana"
                                    />
                                    <p style={{ fontWeight: "bold", fontSize: "8pt" }}> {banners?.content?.actions[sizePage + 1]?.description}</p>
                                </div>

                                {/* </NavLink> */}
                            </SwiperSlide >
                        )
                    })
                }





            </Swiper >
        </div >
    );
}

export default SwipeCategories;
