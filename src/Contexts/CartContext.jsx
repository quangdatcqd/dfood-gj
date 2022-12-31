import React, { createContext, useState, useLayoutEffect, useEffect } from 'react';

const CartContext = createContext();


function CartProvider({ children }) {
    const [variants, setVariants] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [payload, setPayload] = useState([]);
    const [quantity, setQuantity] = useState();
    const [merchantData, setMerchantData] = useState(JSON.parse(localStorage.getItem("merchantLoc")));
    const [locData, setLocData] = useState([]);

    const [discountPrice, setDiscountPrice] = useState(0);

    var customerData;
    var merchantDatas;
    const handleVariant = (newVariant) => {
        setVariants(newVariant);

    }
    const handleSelectItem = (newItem) => {

        if (newItem?.quantity <= 0) return "";
        var index = getIndex(newItem?.itemId);
        //    var  check = localStorage.getItem("payload");
        // if (check ? JSON.parse(localStorage.getItem("payload"))?.restaurant_uuid != merchantData?.restaurant?.id) {


        //     return "";
        // } 

        if (index >= 0 && (selectedItems[index]?.variants?.length <= 0 && variants?.length <= 0) || (selectedItems[index]?.variants === variants)) {

            const newArray = selectedItems.map((item, i) => {
                if (index === i) {
                    return { ...item, quantity: (newItem?.quantity > 0) ? newItem?.quantity : 1 };
                } else {
                    return item;
                }
            });

            setSelectedItems(newArray)
            setVariants([]);
        }
        else {

            var data = {
                itemId: newItem?.itemId,
                itemName: newItem?.itemName,
                notes: "",
                price: Number(newItem?.price),
                promoId: newItem?.promoId,
                quantity: (newItem?.quantity > 0) ? newItem?.quantity : 1,
                variants: variants,
                uuid: newItem?.uuid,
                promoPrice: newItem?.promoPrice
            };

            setSelectedItems(crr => [...crr, data]);
            setVariants([]);
        }
        handlePayload();
    }

    const handleDeleteItem = (data) => {
        var index = getIndex(data?.itemId);
        var carArr = selectedItems;


        if (index >= 0 && data?.quantity >= 1) {
            const newArray = selectedItems.map((item, i) => {
                if (index === i) {
                    return { ...item, quantity: data?.quantity };
                } else {
                    return item;
                }
            });

            setSelectedItems(newArray)
            setVariants([]);

        } else {


            if (index >= 0) {
                carArr.splice(index, 1);
            }

            setSelectedItems(carArr);
            setVariants([]);
        }

        handlePayload();
    }

    const resetCart = () => {

        setSelectedItems([]);
        setDiscountPrice(0);
        setVariants([]);
        setPayload("");
        localStorage.setItem("payload", "");
        localStorage.setItem("selectedItems", "");


    }
    // useEffect(() => {
    //     resetCart();
    //     setLocData([])
    // }, [merchantData]);



    useEffect(() => {
        handlePayload();
    }, [selectedItems]);


    useEffect(() => {

        // setTimeout(() => {
        setPayload(localStorage.getItem("payload") != "" ? JSON.parse(localStorage.getItem("payload")) : "");
        setSelectedItems(
            localStorage.getItem("selectedItems") != "" ? JSON.parse(localStorage.getItem("selectedItems")) : []
        );

        // }, 2000);

    }, []);
    const getIndex = (id) => {
        var index = selectedItems && selectedItems.findIndex((selectedItems) => {
            return selectedItems.itemId === id;
        });
        return index;
    }

    const handlePayload = () => {

        var discount = 0;
        var total = 0;
        var price = 0;
        var items = [];

        selectedItems && selectedItems?.map((item, key) => {

            // console.log(((Number(item?.variants[1]) > 0) ? Number(item?.variants[1]) : 0) + Number(item?.price))
            if (Number(item?.promoPrice) > 0) {
                price = ((Number(item?.variants[1]) > 0) ? Number(item?.variants[1]) : 0) + Number(item?.promoPrice);
            } else {
                price = (((Number(item?.variants[1]) > 0) ? Number(item?.variants[1]) : 0) + Number(item?.price));
            }

            if (Number(item?.price) > 0) {
                total += (Number(item?.quantity) * (((Number(item?.variants[1]) > 0) ? Number(item?.variants[1]) : 0) + Number(item?.price)));
            }

            items.push({
                itemId: item?.itemId,
                itemName: item?.itemName,
                notes: "",
                price: price,
                promoId: item?.promoId,
                quantity: item?.quantity,
                variants: item?.variants[0],
                uuid: item?.uuid,
            })
            if (Number(item?.promoPrice) > 0) discount += (Number(item?.quantity) * (Number(item?.price) - Number(item?.promoPrice)));
        });
        customerData = JSON.parse(localStorage.getItem("customerLoc"));


        var data = {
            apply_offer: true,
            cart_price: total,
            customer_location: customerData?.latitude + "," + customerData?.longitude,
            items: items,
            merchant_location: merchantData?.restaurant?.location,
            offer_id: "",
            offer_type: "",
            payment_types: [
            ],
            promo_discount_cart_price: discount,
            restaurant_uuid: merchantData?.restaurant?.id
        }

        setPayload(data);
    }

    const actions = {
        variants,
        selectedItems,
        handleVariant,
        handleSelectItem,
        handleDeleteItem,
        quantity,
        payload,
        handlePayload,
        setMerchantData,
        merchantData,
        locData,
        setLocData,
        resetCart
    }

    return (
        <CartContext.Provider value={actions}>
            {children}
        </CartContext.Provider>
    );
}

export { CartProvider, CartContext };
