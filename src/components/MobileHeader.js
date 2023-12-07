import React, {useEffect, useState} from "react";
import styles from "../styles/MobileHeader.module.css"
import logo from "../images/lines.png";
import book from "../images/book2.png";
import teacher from "../images/teacher.png";
import moon from "../images/moon.png";
import logout from "../images/logout.png";
import main from "../images/element-equal.png";
import {Link} from "react-router-dom";



function MobileHeader({func_logout}){

    const [displayMenu, setDisplayMenu] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        const scrollY = window.scrollY || window.pageYOffset;
        if(scrollY >= 50)
            setIsScrolled(true);
        else
            setIsScrolled(false);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);



    return(
        <div className={styles.wrapper}>
            <div className={displayMenu ? `${styles.headerWrapper}` : `${styles.headerWrapperHidden}`}>
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
            <div className={isScrolled ? `${styles.menuScrolledButton}` : `${styles.menuButton}`}
                 onClick={() => {
                     setDisplayMenu(!displayMenu);
                     setIsRotated(!isRotated);
                 }}>
                <img src={logo} className={`${styles.logo} ${isRotated ? styles.rotated : ''}`} alt=''/>
            </div>

        </div>
    )
}

export default MobileHeader;