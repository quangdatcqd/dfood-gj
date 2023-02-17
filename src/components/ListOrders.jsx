import { Container } from '@mui/material';
import React from 'react';

const ListOrders = ({ data, setToggleOderDetail, setIdOrder }) => {

    return (

        <div className='box-list-orders'>
            <Container className='container-list-orders' maxWidth="sm" >
                {
                    data?.cards ? data?.cards?.map((item, key) => {
                        return (
                            <div className='item-order' key={key}

                                onClick={() => {
                                    setToggleOderDetail(true);
                                    setIdOrder(item?.content?.order?.order_number)
                                }}
                            >
                                <p className='name-r'>{item?.content?.restaurant?.address}</p>
                                <p
                                    className='status-r'
                                    style={item?.content?.order?.order_status == 0 ? { color: "green" } : { color: "red" }}
                                >{item?.content?.order?.order_status_text}</p>
                                <p className='time-r'>{item?.content?.order?.ordered_at}</p>
                            </div>
                        )
                    })
                        :
                        "Không có gì cả"
                }



            </Container>
        </div>

    );
}

export default ListOrders;
