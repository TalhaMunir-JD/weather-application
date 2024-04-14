import './Styles/display.css'

function Search({ query, setQuery, handleSearch}){
    
    return(
        <div className='search-container'>
            <input
                name='query' 
                type='text'
                placeholder='Enter country to get started.'
                className='SearchBar' 
                value={query} 
                onChange={(event)=>setQuery(event.target.value)} />
            <button className='search-button' onClick={handleSearch} >
                Search
            </button>
        </div>
    )
}

export default Search;