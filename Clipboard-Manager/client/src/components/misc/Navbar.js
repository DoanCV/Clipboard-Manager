import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import "./Navbar.scss";

function Navbar() {

    const { user, getUser } = useContext(UserContext);

    async function logOut() {
        await axios.get("http://localhost:5000/auth/logOut");
        await getUser();
    }

    return (
        <div className = "navbar">
            <Link to = "/">
                <h1>Clipboard Manager</h1>
            </Link>
            {   // when a user is logged in, they cannot see login or register, instead they will see logout
                !user ? (
                    <>
                        <Link to = "/login">Login</Link>
                        <Link to = "/register">Register</Link>
                    </>
                )   :   (
                    <button className = "button-logout" onClick = {logOut}>Logout</button>
                )
            }
        </div>
    );
}

export default Navbar;