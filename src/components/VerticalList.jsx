import { Container } from "@mui/material";
import React from "react";
export function VerticalList({ itemData }) {
    const [verticalList, setVerticalList] = useState(itemData && itemData?.dataBody?.docs);
    const [loadingMB, setLoadingMB] = useState(false);
    const currentPage = useRef(itemData?.dataBody?.page);
    const isLastPage = useRef(false);
    const dispatch = useDispatch();

    const setIdRestaurant = (id) => {
        dispatch(setRestaurantId(id))
    }
    const handleLastpage = useDebouncedCallback(async () => {

        isLastPage.current = true;
        const data = await RestaurantAPI.verticalList(currentPage.current + 1, itemData?.dataUrl);
        setLoadingMB(false)
        currentPage.current = data?.dataBody?.page;
        setVerticalList([...verticalList, ...data?.dataBody?.docs]);
        isLastPage.current = false;
    }, 500)
    useEffect(() => {

        async function handleScroll() {
            const scrollableElement = document.body;
            if (window.scrollY + scrollableElement.clientHeight >= scrollableElement.scrollHeight && !isLastPage.current) {
                handleLastpage()
                setLoadingMB(true)
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return <Container >
        <div className={homeCss.titleVertical}>
            <p>{itemData?.title}</p>
        </div>

        <div className={homeCss.verticalList}>
            {verticalList?.map((item, index) => {

                return <div className={homeCss.verticalItem} key={index} onClick={() => setIdRestaurant(item?.dataBody?.docs[0]?.id)}>

                    {item?.dataBody?.docs[0]?.properties?.hasPromotion && <div className={homeCss.promoIcon} style={{ fontSize: 14 }}>PROMO</div>}
                    <img alt="Món ăn" className={homeCss.verticalItemImage} src={item?.dataBody?.docs[0]?.imageUrl}></img>

                    <div className={homeCss.verticalItemDe}>
                        <p className={homeCss.verticalItemDe1}>
                            {
                                item?.dataBody?.docs[0]?.properties?.isPartner && <img alt="Món ăn" width={20} src={partnerIcon} />
                            }
                            {item?.dataBody?.docs[0]?.title}</p>
                        <p className={homeCss.itemDescriptionp2}>
                            {
                                item?.dataBody?.docs[0]?.properties?.rate && <span style={{ marginLeft: 18 }}>
                                    <StarRateIcon />
                                    {item?.dataBody?.docs[0]?.properties?.rate} <span style={{ color: "gray" }}>
                                        ({item?.dataBody?.docs[0]?.properties?.totalRatings})</span> -

                                </span>
                            }
                            &nbsp;{(item?.dataBody?.docs[0]?.properties?.distance / 1000).toFixed(2)}km
                        </p>
                    </div>
                </div>


            })}
            {
                loadingMB &&
                <Box sx={{ textAlign: "center", padding: "20px 20px 500px 0px", width: "100%" }}>
                    <CircularProgress size={20} />
                </Box>
            }
        </div>
    </Container>
}