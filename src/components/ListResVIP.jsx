import { Container } from '@mui/system';
import { React, useState, useEffect, useRef } from 'react';
import GojekAPI from '../API/GojekAPI';

const ListResVIP = ({ open }) => {

    const [dataRes, setDataRes] = useState([]);

    var page = useRef(1);
    const loop = useRef();
    useEffect(() => {
        loop.current = open;
    }, [open]);
    const fetchDataRes = async () => {

        while (true) {
            if (!loop.current) break;
            var data = await GojekAPI.getRessDeals(page.current);
            var dataR = null;

            for (const item of data?.data?.cards) {

                if (!loop.current) break;
                dataR = await GojekAPI.getRestaurantV5(item?.content?.id);
                var res = JSON.stringify(dataR?.data);
                var min = res.match("Đặt tối thiểu 100k");
                if (min?.index != undefined) {
                    setDataRes((dataRes) => [<BoxRestaurant data={item} dataR={dataR?.data?.cards[2]?.content?.offer_list?.discounts} key={Math.random()} />, ...dataRes])
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            if (dataR) page.current++;
            else break;
        }
    }

    useEffect(() => {

        page.current = 0;
        fetchDataRes();

    }, []);
    return (
        <Container
            className='container-com'
        >
            {
                dataRes
            }
            <button onClick={fetchDataRes}>Xem Tiếp</button>

        </Container>
    );
}

const BoxRestaurant = ({ data, dataR }) => {



    return (
        <div
            className={'box-restaurant '}
        //   onClick={() => handleSelect(listmerchants?.restaurant_id || listmerchants?.id)} 

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
