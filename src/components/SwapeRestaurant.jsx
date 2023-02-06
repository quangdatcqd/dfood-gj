import { React, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { EffectCoverflow, Pagination } from "swiper";
import "../components/style.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { CartContext } from '../Contexts/CartContext';
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const SwapeRestaurant = (props) => {
    const { toggleSelectDishes, setToggleSelectDishes, selectedRes, setSelectedRes } = useContext(CartContext);
    const { dataRestaurant } = props;

    const handleSelect = (id) => {
        setToggleSelectDishes(true);
        setSelectedRes(id);

    }
    return (
        <div>
            <h3>{dataRestaurant?.content?.title} </h3>
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
                // pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="swiper-restaurant"
                style={{ padding: "  10px " }}
            >

                {
                    dataRestaurant?.content?.actions?.map((item, key) => {
                        return (
                            <SwiperSlide key={key} style={{ paddingRight: "10px  " }}>
                                {/* <NavLink
                                    style={{ textDecoration: "none" }}
                                    to={"/selectdishes/" + item?.restaurant_id}
                                > */}

                                <Card sx={{ maxWidth: 345 }}
                                    onClick={() => handleSelect(item?.restaurant_id)}
                                >
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
                                            <span className="text-danger">{item?.image_point_label ? " - " + item?.image_point_label : ""}</span>
                                        </Typography>

                                    </CardContent>

                                </Card>
                                {/* </NavLink> */}
                            </SwiperSlide>
                        )
                    })
                }
                {
                    dataRestaurant?.content?.items?.map((item, key) => {
                        // { console.log(item?.description?.id, item?.id) }
                        return (
                            <SwiperSlide key={key}>
                                {/* <NavLink
                                    style={{ textDecoration: "none" }}

                                    to={"/selectdishes/" + item?.id}
                                > */}
                                <Card sx={{ maxWidth: 345 }}
                                    onClick={() => handleSelect(item?.id)}
                                >
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={item?.image_url}
                                        title="green iguana"
                                    />
                                    <CardContent style={{ padding: "10px  " }} >
                                        <Typography gutterBottom variant="body1" component="div">
                                            {(item?.title?.text) ? item?.title?.text : item?.name}
                                        </Typography>
                                        {/* <Typography variant="body2" color="text.secondary">{item?.additional_info?.normal_text} */}
                                        {/* </Typography> */}

                                    </CardContent>

                                </Card>
                                {/* </NavLink> */}
                            </SwiperSlide>
                        )
                    })
                }



            </Swiper>
        </div>
    );
};
export default SwapeRestaurant;