function SearchBar({ searchQuery, setSearchQuery, loadTasks, searchTasks, selectedStatus, setSelectedStatus }) {
    return (
            <>
            <div className="search-section">
                <input
                type="text"
                placeholder="Search by tittle or ID"
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
            </div>
            <div className="filter-section">
                <label>Filter by status: </label>
                <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                >
                <option value="">All</option>    
                <option value="0">To Do</option>
                <option value="1">In Progress</option>
                <option value="2">Done</option>
                </select>
            </div>
            </>
    )
}

export default SearchBar