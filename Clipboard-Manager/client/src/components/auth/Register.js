import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AuthForm.scss";

function Register() {
    const [formEmail, setFormEmail] = useState("");
    const [formPassword, setFormPassword] = useState("");
    const [formPasswordConfirm, setFormPasswordConfirm] = useState("");

    async function register(e) {
        e.preventDefault();

        const registerData = {
            email: formEmail,
            password: formPassword,
            passwordConfirm: formPasswordConfirm
        }

        await axios.post("http://localhost:5000/auth/", registerData);
    }

    return (
        <div className = "auth-form">
            <h2>Register a new account</h2>
            <form onSubmit = {register}>
                <label htmlFor = "form-email">Email</label>
                <input 
                    id = "form-email"
                    type = "email" 
                    value = {formEmail} 
                    onChange = { (e) => setFormEmail(e.target.value) } 
                />

                <label htmlFor = "form-password">Password</label>
                <input 
                    id = "form-password"
                    type = "password" 
                    value = {formPassword} 
                    onChange = { (e) => setFormPassword(e.target.value) } 
                />

                <label htmlFor = "form-passwordConfirm">Confirm Password</label>
                <input 
                    id = "form-passwordConfirm"
                    type = "password" 
                    value = {formPasswordConfirm} 
                    onChange = { (e) => setFormPasswordConfirm(e.target.value) } 
                />

                <button type = "submit">Register</button>
            </form>
        
            <p>
                Already registered? <Link to = "/login">Login here instead</Link>
            </p>

        </div>);
}

export default Register;