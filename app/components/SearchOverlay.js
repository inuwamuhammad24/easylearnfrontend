import React from "react"

function SearchOverlay() {
  function handleCloseSearch() {
    const closeSearch = document.querySelector(".close-icon").parentNode
    closeSearch.style.animate = "ease 550ms close-search"
    closeSearch.style.display = "none"
  }

  return (
    <div onClick={handleCloseSearch} className="searching-overlay">
      <div className="close-icon">
        <span>&#xD7;</span>
      </div>
    </div>
  )
}

export default SearchOverlay
