import React, {useEffect, useState} from "react";
import styles from "../styles/DebtsPage.module.css"
import MobileHeader from "../components/MobileHeader";
import Header from "../components/Header";
import axios from "axios";
import {useParams} from "react-router-dom";


function DebtsPage({func_logout}) {
    const [mobileVersion, setMobileVersion] = useState(window.innerWidth <= 440);
    const [debtsData, setDebtsData] = useState([]);

    const {studentId} = useParams();

    const axiosInstance = axios.create({
        baseURL: 'https://students-retake-91s0.onrender.com/api/student',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('JwtToken')}`
        }
    });

    function formatDate(timeSamp) {
        const data = new Date(timeSamp[0], timeSamp[1] - 1, timeSamp[2]).toLocaleDateString();

        return data;
    }

    const handleResize = () => {
        setMobileVersion(window.innerWidth <= 440);
    }

    async function fetchData() {
        axiosInstance.get('/debts', {
            params: {
                studentId: studentId
            }
        }).then(response => {
            setDebtsData(response.data);
        }).catch(error => {
            if (error.response && error.response.status === 403){
                window.location.href="/auth";
            }
            else{
                console.error(error);
            }
        });
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        fetchData();

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <div>
            {mobileVersion ? (
                <MobileHeader func_logout={func_logout}></MobileHeader>
            ) : (
                <Header func_logout={func_logout}></Header>
            )}
            <div className={styles.mainWrapper}>
                <div className={styles.bannerWrapper}>
                    <h1 className={styles.banner}>Your Debts</h1>
                </div>
                <div className={styles.contentWrapper}>
                    {
                        debtsData ? (
                            <div className={styles.debtsWrapper}>
                                <table>
                                    <thead>
                                    <tr>
                                        <th className={styles.tableHead}>Subject</th>
                                        <th className={styles.tableHead}>Term</th>
                                        <th className={styles.tableHead}>Retake Day</th>
                                        <th className={styles.tableHead}>Result</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {debtsData.map(debt => (
                                        <tr className={styles.debtWrapper} key={debt.id}>
                                            <td className={styles.tableData}>{debt.subject.name}</td>
                                            <td className={styles.tableData}>{debt.term}</td>
                                            <td className={styles.tableData}>{formatDate(debt.retakeDay)}</td>
                                            <td className={styles.tableData}>-</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <h2>You have no debts. Keep it going</h2>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default DebtsPage;