import React from 'react';

const Auth = ({ children }) => {
    if (localStorage.getItem("password"))
        return (
            { children }
        );
}

export default Auth;
