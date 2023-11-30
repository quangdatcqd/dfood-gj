import { React } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";
import "../components/style.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const SwapeRestaurant = (props) => {
    const { dataRestaurant, handleSelectRes } = props;


    return (
        <div className="boxSwapeRestaurant">
            <p className="categoryTitle">{dataRestaurant?.content?.title} </p>
            <h6> {dataRestaurant?.content?.sub_title}</h6>
            <Swiper
                effect={"coverflow"}
                // grabCursor={true}
                // centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 0,
                    modifier: 0,
                    slideShadows: false,
                }}
                modules={[EffectCoverflow, Pagination]}
                className="swiper-restaurant"

            >

                {
                    dataRestaurant?.content?.actions?.map((item, key) => {
                        return (
                            <SwiperSlide key={key} style={{ paddingRight: "10px  ", width: "225px" }}>

                                <Card sx={{
                                    cursor: "pointer",
                                    height: "235px",
                                    margin: "5px 0px"
                                }}
                                    onClick={() => handleSelectRes(item?.restaurant_id)}
                                >
                                    <CardMedia
                                        sx={{ height: 150 }}
                                        image={item?.image_url}
                                        title="green iguana"
                                    />
                                    <CardContent style={{ padding: "10px", }} >
                                        <p className="swipeResName">
                                            {item?.merchant_name}
                                        </p>
                                        <Typography variant="body2" color="text.secondary">{item?.point_1_label}
                                            <span className="text-danger">{item?.image_point_label ? " - " + item?.image_point_label : ""}</span>
                                        </Typography>

                                    </CardContent>

                                </Card>
                            </SwiperSlide>
                        )
                    })
                }
                {
                    dataRestaurant?.content?.items?.map((item, key) => {

                        return (
                            <SwiperSlide key={key} style={{ paddingRight: "10px  ", width: "225px" }}>
                                <Card sx={{
                                    height: "235px",
                                    margin: "5px 0px"
                                }}
                                    onClick={() => handleSelectRes(item?.id)}
                                >
                                    <CardMedia
                                        sx={{ height: 150 }}
                                        image={item?.image_url}
                                        title="green iguana"
                                    />
                                    <CardContent style={{ padding: "10px  " }} >
                                        <Typography gutterBottom variant="body1" component="div">
                                            {(item?.title?.text) ? item?.title?.text : item?.name}
                                        </Typography>

                                    </CardContent>

                                </Card>
                            </SwiperSlide>
                        )
                    })
                }



            </Swiper>
        </div >
    );
};
export default SwapeRestaurant;