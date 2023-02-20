import { Avatar, AvatarGroup, Box, Card, CardContent, CardMedia, Divider, Paper, Stack, Typography, } from '@mui/material';
import { React, useState, useContext, useEffect, memo } from 'react';

import GojekAPI from '../API/GojekAPI';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/system';
import Cartpreview from '../components/Cartpreview';
import { CartContext } from '../Contexts/CartContext';
import { fomatCurrency } from '../common';
import BoxBtnSelect from '../components/BoxBtnSelect';
const SelectDishes = () => {
    console.log("rerender")
    const { setMerchantData, resetCart, setToggleSelectDishes, selectedRes, merchantData } = useContext(CartContext);
    const [dataRestaurant, setDataRestaurant] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            var data = await GojekAPI.getRestaurant(selectedRes);
            checkResetCart(data);
            setDataRestaurant(data);

            setMerchantData(data)


            localStorage.setItem("merchantLoc", JSON.stringify(data))

        }

        fetchData();
        const checkResetCart = (data) => {


            if (data?.restaurant?.id !== merchantData?.restaurant?.id) {
                resetCart();
            }

        }


    }, []);

    return (


        <Container className="mb-5 pb-5 container-com">

            <Cartpreview />
            {/* <BackBtn to={"/restaurant"} /> */}
            <Box className='mb-2'>
                <Stack spacing={2}>
                    <Item >
                        <AvatarGroup className='d-flex align-items-center'>
                            <Box className={"w-100 h6"}>
                                {dataRestaurant?.restaurant?.address}
                            </Box>
                            <Avatar
                                alt="Remy Sharp"
                                src={dataRestaurant?.restaurant?.brand?.logo_url ? dataRestaurant?.restaurant?.brand?.logo_url : "/khay.JPG"}
                                sx={{ width: 40, height: 40 }}
                            />
                        </AvatarGroup>
                    </Item>
                </Stack>
            </Box>
            {/* {console.log(dataRestaurant?.items[0])} */}
            {
                dataRestaurant?.items?.map((item, key) => {
                    // var indexItem = selectedItems?.findIndex((itemsl) => itemsl?.uuid === data?.id);

                    return (
                        !item?.in_stock ? "" :
                            // <LazyLoad key={key} placeholder={<Loading />}>
                            <ItemSelect key={key} data={item} />
                        // </LazyLoad>
                    )
                })
            }
        </Container>

    );

}



const ItemSelect = memo((props) => {
    const { data } = props;



    return (
        <div style={{ borderTop: "2px dotted #dddddd", margin: "8px 0px", display: "flex", padding: "10px", backgroundColor: "white", borderRadius: "20px" }}   >

            <CardMedia
                component="img"
                sx={{ width: 100, borderRadius: "20px" }}
                image={data?.image ? data?.image : "/khay.JPG"}
                alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', width: "100%", flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto', padding: "6px 1px 0px 8px" }}>
                    <p style={{ fontSize: "16px", marginTop: "  0", marginBottom: "2px", fontWeight: "bold" }}>
                        {data?.name.length <= 50 ? data?.name : (data?.name.substr(0, 50) + "...")}
                    </p>
                    <Typography component="div" style={{ overflow: "hidden", padding: "5px 0px" }} variant="body2">
                        {data?.description <= 60 ? data?.description : (data?.description !== undefined) ? (data?.description?.substr(0, 60) + "...") : ""}
                    </Typography>
                    <p style={{ fontSize: "14px", marginBottom: "30px", fontWeight: "bold" }}>
                        {
                            data?.promotion?.selling_price ? fomatCurrency(data?.promotion?.selling_price) : fomatCurrency(data?.price)
                        }   &nbsp;  <strike style={{ color: "gray" }}> {data?.promotion?.selling_price ? fomatCurrency(data?.price) : ""}</strike>
                    </p>
                </CardContent>
                <Box sx={{ position: 'relative', alignItems: 'center', pl: 1, pb: 1 }}>

                    {
                        data?.in_stock ? <BoxBtnSelect data={data} /> : <p style={{ color: "red", textAlign: "right", marginBottom: "0px", paddingRight: "10px", fontWeight: "bold" }}>Hết món</p>
                    }
                    {/* <QuantityInput data={item} /> */}
                </Box>
            </Box>



        </div>
    )
})

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default SelectDishes;
