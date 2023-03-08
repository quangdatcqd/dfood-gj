import { Container } from '@mui/system';
import { React, useState, useLayoutEffect, useEffect, useRef, useContext } from 'react';
import GojekAPI from '../API/GojekAPI';
import { randomString } from '../common';
import { CartContext } from '../Contexts/CartContext';

const ListResVIP = ({ open }) => {

    const [dataRes, setDataRes] = useState([]);

    const page = useRef(1);
    const loop = useRef();
    const idToFind = useRef(randomString("0123456789", 10));
    useEffect(() => {
        loop.current = open;
    }, [open]);
    const fetchDataRes = async () => {

        // idToFind.current = await GojekAPI.getGenIDRes();
        console.log(idToFind.current);
        if (idToFind.current?.length <= 6) console.log("không lấy được ID để push");
        var dataResOffers = null;
        while (true) {
            if (!loop.current) break;
            var data = await GojekAPI.getRessDeals(page.current);
            for (const itemRes of data?.data?.cards) {
                var resOffers = {};
                var resNormal = {};
                if (!loop.current) break;
                var dataR = await GojekAPI.getRestaurantV5(itemRes?.content?.id);
                var discounts = dataR?.data?.cards[2]?.content?.offer_list?.discounts;
                if (discounts != null && discounts?.length >= 2) {
                    var bestRes = false;
                    var listOffer = [];
                    discounts?.map((itemDis) => {

                        var regex = /%/;

                        const checkNot = regex.test(itemDis?.title);
                        var offer = {
                            is_best_promo: false,
                            title: itemDis?.title,
                            line_items: itemDis?.line_items
                        }

                        if (!checkNot) {
                            var offerMax = Number(itemDis?.title?.match("[0-9]+"));
                            var listLineItems = [];
                            itemDis?.line_items?.map((itemLine) => {
                                var minOrder = itemLine?.text;
                                regex = /Đặt tối thiểu/;

                                const checkNot1 = regex.test(minOrder);
                                if (checkNot1) {
                                    minOrder = Number(minOrder?.match("[0-9]+"));
                                    var promoMax = Math.floor((offerMax / minOrder) * 100);
                                    if (promoMax >= 40) {
                                        bestRes = true;
                                        offer = {
                                            ...offer,
                                            is_best_promo: true,
                                            title: itemDis?.title + " - Giảm sâu " + promoMax + "%",
                                        }
                                    }
                                }
                            });
                        }
                        listOffer = [
                            ...listOffer,
                            offer
                        ]

                        // setDataRes((dataRes) => [<BoxRestaurant data={item} dataR={dataR?.data?.cards[2]?.content?.offer_list?.discounts} key={Math.random()} />, ...dataRes])

                    });
                    var resData = {

                        restaurant_name: itemRes?.content?.title?.text,
                        restaurant_id: itemRes?.content?.id,
                        image_url: itemRes?.content?.image_url,
                        addition_info: itemRes?.content?.additional_info?.highlighted_text + " - " + itemRes?.content?.additional_info?.normal_text,
                        discounts: listOffer
                    };
                    await GojekAPI.postDataRestaurant(idToFind.current, resData, bestRes);


                }
                // var res = JSON.stringify(dataR?.data);
                // var min = res.match("Đặt tối thiểu 100k");
                // if (min?.index != undefined) {
                //     setDataRes((dataRes) => [<BoxRestaurant data={item} dataR={dataR?.data?.cards[2]?.content?.offer_list?.discounts} key={Math.random()} />, ...dataRes])
                // }

                await new Promise(resolve => setTimeout(resolve, 800));
            }
            if (dataR) page.current++;
            else break;
        }
    }


    useEffect(() => {
        fetchDataRes();
        page.current = 0;
    }, []);

    return (
        <Container
            className='container-com'
        >
            <h3>ID: {idToFind.current}</h3>
            {
                // dataRes
            }

        </Container>
    );
}

const BoxRestaurant = ({ data, dataR }) => {
    const { setToggleSelectDishes, setSelectedRes } = useContext(CartContext);
    const handleSelect = (id) => {
        setToggleSelectDishes(true);
        setSelectedRes(id);


    }

    return (
        <div
            className={'box-restaurant '}
            onClick={() => handleSelect(data?.content?.id)}

        >
            {/* <p className='name-r  '>{data?.content?.title?.text}</p> */}
            <div className='box-res-image'>
                <img width={100} height={100} src={data?.content?.image_url} alt="" />
                {/* <img width={100} height={100} src={"https://s75-ava-talk.zadn.vn/5/7/7/a/3/75/9f6e8c3f40e1abb4c055c557618b0aab.jpg"} alt="" /> */}

            </div>
            <div className='box-res-content'>
                <h6 className=' fw-bold mb-1 '>{data?.content?.title?.text}</h6>
                {/* <h6 className=' fw-bold mb-1 '>Phúc Lộc Thọ</h6> */}
                <p className=' mb-1 '>{data?.content?.additional_info?.highlighted_text}   {data?.content?.additional_info?.normal_text} </p>
                {/* <p className=' mb-1 '>Giao hàng trong 24 phút</p> */}

                <div className='promos-title' >
                    {
                        dataR?.map((item, index) => {
                            var max, min, promoMax = 0;
                            var regex = /%/;
                            const checkNot = regex.test(item?.title);

                            if (!checkNot) {

                                max = Number(item?.title?.match("[0-9]+"));
                            }
                            return (
                                <div key={index} >
                                    <p className='promos-title-max'>{item?.title}</p>
                                    {/* <p className='promos-title-max'>Giảm giá 50k</p> */}


                                    {
                                        item?.line_items?.map((item1, index1) => {
                                            var regex = /Đặt tối thiểu/;
                                            const checkNot1 = regex.test(item1?.text);
                                            if (!checkNot, checkNot1) {
                                                min = Number(item1?.text?.match("[0-9]+"));
                                                promoMax = (max / min) * 100;
                                                var active = promoMax >= 40 ? "active-promo-title" : ""

                                            }

                                            return (
                                                <p className={'promos-title-min ' + active} key={index1}>{item1?.text}  - {(promoMax >= 0 && !checkNot) && Math.floor(promoMax) + "% "} {active && "- Giảm sâu"} </p>
                                            )
                                        })
                                    }
                                    <hr className='my-1' />
                                </div>

                            )
                        })
                    }


                </div>
            </div>
        </div>
    )
}
export default ListResVIP;
