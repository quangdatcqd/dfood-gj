import { Avatar, AvatarGroup, Box, Card, CardContent, CardMedia, Divider, Paper, Stack, Typography, } from '@mui/material';
import { React, useState, useContext, useEffect } from 'react';
import GojekAPI from '../API/GojekAPI';
import { styled } from '@mui/material/styles';
import BackBtn from '../components/BackBtn';
import QuantityInput from '../components/QuantityInput';
import { Container } from '@mui/system';
import Cartpreview from '../components/Cartpreview';
import ChoseOptions from '../components/ChoseOptions';
import { CartContext } from '../Contexts/CartContext';
import { fomatCurrency } from '../common';
import LazyLoad from 'react-lazyload'
const SelectDishes = () => {

    const { selectedItems, setMerchantData, toggleSelectDishes, setToggleSelectDishes, selectedRes, setSelectedRes } = useContext(CartContext);


    const [dataRestaurant, setDataRestaurant] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            var data = await GojekAPI.getRestaurant(selectedRes);
            setDataRestaurant(data);
            setMerchantData(data)
            localStorage.setItem("merchantLoc", JSON.stringify(data))

        }
        fetchData();
    }, []);

    return (

        <div className='bg-light w-100  '   >
            <Container>
                <Cartpreview />
                <BackBtn to={"/restaurant"} />
                <Box>
                    <Stack spacing={2}>
                        <Item >
                            <AvatarGroup>
                                <Box className={"w-100"}>
                                    <Typography gutterBottom variant="h5" align={"justify"} className={"w-100"} component="div">{dataRestaurant?.restaurant?.brand?.name} </Typography>
                                    <Typography gutterBottom variant="body1" align={"justify"} className={"w-100"} component="div">{dataRestaurant?.restaurant?.address} </Typography>
                                </Box>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={dataRestaurant?.restaurant?.brand?.logo_url ? dataRestaurant?.restaurant?.brand?.logo_url : "/khay.JPG"}
                                    sx={{ width: 56, height: 56 }}
                                />
                            </AvatarGroup>
                        </Item>
                    </Stack>
                </Box>
                {/* {console.log(dataRestaurant?.items[0])} */}
                {
                    dataRestaurant?.items?.map((item, key) => {
                        var indexItem = selectedItems?.findIndex((itemsl) => itemsl?.uuid === item?.id);

                        return (
                            !item?.in_stock ? "" :
                                <LazyLoad key={key} placeholder={<Loading />}>
                                    <Box  >
                                        <Card sx={{ display: 'flex', }}>
                                            <CardMedia
                                                component="img"
                                                sx={{ width: 100 }}
                                                image={item?.image ? item?.image : "/khay.JPG"}
                                                alt="Live from space album cover"
                                            />
                                            <Box sx={{ display: 'flex', width: "100%", flexDirection: 'column' }}>
                                                <CardContent sx={{ flex: '1 0 auto', padding: "6px 1px 0px 8px" }}>
                                                    <p style={{ fontSize: "16px", marginTop: "  0", marginBottom: "2px", fontWeight: "bold" }}>
                                                        {item?.name.length <= 50 ? item?.name : (item?.name.substr(0, 50) + "...")}
                                                    </p>
                                                    <Typography component="div" style={{ overflow: "hidden" }} variant="body2">
                                                        {item?.description <= 60 ? item?.description : (item?.description !== undefined) ? (item?.description?.substr(0, 60) + "...") : ""}
                                                    </Typography>
                                                    <p style={{ fontSize: "14px", marginBottom: "30px", fontWeight: "bold" }}>
                                                        Giá :   {
                                                            item?.promotion?.selling_price ? fomatCurrency(item?.promotion?.selling_price) + " - " : fomatCurrency(item?.price)
                                                        }     <strike> {item?.promotion?.selling_price ? fomatCurrency(item?.price) : ""}</strike>
                                                    </p>
                                                </CardContent>
                                                <Box sx={{ position: 'relative', alignItems: 'center', pl: 1, pb: 1 }}>
                                                    {
                                                        indexItem >= 0 ? <span style={{ color: "red", fontSize: "14pt", fontWeight: "bold" }}>    Đã chọn: X{selectedItems[indexItem]?.quantity}  </span>

                                                            : ""
                                                    }
                                                    {
                                                        item?.in_stock ? <QuantityInput data={item} /> : <p style={{ color: "red", textAlign: "right", marginBottom: "0px", paddingRight: "10px", fontWeight: "bold" }}>Hết món</p>
                                                    }
                                                    {/* <QuantityInput data={item} /> */}
                                                </Box>
                                            </Box>
                                        </Card>
                                        <Divider variant="inset" sx={{ listStyle: "none" }} className='m-0 mt-1' component="li" />
                                    </Box>
                                </LazyLoad>
                        )
                    })
                }
            </Container>
        </div >
    );

}
const Loading = () => (
    <div className="post loading">
        <h5>Loading...</h5>
    </div>
)
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default SelectDishes;
