function SearchBar({ searchQuery, setSearchQuery, loadTasks, searchTasks }) {
    return (
            <>
            <input
             type="text"
             placeholder="Search tasks..."
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={searchTasks}>
            Search
            </button>
            <button
             onClick={() => {
             setSearchQuery("")
             loadTasks()
              }}
            >
            Clear
            </button>
            </>
    )
}

export default SearchBar