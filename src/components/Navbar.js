import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../images/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showNavbar, setShowNavbar] = useState(true);

  // Keep track of last scroll position
  const lastScrollY = useRef(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username) {
      setUsername(user.username);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        // Always show navbar near top
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down - hide navbar
        setShowNavbar(false);
      } else {
        // Scrolling up - show navbar
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/auth");
  };

  return (
    <>
      <div className={`navbar ${showNavbar ? "visible" : "hidden"}`}>
        <div className="links">
          <ul>
            {isLoggedIn ? (
              <li>
                <a onClick={handleLogout} style={{ marginRight: "5px", cursor: "pointer" }}>
                  <i className="bxr bx-arrow-out-down-right-stroke-square"></i> Logout
                </a>
                {username}
              </li>
            ) : (
              <li>
                <Link to="/auth">
                  <i className="bx bx-user"></i> Login/Register
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="links links2">
          <ul>
            <li>
              <Link to="#">
                <i className="bx bx-search"></i>
              </Link>
            </li>
            <li>
              <Link to="/wishlist">
                <i className="bx bx-heart"></i>
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <i className="bx bx-shopping-bag"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar">
        <div className="links">
          <ul>
            <li>
              <Link to="/items">All</Link>
            </li>
            <li>
              <Link to="/items?category=Trending">Trending</Link>
            </li>
            <li>
              <Link to="/items?category=Flowers">Flowers</Link>
            </li>
            <li>
              <Link to="/items?category=Plants">Plants</Link>
            </li>
            <li>
              <Link to="/items?category=Gifts">Gifts</Link>
            </li>
            <li>
              <Link to="/items?category=Occasions">Occasions</Link>
            </li>
            <li>
              <Link to="/items?category=Business">Business</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
