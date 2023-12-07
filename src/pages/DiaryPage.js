import React, {useEffect, useState} from "react";

import styles from "../styles/DiaryPage.module.css"
import Header from "../components/Header";
import axios from "axios";
import MobileHeader from "../components/MobileHeader";
import LoadingSpinner from "../components/LoadingSpinner";

function DiaryPage() {

    const [subjectsData, setSubjectsData] = useState([]);
    const [numberOfTerms, setNumberOfTerms] = useState();
    const [activeButton, setActiveButton] = useState(null);
    const [numbersSortOption, setNumbersSortOption] = useState(null);
    const [lettersSortOption, setLettersSortOption] = useState(null);
    const [term, setTerm] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedSorting, setExpandedSorting] = useState(false);
    const [mobileVersion, setMobileVersion] = useState(window.innerWidth <= 440);
    const axiosInstance = axios.create({
        baseURL: 'https://students-retake-91s0.onrender.com/api',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('JwtToken')}`
        }
    });

    const getSubjectsForCurrentTerm = () => {
        return term ? subjectsData.filter(subject => subject.term === term) : subjectsData;
    };

    const sortSubjectsByMarks = (array) => {
        return numbersSortOption === "Ascend" ?
            array.sort((a, b) => a.mark > b.mark ? 1 : -1) :
            array.sort((a, b) => a.mark < b.mark ? 1 : -1);
    };
    const sortSubjectsByName = (array) => {
        console.log(array);
        return lettersSortOption === "Ascend" ?
            array.sort((a, b) => a.subject.name.localeCompare(b.subject.name, undefined,
                {sensitivity: 'base'})) :
            array.sort((a, b) => (b.subject.name).localeCompare(a.subject.name, undefined,
                {sensitivity: 'base'}));
    };

    const renderSubject = () => {
        const subjectsForCurrentTerm = getSubjectsForCurrentTerm();
        lettersSortOption && sortSubjectsByName(subjectsForCurrentTerm);
        numbersSortOption && sortSubjectsByMarks(subjectsForCurrentTerm);
        return subjectsForCurrentTerm.filter((subject) => {
            return searchQuery.toLowerCase() === '' ? subject :
                subject.subject.name.toLowerCase().includes(searchQuery.toLowerCase())
        }).map(subject => (
            <div key={subject.id} className={styles.subjectCard}>
                <h1 className={styles.subjectName}>{subject.subject.name}</h1>
                <h1 className={styles.subjectMark}>{subject.mark}</h1>
            </div>
        ));
    }

    const handleResize = () => {
        setMobileVersion(window.innerWidth <= 440);
    }


    useEffect(() => {
        async function fetchData() {
            try{
                const response = await axiosInstance.get('/student/get-performance');
                const studentResponse = await axiosInstance.get('/student/get-info');
                setSubjectsData(response.data);
                setNumberOfTerms(studentResponse.data.term);
            }catch (error){
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
            {mobileVersion ? (
                <MobileHeader/>
            ) : (
                <Header />
            )}
            <h1 className={styles.banner}>Digital diary</h1>
            <div className={styles.sortWrapper}>
                <div className={expandedSorting ? `${styles.expandedSortField}` : `${styles.sortField}` }>
                    <h1 className={styles.sortBanner} onClick={() => {
                        setExpandedSorting(true)
                    }}>
                       Sorting options
                    </h1>
                    <div className={styles.section}>
                        <h3 className={styles.sectionName}>Terms:</h3>
                        {numberOfTerms ? (
                            <div className={styles.sortKeyWrapper}>
                                {Array.from({length: numberOfTerms - 1}, (_, index) => (
                                    <div className={activeButton === index ?
                                        `${styles.sortKey} ${styles.activeButton}` :
                                        `${styles.sortKey}`} key={index} onClick={() => {
                                        setTerm(() => {
                                            return index + 1;
                                        });
                                        setActiveButton(index);
                                    }}>
                                        {index + 1}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            ""
                        )
                        }
                    </div>
                    <div className={styles.section}>
                        <h3 className={styles.sectionName}>Sort by marks:</h3>
                        <div className={styles.sortKeyWrapper}>
                            <div className={numbersSortOption === "Ascend" ?
                                `${styles.sortKey2} ${styles.activeButton}` :
                                `${styles.sortKey2}`} onClick={() => {
                                setNumbersSortOption("Ascend");
                            }
                            }>Ascend
                            </div>
                            <div className={numbersSortOption === "Descend" ?
                                `${styles.sortKey2} ${styles.activeButton}` :
                                `${styles.sortKey2}`} onClick={() => {
                                setNumbersSortOption("Descend");
                            }}>Descent
                            </div>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <h3 className={styles.sectionName}>Sort by name:</h3>
                        <div className={styles.sortKeyWrapper}>
                            <div className={lettersSortOption === "Ascend" ?
                                `${styles.sortKey2} ${styles.activeButton}` :
                                `${styles.sortKey2}`} onClick={() => {
                                setLettersSortOption("Ascend");
                            }
                            }>Ascend
                            </div>
                            <div className={lettersSortOption === "Descend" ?
                                `${styles.sortKey2} ${styles.activeButton}` :
                                `${styles.sortKey2}`} onClick={() => {
                                setLettersSortOption("Descend");
                            }}>Descent</div>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.clearButton} onClick={() => {
                            setTerm(null);
                            setActiveButton(null);
                            setLettersSortOption(null);
                            setNumbersSortOption(null);
                        }}>
                            <p>Clear</p>
                        </div>
                        <div className={styles.clearButton} onClick={() => {
                            setExpandedSorting(false);
                            console.log(expandedSorting);
                        }}>
                            <p>Hide</p>
                        </div>
                    </div>


                </div>
            </div>
            <div className={styles.searchWrapper}>
                <input
                    type="text"
                    placeholder="Subject name"
                    className={styles.search}
                    onChange={(e) =>
                        setSearchQuery(e.target.value)}
                />
            </div>

            <div className={styles.contentWrapper}>
                <div className={styles.info}>
                    <h2 className={styles.infoParam}>Subject</h2>
                    <h2 className={styles.infoParam}>Mark</h2>
                </div>
                {subjectsData ? (
                    renderSubject()
                ) : (
                    <LoadingSpinner />
                )}
            </div>
        </div>
    );
}

export default DiaryPage;