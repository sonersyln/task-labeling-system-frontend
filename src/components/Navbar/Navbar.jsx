import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  IoIosCloseCircle,
  IoIosMenu,
  IoMdCart,
  IoIosLogIn,
} from "react-icons/io";
import { MdLanguage } from "react-icons/md";
import { NavDropdown } from "react-bootstrap";
import "./navbar.css";

const NewNavbar = () => {
  const [navbar, setNavbar] = useState("navbar");
  const [header, setHeader] = useState("header addBg");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This should be set to true when user logs in
  const addBg = () => {
    if (window.scrollY >= 0) {
      setHeader("header addBg");
    }
  };
  const showNavbar = () => {
    setNavbar("navbar showNavbar");
  };

  const removeNavbar = () => {
    setNavbar("navbar");
  };
  const logout = () => {
    setIsLoggedIn(false); // Set isLoggedIn to false when user logs out
    alert("exitSuccessful");
  };

  return (
    <>
      <div className={header}>
        <div className="logoDiv">
          <Link to="/" className="link">
            Brand
          </Link>
        </div>
        <div className={navbar}>
          <ul className="menu">
            <li onClick={removeNavbar} className="listItem"></li>
          </ul>

          <IoIosCloseCircle className="icon closeIcon" onClick={removeNavbar} />
        </div>

        <div className="signUp flex">
          {isLoggedIn ? (
            <>
              <NavDropdown
                className="textAction text"
                title="{}"
                id="basic-nav-dropdown"
              >
                <Link
                  className=" text textAction btn"
                  to="/profile/account-settings"
                >
                  <IoIosLogIn />
                </Link>

                <Link
                  className="  btn text textAction"
                  to="/profile/your-reservations"
                ></Link>
                <NavDropdown.Item onClick={logout} className="lang-item" eventKey="en">
                  Çıkış Yap
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <>
              <Link to="/" className="link">
                Anasayfa
              </Link>
              <Link className="text btn" to={"/sign-in"}>
                Giriş Yap
              </Link>
            </>
          )}

          <IoIosMenu className="icon toggleNavbarIcon" onClick={showNavbar} />
        </div>
      </div>
    </>
  );
};

export default NewNavbar;