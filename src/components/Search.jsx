import { useState } from 'react'

import '../assets/css/search.css'

const Search = ({handleSearch}) => {
    const [searchCourse, setSearchCourse] = useState('')

    const handleInputChange = (value) => {
        setSearchCourse(value)
        handleSearch(value)
    }

    return (
        <form id="search-form">
            <label id="search-label" for="search">Search</label>
            <input 
                id="search" 
                type="search" 
                pattern=".*\S.*" 
                autoComplete="off" 
                title="Enter course name" 
                required
                onChange={(e) => handleInputChange(e.target.value)}
            />
            <span class="caret"></span>
        </form>
    )
}

export default Search