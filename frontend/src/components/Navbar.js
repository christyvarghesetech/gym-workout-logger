import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const getPageTitle = () => {
        if (location.pathname === "/dashboard") return "Dashboard";
        if (location.pathname.startsWith("/workout")) return "Workout Details";
        return "Gym Workout Logger";
    };

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                <h2 className="logo">🏋️ Gym Workout Logger</h2>
                <span className="page-title">{getPageTitle()}</span>
            </div>

            <button
                onClick={handleLogout}
                className="logout-btn"
            >
                Logout
            </button>
        </nav>
    );
}

export default Navbar;