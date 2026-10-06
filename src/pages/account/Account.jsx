import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Account.css";

const Account = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/signin", { replace: true });
  };

  return (
    <main className="account-page">
      <div className="account-card">
        <h1>Account</h1>

        {user?.name && <p>{user.name}</p>}
        {user?.email && <p>{user.email}</p>}

        <button
          type="button"
          className="account-logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </main>
  );
};

export default Account;
