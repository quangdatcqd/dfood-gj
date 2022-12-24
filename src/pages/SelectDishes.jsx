import { Avatar, AvatarGroup, Box, Card, CardContent, CardMedia, Divider, Paper, Stack, Typography, } from '@mui/material';
import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GojekAPI from '../API/GojekAPI';
import { styled } from '@mui/material/styles';
import BackBtn from '../components/BackBtn';
import QuantityInput from '../components/QuantityInput';
import { Container } from '@mui/system';
import Cartpreview from '../components/Cartpreview';
import ChoseOptions from '../components/ChoseOptions';

const SelectDishes = () => {

    const params = useParams();
    const [dataRestaurant, setDataRestaurant] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            var data = await GojekAPI.getRestaurant(params.id);
            setDataRestaurant(data);

        }
        fetchData();
    }, []);

    return (

        <div className='bg-light w-100'   >

            <Container>

                <Cartpreview />
                <BackBtn />
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
                        return (
                            <Box key={key}>
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
                                            <p style={{ fontSize: "16px", marginTop: "4px", marginBottom: "0", fontWeight: "bold" }}>
                                                Giá :   {item?.price}đ
                                            </p>
                                        </CardContent>
                                        <Box sx={{ position: 'relative', alignItems: 'center', pl: 1, pb: 1 }}>
                                            <QuantityInput data={item} />
                                        </Box>
                                    </Box>

                                </Card>
                                <Divider variant="inset" sx={{ listStyle: "none" }} className='m-0 mt-1' component="li" />
                            </Box>
                        )
                    })
                }
            </Container>
        </div >
    );

}
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default SelectDishes;
