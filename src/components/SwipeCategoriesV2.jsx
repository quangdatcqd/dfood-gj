import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { React, useContext } from 'react';
import { EffectCoverflow, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { CartContext } from '../Contexts/CartContext';
const SwipeCategoriesV2 = (props) => {
    const { products } = props;

    const { setToggleSelectDishes, setSelectedRes } = useContext(CartContext);
    const handleSelect = (id) => {
        setToggleSelectDishes(true);
        setSelectedRes(id);

    }
    return (
        <div>
            <hr />
            <h4 style={{ fontWeight: "bolder" }} >{products?.content?.title} </h4>
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
                className="mySwiper swipe-cateV2"
                style={{ padding: " 10px 0px " }}
            >

                {
                    products?.content?.actions?.map((item, key) => {
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

                                        sx={{ height: 130, width: "100%" }}
                                        image={item?.image_url}
                                        title="green iguana"
                                    />
                                    <CardContent style={{ padding: "5px  " }} >
                                        <Typography gutterBottom variant="body1" component="div" style={{ overflow: "hidden", maxHeight: "48px", textAlign: "left" }}>
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




            </Swiper >
        </div>
    );
}

export default SwipeCategoriesV2;
