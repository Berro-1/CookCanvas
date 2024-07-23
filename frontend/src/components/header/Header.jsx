import React, { useEffect, useState } from 'react';

const Header = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  return (
    <header>
      <h1>Hello, {username || 'User'}</h1>
      <div className="notification-icon"></div>
    </header>
  );
};

export default Header;
