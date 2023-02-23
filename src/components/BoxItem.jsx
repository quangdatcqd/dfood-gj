
import { React, useContext } from 'react';
import { CartContext } from '../Contexts/CartContext';
const BoxItem = (props) => {


    const { listmerchants } = props;
    const { toggleSelectDishes, setToggleSelectDishes, selectedRes, setSelectedRes } = useContext(CartContext);
    const handleSelect = (id) => {

        setToggleSelectDishes(true);
        setSelectedRes(id);

    }
    return (
        <div style={{ cursor: "pointer", display: "flex", justifyItems: "center", borderBottom: "rgb(234 234 234) solid 2px", padding: "10px 0px 30px 0px" }} onClick={() => handleSelect(listmerchants?.restaurant_id || listmerchants?.id)}>
            <div style={{ width: "110px", height: "110px", marginRight: "10px", borderRadius: "10px", overflow: "hidden" }}>
                <img width={"100%"} height={"100%"} style={{ objectFit: "cover" }} src={listmerchants?.image_url} alt="" />
            </div>
            <div style={{ width: "calc(100% - 130px)" }}>
                <p style={{ fontWeight: "bold", fontSize: "12pt", maxHeight: "24px", overflow: "hidden", marginBottom: "2px" }}>{listmerchants?.merchant_title?.text || listmerchants?.title?.text}</p>

                <p style={{ fontSize: "10pt", maxHeight: "24px", overflow: "hidden", marginBottom: "0px" }}>
                    {
                        listmerchants?.merchant_description?.merchant_description_badge?.image_url ? <img width={"20px"} src={listmerchants?.merchant_description?.merchant_description_badge?.image_url} alt="" /> : "$$$$ • "
                    }
                    {listmerchants?.merchant_description?.text || listmerchants?.description?.text}

                </p>
                <div style={{ borderTop: "2px dotted #dddddd", margin: "8px 0px" }} />
                <p style={{ fontWeight: "bold", fontSize: "10pt", maxHeight: "24px", overflow: "hidden", marginBottom: "3px" }}>{listmerchants?.additional_info?.highlighted_text || listmerchants?.merchant_additional_info?.highlighted_text} < span style={{ color: "gray", fontWeight: "normal" }}>{listmerchants?.additional_info?.normal_text || listmerchants?.merchant_additional_info?.normal_text}</span> </p>
                <p style={{ fontSize: "10pt", fontWeight: "bold", maxHeight: "24px", overflow: "hidden", marginBottom: "0px" }}>
                    <img width={"20px"} src={listmerchants?.tagline_two?.image_url || listmerchants?.merchant_tagline_two?.image_url} alt="" />
                    {listmerchants?.tagline_two?.text || listmerchants?.merchant_tagline_two?.text}
                </p>
            </div>

        </div >
    )
}

export default BoxItem;