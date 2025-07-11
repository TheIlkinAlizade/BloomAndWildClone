import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, logoutUser } from "../utils/storageUtils";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      navigate("/auth", { replace: true });
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate("/auth", { replace: true });
  };

  if (!user) return null;

  return (
    <>
    <div className="shopheader">
        <h1>{user.username}</h1>
      </div>

        <div className="wishlist-empty">
          <a onClick={handleLogout}>Log Out</a>
        </div>
    </>
  );
}

export default Profile;
