import React, { useState } from "react";
import styles from "../styles/AuthPage.module.css";

import axios from "axios";


function SignUpForm({ changeProcess }) {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        role: ""
    });
    const [errorMessage, setErrorMessage] = useState('');


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setErrorMessage("");
        
        if (name === "role" && !value.trim()) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: "student"
            }))
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // The page reloads by default => we prevent it
        try {
            if (formData.confirmPassword !== formData.password) {
                setErrorMessage("Passwords do not match");
                return;
            }
            const response = await axios.post("https://students-retake-91s0.onrender.com/api/auth/signup", formData);
            if (response.status === 200) {
                changeProcess("login");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage("Wrong email or password");
            } else {
                setErrorMessage("An error occurred during authentication");
            }
        }
    }

    return (
        <div className={styles.frame}>
            <div className={styles.frameGroup}>
                <div className={styles.loginParent}>
                    <b className={styles.loginArticle}>Registration</b>
                    <div className={styles.enterYourAccount}>
                        Register your account
                    </div>
                </div>
                <form className={styles.frameDiv} onSubmit={handleSubmit}>
                    <div className={styles.errorWrapper} style={{
                        transition: '.5s',
                        opacity: errorMessage ? "1" : "0",
                    }}>
                        <div style={{color:"white"}}>Wrong Email or Password</div>
                    </div>
                    <div className={styles.group}>
                        <label htmlFor="password">Email:</label>
                        <input className={styles.inputField}
                               type="text"
                               required
                               id="email"
                               name="email"
                               value={formData.email} //default value
                               onChange={handleInputChange}
                        />
                        <span className={styles.focus_border}/>
                    </div>
                    <div className={styles.group}>
                        <label htmlFor="password">Password:</label>
                        <input className={styles.inputField}
                               type="password"
                               id="password"
                               name="password"
                               value={formData.password} //default value
                               onChange={handleInputChange}
                        />
                        <span className={styles.focus_border}/>
                    </div>
                    <div className={styles.group}>
                        <label htmlFor="password">Confirm Password:</label>
                        <input className={styles.inputField}
                               type="password"
                               id="password"
                               name="confirmPassword"
                               value={formData.confirmPassword} //default value
                               onChange={handleInputChange}
                        />
                        <span className={styles.focus_border}/>
                    </div>
                    {/* <div className={styles.forgotPassword}>Forgot Password?</div> */}
                    <button type="submit" className={styles.login_button}>
                        Create Account
                    </button>
                </form>
            </div>

            <div className={styles.signupContainer}>
                <div style={{
                    fontSize: "16px",
                    color: "rgba(255, 255, 255, 0.5)",
                    marginTop: "3%"
                }}>Already have an account?
                </div>
                <button onClick={() => changeProcess("login")}
                    className={styles.signUpButton}>
                    Log in
                </button>
            </div>

        </div>
    );

}

export default SignUpForm;