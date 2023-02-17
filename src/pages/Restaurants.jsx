import { TextField, Box, Container } from '@mui/material';
import { debounce } from 'debounce';
import { React, useCallback, useEffect, useState, useContext } from 'react';

import SwapeRestaurant from '../components/SwapeRestaurant';
import GojekAPI from '../API/GojekAPI';
import './style.css'
import BackBtn from '../components/BackBtn';
import Cartpreview from '../components/Cartpreview';
import ListItems from '../components/ListItems';
import { CartContext } from '../Contexts/CartContext';
import InputBox from '../components/InputBox';


function Restaurants(props) {

    const { toggleSelectDishes, setToggleSelectDishes } = useContext(CartContext);
    // const { dataAddress } = props;

    const [dataRestaurant, setDataRestaurant] = useState("");
    const [dataSearchSuggestions, setDataSearchSuggestions] = useState("");


    var indexBrandOutlet = dataRestaurant?.cards?.findIndex((item) => item?.card_template === "BRAND_OUTLETS");
    var indexBrandOutletV1 = dataRestaurant?.cards?.findIndex((item) => item?.card_template === "GOFOOD_QUERY_UNDERSTANDING_BRAND");
    var indexTouchToSearch = dataRestaurant?.cards?.findIndex((item) => item?.card_template === "GOFOOD_QUERY_UNDERSTANDING_DISH");
    var indexListMerchants = dataRestaurant?.cards?.findIndex((item) => item?.card_template === "GOFOOD_QUERY_UNDERSTANDING_RESTAURANT");
    var indexSearchSuggestions = dataSearchSuggestions?.cards?.findIndex((element) => element?.card_template === "TOP_SEARCHES");
    var indexSearchExolore = dataSearchSuggestions?.cards?.findIndex((element) => element?.card_template === "TOP_CATEGORIES");



    useEffect(() => {
        const fetchSearchSuggestions = async () => {
            var data = await GojekAPI.searchSuggestions();
            setDataSearchSuggestions(data?.data);

        }
        fetchSearchSuggestions();

    }, []);

    const fetchRestaurant = async (keyword) => {
        if (keyword.length <= 0) return "";
        var data = await GojekAPI.searchRestaurant(keyword);
        setDataRestaurant(data?.data);


    }
    const debounceDropDown = useCallback(debounce((nextValue) => fetchRestaurant(nextValue), 500), [])

    const handleChangeKeyword = (e) => {
        // if (e.target.value != "")
        debounceDropDown(e.target.value);
    }




    return (
        <div className='bg-light w-100  mt-2'   >
            {/* <BackBtn /> */}
            <Cartpreview />
            <Container >
                < Box
                    sx={{
                        paddingTop: "10px",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                    }}
                >
                    <InputBox
                        id="restaurant"

                        name="restaurant"
                        // value={keyword}
                        placeholder='Bạn muốn ăn gì nào?'
                        // autoComplete="address"
                        // style={{
                        //     width: "100%",
                        //     padding: "8px 30px",
                        //     border: "none",
                        //     borderRadius: "20px",
                        //     outline: "none",
                        //     fontSize: "14pt",
                        //     textAlign: "left",
                        //     color: "gray",
                        //     fontWeight: "bold",
                        //     boxShadow: "0px 0px 5px 5px #e9e9e9"

                        // }}
                        onChange={handleChangeKeyword}
                    />
                </Box >
                {/* <Button onClick={() => setKeyword("")} className="materialBtn">
                Clear
            </Button> */}

                {
                    dataRestaurant?.cards !== null &&
                    <div className='query-result'>
                        {
                            indexBrandOutlet >= 0 && < SwapeRestaurant dataRestaurant={dataRestaurant?.cards[indexBrandOutlet]} setToggleSelectDishes={setToggleSelectDishes} />
                        }
                        {
                            // indexBrandOutletV1 >= 0 && < SwapeRestaurant dataRestaurant={dataRestaurant?.cards[indexBrandOutletV1]} />
                        }
                        {
                            indexTouchToSearch >= 0 && < TouchToSearch touchtosearch={dataRestaurant?.cards[indexTouchToSearch]} />
                        }
                        {
                            indexListMerchants >= 0 && <ListItems listmerchants={dataRestaurant?.cards[indexListMerchants]} />
                        }
                        {
                            indexSearchSuggestions >= 0 && <SearchSuggestions searchsuggestions={dataSearchSuggestions?.cards[indexSearchSuggestions]} />
                        }
                        {
                            indexSearchExolore >= 0 && <ExploreItems exploreitems={dataSearchSuggestions?.cards[indexSearchExolore]} />
                        }
                    </div>
                }

            </Container>
        </div >
    );
};


const SearchSuggestions = (props) => {
    const { searchsuggestions } = props;
    return (
        <div>

            <h4 style={{ fontWeight: "bolder" }} >{searchsuggestions?.content?.title} </h4>
            <div style={{ width: "100%", display: "flex", flexWrap: "wrap", }}>
                {
                    searchsuggestions?.content?.terms?.map((item, key) => {
                        return (
                            <div key={key} style={{
                                fontSize: "14pt",
                                fontWeight: "bold",
                                borderRadius: "20px",
                                padding: "4px 15px",
                                border: "#e2e2e2 solid 2px",
                                color: "green",
                                margin: "5px 10px 5px 0px"
                            }}>
                                {item?.name}
                            </div>
                        )
                    })
                }
            </div>
            <hr />
        </div>
    )
}

const ExploreItems = (props) => {
    const { exploreitems } = props;
    return (
        <div>
            <h4 style={{ fontWeight: "bolder" }} >{exploreitems?.content?.title} </h4>
            <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
                {
                    exploreitems?.content?.categories?.map((item, key) => {
                        return (
                            <div key={key} style={{ width: "33.33%", overflow: "hidden", padding: "5px", }}>
                                <img width="100%" height={"160px"} style={{ objectFit: "cover", borderRadius: "20px" }} src={item?.image_url} alt="" />
                                <p style={{ fontSize: "14pt", fontWeight: "bold", padding: "10px", textAlign: "center", margin: "0px" }}>{item?.name} </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}




const TouchToSearch = (props) => {
    const { touchtosearch } = props;

    return (
        <div>
            <h4 style={{ fontWeight: "bolder" }} >{touchtosearch?.content?.title} </h4>
            <div
                style={{
                    padding: "10px 15px ",
                    boxShadow: " #c8c8c8 0px 0px 6px 0px ",
                    borderRadius: "10px",
                    marginBottom: "10px",
                    fontSize: "15pt",
                    fontWeight: "bold",
                    color: "green",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"


                }}
            >
                <div>
                    <img width={"30px"} style={{ marginRight: "10px" }} src={touchtosearch?.content?.primary_pill?.secondary_icon_url} alt="" />

                    <span>{touchtosearch?.content?.primary_pill?.title}</span>
                </div>
                <img width={"50px"} style={{ borderRadius: "10px" }} src={touchtosearch?.content?.primary_pill?.primary_icon_url} alt="" />

            </div>
            <div style={{ width: "100%", display: "flex", flexWrap: "wrap-reverse", }}>
                {
                    touchtosearch?.content?.terms?.map((item, key) => {
                        return (
                            <div key={key} style={{
                                fontSize: "14pt",
                                fontWeight: "bold",
                                borderRadius: "20px",
                                padding: "4px 13px",
                                border: "#e2e2e2 solid 2px",
                                color: "green",
                                margin: "5px 10px 5px 0px",

                            }}>
                                {item?.name}
                            </div>
                        )
                    })
                }
            </div>



        </div>

    )
}
export default Restaurants;
