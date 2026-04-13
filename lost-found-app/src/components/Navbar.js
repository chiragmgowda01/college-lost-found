import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar-wrap">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">●</span>
          <span>CampusConnect</span>
        </Link>

        <button
          className="menu-btn"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${open ? "open" : ""}`}>
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/explore" onClick={() => setOpen(false)}>Explore</NavLink>
          <NavLink to="/post" onClick={() => setOpen(false)} className="nav-cta">
            Post Report
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;