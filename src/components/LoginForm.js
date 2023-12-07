import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import styles from "../styles/AuthPage.module.css"


import axios from "axios";


function LoginForm({login, changeProcess}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        setErrorMessage("");
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // The page reloads by default => we prevent it
        try {
            const response = await axios.post("https://students-retake-back.onrender.com/api/auth/login", formData);
            setTimeout(() => {
                localStorage.setItem("userRole", response.data.roles[0].name)
            }, 2000)
            if (response.status === 200) {
                login(response.data.token);
                if (response.data.roles[0].name === "ROLE_STUDENT"){
                    navigate("/");
                }else if(response.data.roles[0].name === "ROLE_ADMIN"){
                    navigate("/admin")
                }else{
                    navigate("/teacher")
                }
            }
        } catch (error) {
            setErrorMessage("Wrong email or password");
        }
    }

    return (
        <div className={styles.frame}>
            <div className={styles.frameGroup}>
                <div className={styles.loginParent}>
                    <b className={styles.loginArticle}>Login</b>
                    <div className={styles.enterYourAccount}>
                        Enter your account details
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
                    <div className={styles.forgotPassword}>Forgot Password?</div>
                    <button type="submit" className={styles.login_button}>
                        Login
                    </button>

                </form>
            </div>

            <div className={styles.signupContainer}>
                <div style={{
                    fontSize: "16px",
                    color: "rgba(255, 255, 255, 0.5)",
                    marginTop: "3%"
                }}>Don't have an account?
                </div>
                <button onClick={() => {
                    changeProcess("signup")
                }} className={styles.signUpButton}>Sign up</button>
            </div>

        </div>
    );
}

export default LoginForm;