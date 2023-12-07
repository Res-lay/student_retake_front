import React from "react";
import styles from "../styles/Header.module.css"
import logo from "../images/lines.png";
import main from "../images/element-equal.png";
import book from "../images/book2.png";
import teacher from "../images/teacher.png";
import moon from "../images/moon.png";
import {Link} from "react-router-dom";
import logout from "../images/logout.png";

function Header({func_logout}) {
    return (
        <div className={styles.header_wrapper}>
            <header className={styles.header}>
                <img src={logo} className={styles.logo} alt=''/>
                <div className={styles.icons}>
                    <Link to="/" className={`${styles.icon} ${localStorage.getItem("activeButton") === "Main" ? styles.icon_active : ""}`}
                          onClick={() => {
                              localStorage.setItem("activeButton", "Main");
                          }}>
                        <div
                            className={`${styles.icon_wrapper}`}>
                            <img src={main} className={styles.image_icon} alt="main"></img>
                        </div>
                    </Link>
                    <Link to="/subjects" className={`${styles.icon} ${localStorage.getItem("activeButton") === "Diary" ? styles.icon_active : ""}`}
                         onClick={() => {
                             localStorage.setItem("activeButton", "Diary");
                         }}>
                        <div className={styles.icon_wrapper}>
                            <img src={book} className={styles.image_icon} alt="book"></img>
                        </div>
                    </Link>
                    <Link to="/diary" className={`${styles.icon} ${localStorage.getItem("activeButton") === "Study" ? styles.icon_active : ""}`}
                         onClick={() => {
                             localStorage.setItem("activeButton", "Study");
                         }}>
                        <div className={styles.icon_wrapper}>
                            <img src={teacher} className={styles.image_icon} alt="teacher"></img>
                        </div>
                    </Link>
                </div>
                <div className={styles.icons}>
                    <div className={styles.icon}>
                        <div className={styles.icon_wrapper}>
                            <img src={moon} className={styles.image_icon} alt="moon"></img>
                        </div>
                    </div>
                    <Link to="/auth" className={styles.icon} onClick={func_logout}>
                        <div className={styles.icon_wrapper}>
                            <img src={logout} className={styles.image_icon} alt="logout"></img>
                        </div>
                    </Link>
                </div>
            </header>
        </div>

    )

}

export default Header;