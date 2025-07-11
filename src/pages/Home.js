import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import header from "../images/header.png";

function Home() {
  const [latestItems, setLatestItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/items").then((res) => {
      const latest = res.data.slice(0, 4);
      setLatestItems(latest);
    });
  }, []);

  return (
    <>
      <div className="header">
        <div className="image">
          <img src={header} alt="Header" />
        </div>
        <div className="title">
          <h1>Here’s to a wilder summer</h1>
          <p>
            Abundant with sun-kissed cheeks. British-grown sunflowers. And sending a surprise flower delivery for no other reason than ‘why not’?
          </p>
          <button><Link to="/items">Shop All</Link></button>
        </div>
      </div>

      <div className="banner">
        <div className="banner-container">
          <div className="banner-content">
            <div className="banner-text">
              <h3>Seen our TV advert?</h3>
              <h2>Take £10 off your first order</h2>
            </div>
            <div className="banner-button">
              <button>Claim Offer</button>
            </div>
          </div>
        </div>
      </div>

      <div className="rewards-member">
        <div className="title">
          <h1>Rewards member? Snap up double points</h1>
          <Link to="/items">Shop now</Link>
        </div>
        <div className="title-details">
          <p>
            For a short time, we’re giving Rewards members double points on special blooms, plants and gifts.
          </p>
        </div>
        <div className="items">
          {latestItems.map((item) => (
            <div className="item" key={item.id}>
              <div className="visual">
                <img src={item.images[0]} alt={item.title} />
              </div>
              <div className="details">
                <div className="info">
                  <h1>{item.title}</h1>
                  <p>{item.category}</p>
                </div>
                <div className="more">
                  <p>${item.price}</p>
                  <Link to={`/item/${item.id}`}>View</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="header header2">
        <div className="image">
          <img src={header} alt="Header 2" />
        </div>
        <div className="title">
          <h1>A season of abundance</h1>
          <p>Snap up these seasonal stems while you can.</p>
          <Link to="/items">Shop now</Link>
        </div>
      </div>

      <div className="info-section">
        <div className="about">
          <h1>About Bloom & Wild flower delivery</h1>
          <p>
            We don’t just send flowers. We help you care wildly. Every flower delivery arrives with thoughtful care.
          </p>
        </div>
        <div className="services">
          <h2>Our gift delivery service</h2>
          <div className="columns">
            <ul>
              <li>Flower delivery UK</li>
              <li>Flowers by post</li>
              <li>Birthday gifts</li>
            </ul>
            <ul>
              <li>Anniversary flowers</li>
              <li>Sympathy flowers</li>
              <li>Mother's Day</li>
            </ul>
            <ul>
              <li>Valentine's Day</li>
              <li>Thank you flowers</li>
              <li>Next-day delivery</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
