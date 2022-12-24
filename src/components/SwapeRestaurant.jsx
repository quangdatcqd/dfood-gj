import { React, useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { EffectCoverflow, Pagination } from "swiper";
import "../components/style.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import Cartpreview from "./Cartpreview";
const SwapeRestaurant = (props) => {
    const { dataRestaurant } = props;
    // const [cadsRestaurant, setCadsRestaurant] = useState(dataRestaurant);

    return (
        <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
            style={{ padding: "30px 10px " }}
        >

            {
                dataRestaurant?.content?.actions?.map((item, key) => {
                    return (
                        <SwiperSlide key={key}>
                            <NavLink
                                style={{ textDecoration: "none" }}
                                to={"/selectdishes/" + item?.restaurant_id}
                            >
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={item?.image_url}
                                        title="green iguana"
                                    />
                                    <CardContent style={{ padding: "10px  " }} >
                                        <Typography gutterBottom variant="body1" component="div">
                                            {item?.merchant_name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">{item?.point_1_label}
                                        </Typography>

                                    </CardContent>

                                </Card>
                            </NavLink>
                        </SwiperSlide>
                    )
                })
            }
            {
                dataRestaurant?.content?.items?.map((item, key) => {
                    { console.log(item?.description?.id, item?.id) }
                    return (
                        <SwiperSlide key={key}>
                            <NavLink
                                style={{ textDecoration: "none" }}

                                to={"/selectdishes/" + item?.id}
                            >
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={item?.image_url}
                                        title="green iguana"
                                    />
                                    <CardContent style={{ padding: "10px  " }} >
                                        <Typography gutterBottom variant="body1" component="div">
                                            {(item?.description?.text) ? item?.description?.text : item?.name}
                                        </Typography>
                                        {/* <Typography variant="body2" color="text.secondary">{item?.additional_info?.normal_text} */}
                                        {/* </Typography> */}

                                    </CardContent>

                                </Card>
                            </NavLink>
                        </SwiperSlide>
                    )
                })
            }



        </Swiper>
    );
};
export default SwapeRestaurant;