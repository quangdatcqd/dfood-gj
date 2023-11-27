
import React from 'react';
import './style.css'
const SwipeCategories = (props) => {
    const { data } = props;
    return (

        <div className='listSwipeCategories'>
            {
                data?.content?.actions?.map((item, index) => {
                    return <div className='boxSwipeCategories' key={index}  >
                        <img
                            src={item?.image_url}
                            title="green iguana"
                        />
                        <p > {item?.description}</p>
                    </div>
                })
            }
        </div>
    );
}

export default SwipeCategories;
