import React, {useState} from "react";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import styles from "../styles/AuthPage.module.css"
import image from "../images/sttudents.png"




function AuthPage({login}) {

    const [process, setProcess] = useState("login");

    function changeProcess(process){
        setProcess(process);
    }

    return (
        <div className={styles.login_wrapper}>
            {process === "login" ? (<LoginForm changeProcess={changeProcess} login={login} />) : (
                <SignUpForm changeProcess={changeProcess}/>
            )}
            <div className={styles.frame2}>
                <div className={styles.welcomeToStudentContainer}>
                    <p className={styles.welcomeTo}>
                        <b>{`Welcome to `}</b>
                    </p>
                    <p className={styles.welcomeTo}>student portal</p>
                </div>
                <img
                    src={image} alt="image"
                    style={{
                        width: "78%"

                    }}
                />
            </div>

        </div>
    );
}

export default AuthPage;