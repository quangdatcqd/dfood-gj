import React from 'react';

const InputBox = (props) => {
    const { onChange, placeholder, value } = props;
    return (
        <div>
            <input
                value={value}
                placeholder={placeholder}
                // autoComplete="address"
                style={{
                    width: "100%",
                    padding: "8px 30px",
                    border: "none",
                    borderRadius: "20px",
                    outline: "none",
                    fontSize: "14pt",
                    textAlign: "left",
                    // color: "gray",
                    fontWeight: "bold",
                    boxShadow: "0px 0px 5px 5px #e9e9e9"

                }}
                onChange={onChange}
            />
        </div>
    );
}

export default InputBox;
