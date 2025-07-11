import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getCart,
  getWishlist,
  updateCart,
  updateWishlist,
  setUser,
} from "../utils/storageUtils";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.username || !form.password) {
      const msg = "Please fill in all fields";
      setError(msg);
      alert(msg);
      return;
    }

    try {
      if (isLogin) {
        // LOGIN: fetch users, find matching user
        const res = await axios.get(
          `http://localhost:5000/users?username=${encodeURIComponent(
            form.username
          )}`
        );
        const users = res.data;
        const user = users.find((u) => u.password === form.password);

        if (user) {
          setUser(user);
          localStorage.setItem("user", JSON.stringify(user));
          alert("Login successful!");
          navigate("/");
        } else {
          const msg = "Invalid username or password";
          setError(msg);
          alert(msg);
        }
      } else {
        // REGISTER: check if username exists
        const res = await axios.get(
          `http://localhost:5000/users?username=${encodeURIComponent(
            form.username
          )}`
        );
        const users = res.data;

        if (users.length > 0) {
          const msg = "Username already exists";
          setError(msg);
          alert(msg);
          return;
        }

        // Add new user
        const newUser = { username: form.username, password: form.password };
        const createRes = await axios.post("http://localhost:5000/users", newUser);

        // On success, save user and cart/wishlist if needed
        const guestCart = getCart();
        const guestWishlist = getWishlist();
        setUser(createRes.data);
        localStorage.setItem("user", JSON.stringify(createRes.data));
        updateCart(guestCart);
        updateWishlist(guestWishlist);
        alert("Registration successful! You are now logged in.");
        navigate("/");
      }
    } catch (err) {
      const msg = "Server error, please try again later";
      setError(msg);
      alert(msg);
      console.error(err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>{isLogin ? "Login" : "Register"}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p
          className="auth-toggle"
          onClick={() => {
            setError("");
            setIsLogin(!isLogin);
          }}
        >
          {isLogin
            ? "Don’t have an account? Register here"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

export default Auth;
