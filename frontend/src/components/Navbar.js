import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
    const { logout } = useLogout();
    
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
                    <div id="div-logout">
                        <button onClick={handleClick}>Logout</button>
                    </div>
                    <div className="link-div">
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar;