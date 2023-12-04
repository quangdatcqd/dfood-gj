import { React, useState, useCallback } from 'react';
import { debounce } from "debounce";
import { GojekAPI } from '../../../../API/GojekAPI';
const ChoseAddress = () => {


    const [addressOptions, setAddressOptions] = useState([]);
    const [keyword, setKeyword] = useState("");

    const fetchAddressOptions = async (key) => {
        if (key.length <= 0) return "";
        var data = await GojekAPI.searchAddress(key);
        setAddressOptions(data?.results);
    }


    const debounceDropDown = useCallback(debounce((nextValue) => fetchAddressOptions(nextValue), 500), [])
    const handleClear = () => {
        setKeyword("");
    }
    const handleSelectAddress = async (item) => {
        var data = await GojekAPI.setAddress(item?.placeid);
        var locationData =
        {
            address: item?.address,
            name: item?.name,
            placeid: item?.placeid,
            latitude: data?.data?.latitude,
            longitude: data?.data?.longitude,
        }
        localStorage.setItem("customerLoc", JSON.stringify(locationData))
        window.location.reload(true);
    }

    const handleChangeAddress = (value) => {
        setKeyword(value);
        debounceDropDown(keyword);
    };
    return (

        <div className='boxSearchAddress'   >
            <input
                className='inputSearchAddress'
                value={keyword}
                placeholder={"Nhập địa chỉ"}
                autoFocus={true}
                onChange={e => handleChangeAddress(e.target.value)}
            />
            <div className='boxAddressResult'>
                {
                    addressOptions?.map((item, index) => {
                        return (
                            <div
                                onClick={() => handleSelectAddress(item)}
                                key={index} className='divAddresResult'  >
                                <p > {item?.address} </p>
                                <p > {item?.name} </p>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    );
};



export default ChoseAddress;
