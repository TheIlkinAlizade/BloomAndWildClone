import logo from "../images/logo.png";

function Footer() {
  return (
    <div className="footer">
      <div className="column">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
      </div>

      <div className="column">
        <div className="links">
          <p>SHOP</p>
          <p><a href="#">Shop All</a></p>
          <p><a href="#">Collections</a></p>
        </div>
      </div>

      <div className="column">
        <div className="links">
          <p>ABOUT</p>
          <p><a href="#">Our Story</a></p>
          <p><a href="#">Press</a></p>
          <p><a href="#">Blog</a></p>
        </div>
      </div>

      <div className="column">
        <div className="links">
          <p>HELP</p>
          <p><a href="#">FAQ</a></p>
          <p><a href="#">Find Us In Store</a></p>
          <p><a href="#">Shipping & Returns</a></p>
          <p><a href="#">Contact Us</a></p>
        </div>
      </div>

      <div className="column">
        <div className="links">
          <p>POLICIES</p>
          <p><a href="#">Privacy Policy</a></p>
          <p><a href="#">Notice of Collection</a></p>
          <p><a href="#">Biometric Data Policy</a></p>
          <p><a href="#">Coupon Policy</a></p>
        </div>
      </div>

      <div className="column">
        <div className="contact">
          <p>© Bloom & Wild Clone 2025. All Rights Reserved</p>
          <div className="logos">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
            <a href="#"><i className="fab fa-tiktok"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
