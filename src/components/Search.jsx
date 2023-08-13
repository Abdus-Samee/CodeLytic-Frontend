import '../assets/css/search.css'

const Search = () => {
    return (
        <form id="search-form">
            <label id="search-label" for="search">Search</label>
            <input id="search" type="search" pattern=".*\S.*" autoComplete="off" title="Enter tags" required />
            <span class="caret"></span>
        </form>
    )
}

export default Search