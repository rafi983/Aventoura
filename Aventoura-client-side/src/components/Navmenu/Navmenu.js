import React from "react";
import "./Navmenu.css";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navmenu = () => {
  const { user, logOut } = useAuth();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bar">
        <div className="container">
          <NavLink className="navbar-brand logo" to="/">
            Aventoura
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  className="nav-link  navmenu"
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>

              {user?.email && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link active  navmenu"
                    aria-current="page"
                    to="/myorders"
                  >
                    My Orders
                  </NavLink>
                </li>
              )}

              {user?.email && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link active  navmenu"
                    aria-current="page"
                    to="/allorders"
                  >
                    Manage All Orders
                  </NavLink>
                </li>
              )}

              {user?.email && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link active  navmenu"
                    aria-current="page"
                    to="/addpackage"
                  >
                    Add Package
                  </NavLink>
                </li>
              )}

              {user?.email && (
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link active navmenu"
                    onClick={logOut}
                  >
                    Logout
                  </NavLink>
                </li>
              )}

              {user?.email && (
                <div className="user-info ms-auto me-3 text-black">
                  <span className="fw-bold text-dark">
                    Hello, {user.displayName}
                  </span>
                  {user.photoURL ? (
                    <img className="user-img" src={user.photoURL} alt="" />
                  ) : (
                    <img
                      className="user-img"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBzgsi-SA54nLR0Nqw0bbSVKaUIaGnCN5KQQ&usqp=CAU"
                      alt=""
                    />
                  )}
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navmenu;
