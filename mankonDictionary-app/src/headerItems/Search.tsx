import "./headerItems.css";

function Search() {
    return <div className="header__search-bar">
                <input type="text" id="searchInput" className="search-input" placeholder="Search in English..."/>
                <div id="searchResults" className="hidden"></div>
            </div>
}

export default Search