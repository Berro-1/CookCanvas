import React, { useEffect } from 'react';
import SearchInput from 'react-search-input';
import { gsap } from 'gsap';

const SearchBar = ({ searchTerm, onChange }) => {
  useEffect(() => {
    gsap.from('.search-input', {
      duration: 1,
      x: -50,
      opacity: 0,
      ease: 'power3.out'
    });
  }, []);

  return (
    <div className="search-bar">
      <SearchInput
        className="search-input"
        onChange={onChange}
        value={searchTerm}
        placeholder="Search recipes..."
      />
    </div>
  );
};

export default SearchBar;
