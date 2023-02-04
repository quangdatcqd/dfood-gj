import { React, useContext } from 'react';
import { CartContext } from '../Contexts/CartContext';
const ListItems = (props) => {
    const { listmerchants } = props;

    return (
        <div>
            <hr />
            <h4 style={{ fontWeight: "bolder" }} >{listmerchants?.content?.title} </h4>
            {
                listmerchants?.content?.actions?.map((item, key) => {
                    return (
                        <BoxItem listmerchants={item} key={key} />
                    )
                })
            }
            {
                listmerchants?.content?.items?.map((item, key) => {
                    return (
                        <BoxItem listmerchants={item} key={key} />
                    )
                })
            }
            <div
                style={{
                    width: "100%",
                    textAlign: "center"
                }}
            >
                <button style={{
                    padding: "10px 15px",
                    color: "green",
                    border: "2px solid green",
                    outline: "none",
                    fontWeight: "bold",
                    fontSize: "14pt",
                    borderRadius: "30px",
                    width: "350px",
                    backgroundColor: "white",
                    margin: "10px"

                }}>Xem thêm nhà hàng</button>
            </div>
        </div>
    );
}

const BoxItem = (props) => {
    const { listmerchants } = props;
    const { toggleSelectDishes, setToggleSelectDishes, selectedRes, setSelectedRes } = useContext(CartContext);
    const handleSelect = (id) => {
        setToggleSelectDishes(true);
        setSelectedRes(id);
    }
    return (
        <div style={{ display: "flex", justifyItems: "center", borderBottom: "rgb(234 234 234) solid 2px", padding: "10px 0px 30px 0px" }} onClick={() => handleSelect(listmerchants?.id)}>
            <div style={{ width: "110px", height: "110px", marginRight: "10px", borderRadius: "10px", overflow: "hidden" }}>
                <img width={"100%"} height={"100%"} style={{ objectFit: "cover" }} src={listmerchants?.image_url} alt="" />
            </div>
            <div style={{ width: "calc(100% - 130px)" }}>
                <p style={{ fontWeight: "bold", fontSize: "12pt", maxHeight: "24px", overflow: "hidden", marginBottom: "2px" }}>{listmerchants?.merchant_title?.text}</p>
                <p style={{ fontWeight: "bold", fontSize: "12pt", maxHeight: "24px", overflow: "hidden", marginBottom: "2px" }}>{listmerchants?.title?.text}</p>
                <p style={{ fontSize: "10pt", maxHeight: "24px", overflow: "hidden", marginBottom: "0px" }}>
                    <img width={"20px"} src={listmerchants?.merchant_description?.merchant_description_badge?.image_url} alt="" />
                    {listmerchants?.merchant_description?.text}
                    {listmerchants?.description?.text}
                </p>
                <hr style={{ margin: "8px 0px" }} />
                <p style={{ fontWeight: "bold", fontSize: "10pt", maxHeight: "24px", overflow: "hidden", marginBottom: "3px" }}>{listmerchants?.additional_info?.highlighted_text}  <span style={{ color: "gray", fontWeight: "normal" }}>{listmerchants?.additional_info?.normal_text}</span> </p>
                <p style={{ fontSize: "10pt", fontWeight: "bold", maxHeight: "24px", overflow: "hidden", marginBottom: "0px" }}>
                    <img width={"20px"} src={listmerchants?.tagline_two?.image_url} alt="" />
                    {listmerchants?.tagline_two?.text}
                </p>
            </div>

        </div>
    )
}

export default ListItems;
