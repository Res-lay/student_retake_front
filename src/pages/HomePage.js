import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/HomePageStyles.module.css"

import { Link } from "react-router-dom";


import LineChart from "../components/LineChart";
import { PieChart } from "../components/PieChart";
import LoadingSpinner from "../components/LoadingSpinner";
import MainLoadingSpinner from "../components/MainLoadingSpinner";
import Header from "../components/Header";
import folder_blue from "../images/folder-open(blue).png"
import folder_red from "../images/folder-open(red).png"
import toProfileButton from "../images/chevron-right.png"
import user_image from "../images/Defaultavatar.jpeg"
import book2 from "../images/book.png"
import alert from "../images/alert-octagon.png"
import chat from "../images/Chat.png"
import CustomClock from "../components/CustomClock";
import MobileHeader from "../components/MobileHeader";





function HomePage({ func_logout }) {
    const axiosInstance = axios.create({
        baseURL: 'https://students-retake-91s0.onrender.com/api',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('JwtToken')}`
        }
    });

    const roles = {
        "ROLE_STUDENT": "student",
        "ROLE_TEACHER": "teacher",
        "ROLE_ADMIN": "admin"
    };
    const [studentData, setStudentData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [debtsData, setDebtsData] = useState();
    const [loading, setLoading] = useState(true);
    const [chartLoading, setChartLoading] = useState(false);
    const [chartType, setChartType] = useState('pie');
    const [imageData, setImageData] = useState(null);
    const [date, setDate] = useState();
    const [GPA, setGPA] = useState();
    const [mobileVersion, setMobileVersion] = useState(window.innerWidth <= 440);

    async function getImageData(userData) {
        try {
            const image = await axios.create({
                baseURL: userData.photoUrl,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('JwtToken')}`
                },
                responseType: "arraybuffer"
            }).get();
            const base64Image = btoa(
                new Uint8Array(image.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            const imageSrc = `data:${image.headers['content-type']};base64,${base64Image}`;
            setImageData(imageSrc);
            localStorage.removeItem('image');
            localStorage.setItem("image", imageSrc);
        } catch (error) {
            console.error(error);
        }
    }
    async function getDebts() {
        try {
            const response = await axios.create({
                baseURL: "https://students-retake-91s0.onrender.com/api/student/get-debts",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('JwtToken')}`
                }
            }).get();
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const getGPA = (array) => {
        var GPA = 0;
        for (const arrayElement of array) {
            GPA += arrayElement.mark;
        }
        return (GPA / array.length).toFixed(2);
    }

    async function renderData() {
        try {
            const userResponse = await axiosInstance.get("/user/user-info");
            
            localStorage.setItem("userData", JSON.stringify(userResponse.data));
            setUserData(userResponse.data);
            const userRole = userResponse.data.authorities[0].name;

            const dataResponse = await axiosInstance.get(`/${roles[userRole]}/get-info`);
            if (dataResponse.data.lastName === null || dataResponse.data.firstName === null) {
                window.location.href = "/student-information/confirmation";
            }
            const data = dataResponse.data;
            setStudentData(data);
            localStorage.setItem("studentData", JSON.stringify(data));

            if (userResponse.data.photoUrl !== null)
                await getImageData(userResponse.data);
            const debts = await getDebts();
            setDebtsData(debts.length);
            const response = await axios.create({
                baseURL: "https://students-retake-91s0.onrender.com/api/student/get-performance",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('JwtToken')}`
                }
            }).get();
            const array = response.data;
            setGPA(getGPA(array));
            const date = new Date();
            setDate(date.toLocaleDateString());
            setLoading(false);

        } catch (error) {
            if (error.response && error.response.status === 403) {
                window.location.href = "/auth";
            }
            else {
                console.error(error);
            }
        }
    }


    const handleResize = () => {
        setMobileVersion(window.innerWidth <= 440);
    }

    useEffect(() => {
        renderData();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        setChartLoading(true);
        setTimeout(() => {
            setChartLoading(false);
        }, 300)
    }, [chartType])

    return (
        loading && !GPA ? (
            <MainLoadingSpinner />
        ) : (
            <div className={styles.main_wrapper}>
                {
                    mobileVersion ? (
                        <MobileHeader func_logout={func_logout} />
                    ) : (
                        <Header func_logout={func_logout} />
                    )

                }
                <div className={styles.wrapper}>
                    <div className={styles.information_window}>
                        <div className={styles.graphs_list}>
                            <div className={styles.graph_type} style={{
                                background: "rgba(37, 55, 108, 0.4)",
                                opacity: chartType === "pie" ? 1 : 0.5,
                                transition: ".3s"
                            }}
                                onClick={() => setChartType('pie')}>
                                <img className={styles.type_img} src={folder_blue} alt='' />
                                <p style={{ color: "#4D79FF" }}>My Statistics</p>
                                <div className={styles.toProfileButton}>
                                    <img src={toProfileButton} alt="toProfileButton" style={{
                                        transform: chartType === "pie" ? "rotate(90deg)" : "",
                                        transition: ".3s"
                                    }} />
                                </div>
                            </div>
                            <div className={styles.graph_type} style={{
                                background: "rgba(188, 34, 45, 0.4)",
                                opacity: chartType === "line" ? 1 : 0.5,
                                transition: ".3s"
                            }}
                                onClick={() => setChartType('line')}>
                                <img className={styles.type_img} src={folder_red} alt="" />
                                <p style={{ color: "#FF4C58" }}>My Debts</p>
                                <div className={styles.toProfileButton}>
                                    <img src={toProfileButton} alt="toProfileButton" style={{
                                        transform: chartType === "line" ? "rotate(90deg)" : "",
                                        transition: ".3s"
                                    }} />
                                </div>
                            </div>
                        </div>
                        {chartLoading ? (
                            <div className={styles.information_window_container}>
                                <div className={styles.graph_wrapper}>
                                    <LoadingSpinner />
                                </div>
                            </div>
                        ) : (
                            <div className={styles.information_window_container}>
                                <div className={styles.graph_wrapper}>{chartType === "line" ? <LineChart /> : <PieChart />}
                                </div>
                            </div>
                        )}

                    </div>
                    <div className={styles.user_profile}>
                        <div className={styles.profile_info}>
                            <div className={styles.user_info}>
                                <Link to="/user-profile" className={styles.article}>
                                    <p>User profile</p>
                                </Link>
                                <div className={styles.toProfileButton}>
                                    <img src={toProfileButton} alt="toProfileButton" />
                                </div>
                            </div>
                            <div className={styles.banner}>
                                <div className={styles.banner_user_data_wrapper}>
                                    <div className={styles.imageContainer}>
                                        {imageData ? (
                                            <img className={styles.user_image} src={imageData} alt="User Image" />
                                        ) : (
                                            <img className={styles.user_image} src={user_image} alt="User Image" />
                                        )}
                                    </div>
                                    <div className={styles.user_data}>
                                        <h3 className={styles.user_fio}>
                                            {studentData.firstName || "No data"} {studentData.lastName || "No data"}
                                        </h3>
                                        <h4 className={styles.user_email}>{userData ? userData.email : "No data"}</h4>
                                    </div>
                                </div>
                                <div className={styles.user_score}>
                                    <div className={styles.param}>
                                        <p className={styles.param_name}>Group :</p>
                                        {
                                            studentData.group.name ? (
                                                <p className={styles.param_score}>{studentData.group.name || "No data"} </p>
                                            ) : (
                                                <p className={styles.param_score}>No data</p>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.skills}>
                            <div className={styles.skills_wrapper}>
                                <div className={styles.plate}>
                                    <div className={styles.plate_header}>
                                        <p className={styles.plate_date}>{date}</p>
                                    </div>
                                    <div className={styles.plate_data}>
                                        <CustomClock />
                                    </div>
                                </div>
                                <div className={styles.plate}>
                                    <div className={styles.plate_header}>
                                        <div className={styles.plate_icon} style={{ background: '#79E977' }}>
                                            <img className={styles.icon_img} src={book2} alt="" />
                                        </div>
                                        <p className={styles.plate_name}>Average Score</p>
                                    </div>
                                    <div className={styles.plate_data}>
                                        <p className={styles.data}>{GPA}</p>
                                        <p className={styles.data_add}>Your current score</p>
                                    </div>
                                </div>
                                <Link to={`/debts/${studentData.id}`} className={styles.plate}>
                                    <div className={styles.plate_header}>
                                        <div className={styles.plate_icon} style={{ background: '#F97878' }}>
                                            <img className={styles.icon_img} src={alert} alt="" />
                                        </div>
                                        <p className={styles.plate_name}>Your debts</p>
                                    </div>
                                    {
                                        debtsData ? (
                                            <div className={styles.plate_data}>
                                                <p className={styles.data} style={{ color: "#F97878FF" }}>{debtsData}</p>
                                                <p className={styles.data_add}>{debtsData === 0 ?
                                                    "U are awesome" : "Try to close your debts"} </p>
                                            </div>
                                        ) : (
                                            "none"
                                        )
                                    }

                                </Link>

                                <div className={styles.plate}>
                                    <div className={styles.plate_header}>
                                        <div className={styles.plate_icon} style={{ background: '#FFB978' }}>
                                            <img className={styles.icon_img} src={chat} alt="" />
                                        </div>
                                        <p className={styles.plate_name}>Notifications</p>
                                    </div>
                                    <div className={styles.plate_data}>
                                        <p className={styles.data}>None</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default HomePage;