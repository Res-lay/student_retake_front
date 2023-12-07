import React, {useEffect, useRef, useState} from "react";
import styles from "../styles/ProfilePage.module.css"

import user_image from "../images/Defaultavatar.jpeg"
import photo from "../images/photo.png"


import Header from "../components/Header";
import axios from "axios";
import MobileHeader from "../components/MobileHeader";

function UserProfilePage({logout}) {

    const inputRef = useRef();
    const [studentData, setStudentData] = useState({});
    const [userData, setUserData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [mobileVersion, setMobileVersion] = useState(window.innerWidth <= 440);

    async function getData() {
        const userData = JSON.parse(localStorage.getItem("userData")) || {};
        const studentData = JSON.parse(localStorage.getItem("studentData")) || {};
        const imageData = localStorage.getItem("image");
        return {userData, studentData, imageData};
    }

    const handleResize = () => {
        setMobileVersion(window.innerWidth <= 440);
    }

    useEffect(() => {
        async function fetchData() {
            const data = await getData();
            setStudentData(data.studentData);
            setUserData(data.userData);
            setImageData(data.imageData);
        }
        window.addEventListener('resize', handleResize);
        fetchData();
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])


    const handleFileSelection = (e) => {

        if (e.target.files){
            const selectedFile = e.target.files[0];
            if (selectedFile){
                const formData = new FormData();
                formData.append("file", selectedFile);

                axios.post("https://students-retake-91s0.onrender.com/api/user/upload-photo", formData, {
                    headers: {
                        "Content-Type" : "multipart/form-data",
                        "Authorization " : `Bearer ${localStorage.getItem("JwtToken")}`
                    }
                }).then((response) => {})
                    .catch((error) => {
                        if (error.response && error.response.status === 403){
                            window.location.href="/auth";
                        }
                        else{
                            console.error(error);
                        }
                    });
            }
        }
    }

    return (
        <div className={styles.mainWrapper}>
            {
                mobileVersion ? (
                    <MobileHeader func_logout={logout}/>
                ) : (
                    <Header func_logout={logout}/>
                )

            }
            <div className={styles.mainPart}>
                <div className={styles.profileAvatar}>
                    <div className={styles.avatarContainer}>
                        <div className={styles.photoCameraContainer} onClick={() => {
                            inputRef.current.click();
                        }}>
                            <img className={styles.photoCamera} src={photo} alt="photo_camera"/>
                            <input ref={inputRef} type="file" accept="image/**" style={{display: "none"}}
                                   onChange={handleFileSelection}/>
                        </div>
                        {imageData ? (
                            <img className={styles.avatar} src={imageData} alt="avatar"/>
                        ) : (
                            <img className={styles.avatar} src={user_image} alt="avatar"/>
                        )}
                    </div>
                </div>
                <div style={{
                    marginTop: "8%",
                    color: "white",
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "20px"
                }}>
                    <p>{userData.email || "none"}</p>
                </div>
                <div className={styles.profileInfo}>
                    <div className={styles.staticProfileData}>
                        <div className={styles.profilePoint}>
                            <p className={styles.user_info_text}>Name:</p>
                            <p className={styles.user_info_text2}>{studentData.firstName || "No data"}</p>
                        </div>
                        <div className={styles.profilePoint}>
                            <p className={styles.user_info_text}>Surname:</p>
                            <p className={styles.user_info_text2}>{studentData.lastName || "No data"}</p>
                        </div>
                        <div className={styles.profilePoint}>
                            <p className={styles.user_info_text}>Group:</p>
                            <p className={styles.user_info_text2}>{studentData.group?.name || "No data"}</p>
                        </div>
                        <div className={styles.profilePoint}>
                            <p className={styles.user_info_text}>Code:</p>
                            <p className={styles.user_info_text2}>{studentData.code || "No data"}</p>
                        </div>
                        <div className={styles.profilePoint}>
                            <p className={styles.user_info_text}>Term:</p>
                            <p className={styles.user_info_text2}>{studentData.term || "No data"}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserProfilePage;