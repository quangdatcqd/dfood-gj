import { Container } from '@mui/material';
import React from 'react';

const ListOrders = ({ data, setToggleOderDetail, setIdOrder, dataActive }) => {

    return (

        <div className='box-list-orders'>
            <Container className='container-list-orders' maxWidth="sm" >
                {
                    data?.cards?.length > 0 && data?.cards?.map((item, key) => {
                        return (
                            <div className='item-order' key={key}

                                onClick={() => {
                                    setToggleOderDetail(true);
                                    setIdOrder(item?.content?.order?.order_number)
                                }}
                            >
                                <p className='name-r'>{item?.content?.restaurant?.name}</p>
                                <p
                                    className='status-r'
                                    style={item?.content?.order?.order_status == 0 ? { color: "green" } : { color: "red" }}
                                >{item?.content?.order?.order_status_text}</p>
                                <p className='time-r'>{item?.content?.order?.ordered_at}</p>
                            </div>
                        )
                    })

                }

                {
                    dataActive?.cards?.length > 0 && dataActive?.cards?.map((itemactive, key) => {

                        return (

                            <div className='item-order' key={key}

                                onClick={() => {
                                    setToggleOderDetail(true);
                                    setIdOrder(itemactive?.event_tracking_properties?.order_id)
                                }}
                            >
                                <p className='name-r'>{itemactive?.estate?.body_components[2]?.payload?.text}</p>
                                <p className='status-r' >{itemactive?.estate?.body_components[0]?.payload?.title}</p>

                            </div>
                        )
                    })

                }



            </Container>
        </div>

    );
}

export default ListOrders;
