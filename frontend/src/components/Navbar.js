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
        <nav style={styles.navbar}>
            <div style={styles.left}>
                <h2 style={styles.logo}>🏋️ Gym Workout Logger</h2>
                <span style={styles.pageTitle}>{getPageTitle()}</span>
            </div>

            <button
                onClick={handleLogout}
                style={styles.logoutButton}
                className="logout-btn"
            >
                Logout
            </button>
        </nav>
    );
}

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 28px",
        background: "#111827",
        color: "white",
        borderBottom: "1px solid #374151",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        flexWrap: "wrap",
        gap: "10px",
    },

    left: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
    },

    logo: {
        margin: 0,
        fontSize: "22px",
        fontWeight: "700",
    },

    pageTitle: {
        fontSize: "14px",
        color: "#9CA3AF",
        letterSpacing: "0.5px",
    },

    logoutButton: {
        background: "#DC2626",
        color: "white",
        border: "none",
        borderRadius: "8px",
        padding: "10px 18px",
        cursor: "pointer",
        fontWeight: "600",
        transition: "0.2s",
    },
};

export default Navbar;