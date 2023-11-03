import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    
    const handleClick = () => {
        logout();
    }

    return (
        <header>
            <div className="container">
                <Link to ="/">
                    <h1>Flex-Core Raw Core Tracker</h1>
                </Link>
                <nav>
                    {/* conditionally render info dependent on login status */}
                    {user && (
                        <div id="div-logged-in">
                            <span>{user.username}</span>
                            <button onClick={handleClick}>Logout</button>
                        </div>
                    )}
                    {!user && (
                        <div id="div-logged-out">
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar;