import React, {useEffect, useState} from "react";
import styles from "../styles/TeacherPage.module.css"

import user_image from "../images/avatar.png"


import Header from "../components/Header";
import axios from "axios";
import {useParams} from "react-router-dom";
import MobileHeader from "../components/MobileHeader";
import LoadingSpinner from "../components/LoadingSpinner";

function TeacherProfilePage(logout) {

    const {teacherId} = useParams();

    const [teacherSubjects, setTeacherSubjects] = useState([]);
    const [teacherData, setTeacherData] = useState(null);
    const [mobileVersion, setMobileVersion] = useState(window.innerWidth <= 440);


    const axiosInstance = axios.create({
        baseURL: "https://students-retake-back.onrender.com/api/user",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('JwtToken')}`
        }
    });

    const handleResize = () => {
        setMobileVersion(window.innerWidth <= 440);
    };

    useEffect(() => {
        async function fetchData() {
            axiosInstance.get('/teachers/teacher', {
                params: {
                    teacherId: teacherId
                }
            }).then(response => {
                setTeacherData(response.data);
            }).catch(e => console.error(e));

            axiosInstance.get("/teacher/subjects", {
                params: {
                    teacherId: teacherId
                }
            }).then(response => {
                setTeacherSubjects(response.data);
            }).catch(error => console.error(error));
        }

        window.addEventListener('resize', handleResize);

        fetchData();

        return () => {
            window.removeEventListener('resize', handleResize);
        }

    }, [])


    return (
        <div>
            {
                teacherData ? (
                    <div className={styles.mainWrapper}>
                        {
                            mobileVersion ? (
                                <MobileHeader func_logout={logout}/>
                            ) : (
                                <Header func_logout={logout}/>
                            )
                        }
                        {
                            teacherData ? (
                                <div className={styles.mainPart}>
                                    <div className={styles.profileAvatar}>
                                        <div className={styles.avatarContainer}>

                                            <img className={styles.avatar} src={user_image} alt="avatar"/>
                                        </div>
                                    </div>
                                    {teacherData ? (
                                        <div className={styles.profileInfo}>
                                            <div className={styles.staticProfileData}>
                                                <h2 className={styles.sectionName}>Teacher info</h2>
                                                <div className={styles.profilePoint}>
                                                    <p className={styles.user_info_text}>Name:</p>
                                                    <p className={styles.user_info_text2}>{teacherData.firstName || "No data"}</p>
                                                </div>
                                                <div className={styles.profilePoint}>
                                                    <p className={styles.user_info_text}>Surname:</p>
                                                    <p className={styles.user_info_text2}>{teacherData.lastName || "No data"}</p>
                                                </div>
                                            </div>
                                            <div className={styles.staticProfileData}>
                                                <h2 className={styles.sectionName}>Teacher subjects</h2>
                                                {teacherSubjects.length !== 0 ? (
                                                    teacherSubjects.map(subject => (
                                                        <div className={styles.profilePoint} key={subject.id}>
                                                            <p className={styles.user_info_text2}>{subject.name}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className={styles.profilePoint}>
                                                        <p className={styles.user_info_text}>No subjects</p>
                                                    </div>
                                                )
                                                }
                                            </div>
                                        </div>
                                    ) : (
                                        "oopss..."
                                    )
                                    }
                                </div>
                            ) : (
                                "ooppss..."
                            )
                        }

                    </div>
                ) : (
                    <LoadingSpinner/>
                )
            }
        </div>

    )
}

export default TeacherProfilePage;