import { Container, LinearProgress } from '@mui/material';
import { debounce } from 'debounce';
import { React, useCallback, useEffect, useState, useContext } from 'react';

import SwapeRestaurant from '../components/SwapeRestaurant';
import { GojekAPI } from '../API/GojekAPI';
import './style.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ListItems from '../components/ListItems';
import { useDispatch } from 'react-redux';
import { setResId } from '../store/dialogSlice';
import SwipeCategoriesV2 from '../components/SwipeCategoriesV2';


function SearchBox(props) {

    const [dataRestaurant, setDataRestaurant] = useState("");
    const [dataResFilter, setDataResFilter] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const [dataSearchSuggestions, setDataSearchSuggestions] = useState("");
    const [keyword, setKeyword] = useState("");


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

    useEffect(() => {
        debounceDropDown(keyword)
    }, [keyword]);
    const fetchRestaurant = async (keyword) => {
        keyword = keyword.trim();
        if (keyword.length <= 2) {
            setDataRestaurant(null);
            return "";
        }
        setSearchLoading(true)
        var data = await GojekAPI.searchRestaurant(keyword);
        setDataRestaurant(data?.data);
        setDataResFilter(null)
        setSearchLoading(false)
    }
    const debounceDropDown = useCallback(debounce((nextValue) => fetchRestaurant(nextValue), 500), [])

    const handleChangeKeyword = async (e) => {
        //https://api.gojekapi.com/gofood/consumer/v1/app-links/CxG1P1q?full_url=https%3A%2F%2Fgofood.link%2Fa%2FCxG1P1q

        const regex = /https/;
        if (regex.test(e.target.value)) {
            const regexID = /[0-9a-zA-Z]{7}/;
            const matchID = e.target.value?.match(regexID);
            const result = await GojekAPI.searchRestaurantByURL(matchID && matchID[0]);
            const regex = /\/([a-f\d-]+)\?/i;
            const match = JSON.stringify(result)?.match(regex);
            const id = match && match[1];
            if (id) {
                handleSelectRes(id)
            }
        }
        else {
            setKeyword(e.target.value);
        }
    }
    const handleClickMore = async () => {
        setSearchLoading(true)
        var data = await GojekAPI.searchRestaurantMore(keyword);
        setDataResFilter(data);
        setDataRestaurant(null)
        setSearchLoading(false)

    }

    const dispatch = useDispatch();
    const handleSelectRes = (id) => {
        dispatch(setResId(id))
    }

    return (
        <>
            < div className='divInputSearchRes'>
                <div className='boxInputSearchRes'>
                    <ArrowBackIcon className='btnBackSearchInput' />
                    <input
                        id="restaurant"
                        name="restaurant"
                        placeholder='Bạn muốn ăn gì nào?'
                        onChange={handleChangeKeyword}
                        className="inputSearRestaurant"
                        autoFocus={true}
                        value={keyword}
                    />
                    <HighlightOffIcon className='btnClearSearchInput' onClick={() => setKeyword("")} />
                </div>
            </div >
            <Container className='restauRantContainer'>

                {/* <Button className="materialBtn">
                Clear
            </Button> */}
                <div className='query-result'>

                    {
                        dataResFilter !== null &&
                        <div className='boxSearchMore'>
                            <ListItems listmerchants={dataResFilter} />
                        </div>
                    }
                    {
                        searchLoading && <LinearProgress variant="indeterminate" color="secondary" force sx={{ marginBottom: "5px", backgroundColor: "rgb(239, 194, 149)" }} />
                    }

                    {
                        dataRestaurant?.cards !== null &&
                        <>
                            {
                                indexBrandOutlet >= 0 && < SwipeCategoriesV2 products={dataRestaurant?.cards[indexBrandOutlet]} handleSelectRes={handleSelectRes} />
                            }

                            {
                                // indexTouchToSearch >= 0 && < TouchToSearch touchtosearch={dataRestaurant?.cards[indexTouchToSearch]} />
                            }
                            {
                                indexListMerchants >= 0 && <ListItems listmerchants={dataRestaurant?.cards[indexListMerchants || dataRestaurant?.cards]} handleClickMore={handleClickMore} />
                            }
                            {
                                indexBrandOutletV1 >= 0 && < SwipeCategoriesV2 products={dataRestaurant?.cards[indexBrandOutletV1]} />
                            }
                            {
                                indexSearchSuggestions >= 0 && <SearchSuggestions searchsuggestions={dataSearchSuggestions?.cards[indexSearchSuggestions]} setKeyword={setKeyword} />
                            }
                            {
                                indexSearchExolore >= 0 && <ExploreItems exploreitems={dataSearchSuggestions?.cards[indexSearchExolore]} />
                            }
                        </>

                    }

                </div>

            </Container>
        </>
    );
};


const SearchSuggestions = (props) => {
    const { searchsuggestions, setKeyword } = props;
    return (
        <div className='boxSearchSG'>

            <p className='categoryTitle'  >{searchsuggestions?.content?.title} </p>
            <div style={{ width: "100%", display: "flex", flexWrap: "wrap", }}>
                {
                    searchsuggestions?.content?.terms?.map((item, key) => {
                        return (
                            <div className='keywordSG' key={key} onClick={() => setKeyword(item?.name)} >
                                {item?.name}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const ExploreItems = (props) => {
    const { exploreitems } = props;
    return (
        <div className='boxExploreItems'>
            <p className="categoryTitle"  >{exploreitems?.content?.title} </p>
            <div className='listExploreItems'  >
                {
                    exploreitems?.content?.categories?.map((item, key) => {
                        return (
                            <div key={key} className='divExploreItem' >
                                <img width="100%" height={150} style={{ objectFit: "cover", borderRadius: "20px" }} src={item?.image_url} alt="" />
                                <p style={{ fontSize: "16px", fontWeight: "bold", padding: "10px", textAlign: "center", margin: "0px" }}>{item?.name} </p>
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
        <div className='boxTouchToSearch'>
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
export default SearchBox;
