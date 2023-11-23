import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './style.css';
const Search = ({ setToggleSearch }) => {
    return (

        <div className='headerBtnDiv headerBtnSearch' onClick={() => setToggleSearch(true)} >
            <SearchIcon />
            <p >Tìm kiếm</p>
        </div >
    );
}

export default Search;
