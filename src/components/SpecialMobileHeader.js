import React, {useEffect, useState} from "react";
import styles from "../styles/SpecialMobileHeader.module.css"
import logo from "../images/lines.png";
import book from "../images/book2.png";
import teacher from "../images/teacher.png";
import moon from "../images/moon.png";
import logout from "../images/logout.png";
import main from "../images/element-equal.png";
import {Link} from "react-router-dom";



function SpecialMobileHeader({func_logout}){

    const [header, setHeader] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(false);
    const [isRotated, setIsRotated] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            console.log(scrollY);
            if  (scrollY >= 390)
                setHeader(true);
            else
                setHeader(false);
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);



    return(
        <div className={styles.wrapper}>
            <div className={displayMenu && header ? `${styles.headerWrapper}` : `${styles.headerWrapperHidden}`}>
                <Link to={'/'} className={styles.section}>
                    <img src={main} className={styles.sectionIcon}/>
                </Link>
                <Link to={'/subjects'} className={styles.section}>
                    <img src={book} className={styles.sectionIcon}/>
                </Link>
                <Link to={'/diary'} className={styles.section}>
                    <img src={teacher} className={styles.sectionIcon}/>
                </Link>
                <div className={styles.section}>
                    <img src={moon} className={styles.sectionIcon}/>
                </div>
                <div className={styles.section} onClick={func_logout}>
                    <img src={logout} className={styles.sectionIcon} />
                </div>
            </div>
            <div className={header ? `${styles.menuButton}` : `${styles.menuButtonHide}`}
                 onClick={() => {
                     setDisplayMenu(!displayMenu);
                     setIsRotated(!isRotated);
                 }}>
                <img src={logo} className={`${styles.logo} ${isRotated ? styles.rotated : ''}`} alt=''/>
            </div>

        </div>
    )
}

export default SpecialMobileHeader;