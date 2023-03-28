import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { updateFilters } from "../features/filter/filterSlice";
import "../styles/main.css";

const NavBar = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(
      updateFilters({
        search: event.target.value,
      })
    );
  };

  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <div className="flex-1 max-w-xs search-field group">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input
            type="text"
            placeholder="Search Task"
            className="search-input"
            id="lws-searchTask"
            onChange={handleChange}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
