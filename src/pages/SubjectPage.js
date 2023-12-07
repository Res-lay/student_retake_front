import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

import styles from "../styles/SubjectPage.module.css"
import LoadingSpinner from "../components/LoadingSpinner";
import SpecialMobileHeader from "../components/SpecialMobileHeader";

function SubjectPage({func_logout}) {

    const {subjectId} = useParams();
    const [teachers, setTeachers] = useState([]);
    const [subjectData, setSubjectData] = useState(null);
    const [fontSize, setFontSize] = useState(window.innerWidth <= 440 ? 9 : 5);
    const [minFontSize, setMinFontsize] = useState(window.innerWidth <= 440 ? 7 : 4);
    const [maxFontSize, setMaxFontsize] = useState(window.innerWidth <= 440 ? 9 : 5);
    const [phoneVersion, setPhoneVersion] = useState(window.innerWidth <= 440);
    const axiosInstance = axios.create({
        baseURL: 'https://students-retake-back.onrender.com/api',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('JwtToken')}`
        }
    })

    useEffect(() => {
        async function fetchData() {
            if (window.innerWidth <= 440){
                setFontSize(9);
                setMinFontsize(7);
                setMaxFontsize(9);
            }else{
                setFontSize(5);
                setMinFontsize(4);
                setMaxFontsize(5);
            }
            axiosInstance.get("/user/subject", {
                params: {
                    subjectId: subjectId
                }
            }).then(response => {
                setSubjectData(response.data);

            }).catch(error => console.error(error));

            axiosInstance.get("/user/subject/teachers", {
                params: {
                    subjectId: subjectId
                }
            }).then(response => {
                setTeachers(response.data);
            }).catch(error => {
                if (error.response && error.response.status === 403){
                    window.location.href="/auth";
                }
                else{
                    console.error(error);
                }
            });
        }

        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            const threshold = 2;
            const newSize = Math.max(minFontSize, maxFontSize - scrollY / threshold);

            setFontSize(newSize);
        }
        const handleResize = () => {
            setPhoneVersion(window.innerWidth <= 440);
        }

        fetchData();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        setPhoneVersion(window.innerWidth <= 440);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <div>
            {
                phoneVersion ? (<SpecialMobileHeader func_logout={func_logout}/>) :
                    (<Header func_logout={func_logout}/>)
            }
            <div className={styles.mainWrapper}>
                {subjectData && teachers ? (
                    <div className={styles.contentWrapper}>
                        <div className={styles.mainBanner}>
                            <h1 style={{
                                fontSize: `${fontSize}vw`,
                            }} className={styles.nameBanner}>{subjectData.name}</h1>
                        </div>
                        <div className={styles.subjectInfoWrapper}>
                            <div className={styles.subjectSectionWrapper}>
                                <h1 className={styles.sectionBanner}>Materials</h1>
                                <div className={styles.teachersWrapper}>
                                    <div className={styles.mistakeWrapper}>
                                        <h2>Materials have not been added yet</h2>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.subjectSectionWrapper}>
                                <h1 className={styles.sectionBanner}>Exam(Test)</h1>
                                <div className={styles.teachersWrapper}>
                                    <div className={styles.mistakeWrapper}>
                                        <h2>Materials have not been added yet</h2>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.subjectSectionWrapper}>
                                <h1 className={styles.sectionBanner}>Teachers</h1>
                                <div className={styles.teachersWrapper}>
                                    {teachers.length !== 0 ? (
                                        teachers.map((teacher) => (
                                            <Link to={`/teacher/${teacher.id}`} className={styles.teacherWrapper}
                                                  key={teacher.id}>
                                                <h2>{teacher.firstName}</h2>
                                                <h2>{teacher.lastName}</h2>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className={styles.mistakeWrapper}>
                                            <h2>
                                                Teachers have not been added yet
                                            </h2>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                ) : (
                    <LoadingSpinner/>
                )
                }
            </div>
        </div>
    )
}

export default SubjectPage;