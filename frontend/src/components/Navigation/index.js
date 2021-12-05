import React, { useState } from "react";

import "./style.css";

const Navigation = ({ handleSearch, handleOverlay }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [address, setAddress] = useState("");
  const [error, setError] = useState(false);

  const handleMenu = () => {
    const toggle = !toggleMenu;
    setToggleMenu(toggle);
    handleOverlay(toggle);
    setOpenSearch(false);
  };

  const handleOpenSearch = () => {
    setOpenSearch(true);
  };

  const handleClick = () => {
    if (!address.length) {
      return setError(true);
    }
    setError(false);
    handleMenu();
    handleSearch(address);
  };
  return (
    <div className={`footer-nav ${toggleMenu ? "open" : ""}`}>
      <span className="menu-button" onClick={handleMenu}>
        {toggleMenu ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        )}
      </span>
      <div className="navigation">
        <ul>
          {!openSearch ? (
            <>
              <li onClick={handleOpenSearch}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#FFFFFF"
                >
                  <rect fill="none" height="24" width="24" />
                  <path d="M19.3,16.9c0.58-1.01,0.95-2.23,0.51-3.65c-0.53-1.72-2.04-3.05-3.84-3.22c-2.87-0.28-5.23,2.07-4.95,4.95 c0.18,1.79,1.5,3.31,3.22,3.84c1.43,0.44,2.64,0.07,3.65-0.51l2.5,2.5c0.39,0.39,1.01,0.39,1.4,0l0,0c0.39-0.39,0.39-1.01,0-1.4 L19.3,16.9z M15.5,17c-1.4,0-2.5-1.1-2.5-2.5s1.1-2.5,2.5-2.5s2.5,1.1,2.5,2.5S16.9,17,15.5,17z M12,20v2C6.48,22,2,17.52,2,12 C2,6.48,6.48,2,12,2c4.84,0,8.87,3.44,9.8,8h-2.07c-0.64-2.46-2.4-4.47-4.73-5.41V5c0,1.1-0.9,2-2,2h-2v2c0,0.55-0.45,1-1,1H8v2h2v3 H9l-4.79-4.79C4.08,10.79,4,11.38,4,12C4,16.41,7.59,20,12,20z" />
                </svg>
                <span>Search</span>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#FFFFFF"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z" />
                </svg>
                <span>About</span>
              </li>
            </>
          ) : (
            <li className={`search ${openSearch ? "active" : ""}`}>
              <input type="text" onChange={(e) => setAddress(e.target.value)} />
              {error && <p className="error">Please provide state name</p>}
              <button onClick={handleClick}>Search</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
