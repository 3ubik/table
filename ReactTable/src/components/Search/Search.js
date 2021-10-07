import React from "react"
import './Search.css'

const Search = ({search}) => {
    
    return (
        <form className='search_field' onChange={search}>
            <input form='form_searchfield' placeholder='Search by name' className='input_search_field'/>
        </form>
    )
}

export default Search;