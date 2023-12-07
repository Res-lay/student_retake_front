import React, {useEffect, useState} from "react";

import styles from "../styles/SubjectsPage.module.css"
import Header from "../components/Header";
import axios from "axios";
import {Link} from "react-router-dom";
import MobileHeader from "../components/MobileHeader";
import LoadingSpinner from "../components/LoadingSpinner";

function SubjectsPage({func_logout}) {

    const [subjects, setSubjects] = useState([]);
    const [student, setStudent] = useState(null);
    const [expandedSubject, setExpandedSubject] = useState(null);
    const [subjectsTeacher, setSubjectsTeacher] = useState({});
    const [phoneVersion, setPhoneVersion] = useState(window.innerWidth <= 440);


    const axiosInstance = axios.create({
        baseURL: 'https://students-retake-91s0.onrender.com/api',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('JwtToken')}`
        }
    });

    const handleSubjectClick = (subjectId) => {
        setTimeout(() => setExpandedSubject((previous) => (previous === subjectId ? null :
            subjectId)), 20);
    };


    useEffect(() => {
        const handleResize = () => {
            setPhoneVersion(window.innerWidth <= 440);
        }

        async function fetchData() {
            try {
                const response = await axiosInstance.get("/student/get-info");
                const subjects = response.data.group.subjects;

                setSubjects(subjects);
                setStudent(response.data);

                const teacherRequests = subjects.map(subject => {
                    return axiosInstance.get("/user/get-teacher", {
                        params: {
                            subjectId: subject.id,
                            groupId: response.data.group.id  // Use response.data.group.id instead of student.group.id
                        }
                    });
                });

                const teacherResponses = await Promise.all(teacherRequests);

                const map = {};
                teacherResponses.forEach((response, index) => {
                    map[subjects[index].id] = response.data;
                });

                setSubjectsTeacher(map);
            } catch (error) {
                if (error.response && error.response.status === 403){
                    window.location.href="/auth";
                }
                else{
                    console.error(error);
                }
            }

        }

        fetchData();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <div>
            {
                subjects.length !== 0 ? (
                    <div className={styles.mainWrapper}>
                        {phoneVersion ?
                            (
                                <MobileHeader func_logout={func_logout}/>
                            ) : (
                                <Header func_logout={func_logout}/>
                            )
                        }
                        <div className={styles.subjectsWrapper}>
                            <h1 className={styles.banner}>Education plan</h1>
                            <div className={styles.subjectsWrapper}>
                                {subjects.length !== 0 ? (
                                    subjects.map((subject) => (
                                        <div
                                            className={expandedSubject === subject.id ? `${styles.expandedSubjectWrapper}` :
                                                `${styles.subjectWrapper}`} key={subject.id}
                                            onClick={() => handleSubjectClick(subject.id)}>
                                            <div className={styles.subjectInfoWrapper}>
                                                <div className={styles.groupA}>
                                                    <h1 className={styles.subjectName}>{subject.name}</h1>
                                                    <Link className={styles.moreButton}
                                                          to={`/subject/${subject.id}`}>More</Link>
                                                </div>
                                                <div className={styles.subjectDetails}>
                                                    <h2 className={styles.aboutSubject}>Type of
                                                        control: {subject.exam}</h2>
                                                    <h2 className={styles.aboutSubject}>
                                                        Teacher: {subjectsTeacher[subject.id] ?
                                                        `${subjectsTeacher[subject.id].firstName} ${subjectsTeacher[subject.id].lastName}`
                                                        : 'No Data'}
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.subjectWrapper}>No subjects for this group</div>
                                )
                                }
                            </div>
                        </div>
                    </div>
                ) : (
                    <LoadingSpinner/>
                )
            }
        </div>

    )
}

export default SubjectsPage;