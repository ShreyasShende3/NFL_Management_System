import React from "react";
import "../landingPage/styles.css";
const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <img src="/The world studios.png" alt="Text" />
      </div>
      <ul>
        <li>
          <a href="/">HOME</a>
        </li>
        <li>
          <a href="/more_info">SUMMARY</a>
        </li>
        <li>
          <a href="/player">PLAYER</a>
        </li>
        <li>
          <a href="/coach">COACH</a>
        </li>
        <li>
          <a href="/stadium">STADIUM</a>
        </li>
        <li>
          <a href="/results">RESULTS</a>
        </li>
        <li>
          <a href="/stats">STATS</a>
        </li>
        <li>
          <a href="/team">TEAMS</a>
        </li>
        <li>
          <a href="finance">FINANCE</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
