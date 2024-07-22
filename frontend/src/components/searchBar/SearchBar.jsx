import React from 'react';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <span role="img" aria-label="search">🔍</span>
      <input type="text" placeholder="Search any recipe" />
    </div>
  );
};

export default SearchBar;
