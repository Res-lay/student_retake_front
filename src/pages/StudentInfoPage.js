import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import styles from "../styles/StudentInfoPage.module.css"
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";


function StudentInfoPage() {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        groupName: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(formData);
    }

    const [groups, setGroups] = useState([]);

    const axiosInstance = axios.create({
        baseURL: "https://students-retake-91s0.onrender.com/api/student",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("JwtToken")}`
        }
    });

    const axiosInstance2 = axios.create({
        baseURL: "https://students-retake-91s0.onrender.com/api/student",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("JwtToken")}`
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await axiosInstance2.post("/create/new-student", formData);
            if (response.status === 200) {
                window.location.href = "/";
            }else {
                window.location.href = "/auth";
            }
        } catch (err) { 
            console.error(err);
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axiosInstance.get("/groups/get-all");
                setGroups(response.data);
                console.log(response.data);
            } catch (err) {
                if (err.response && err.response.status === 403) {
                    window.location.href = "/auth";
                } else {
                    console.error(err);
                }
            }
        }
        fetchData();
    }, []);


    return (
        <div className={styles.mainWrapper}>
            <h1 className={styles.title}>
                We need more information about You
            </h1>
            <div className={styles.formWrapper}>
                {
                    groups ? (
                                <form onSubmit={handleSubmit} className={styles.formStyles}>
                                    <div className={styles.formSection}>
                                        <label htmlFor="name">Name:</label>
                                        <input className={styles.formField} name="firstName" value={formData.firstName}
                                            type="text" placeholder="Enter your name"
                                            onChange={handleInputChange} />
                                    </div>

                                    <div className={styles.formSection}>
                                        <label htmlFor="surname">Surname:</label>
                                        <input onChange={handleInputChange}
                                            className={styles.formField} name="lastName" value={formData.lastName}
                                            component="input" type="text" placeholder="Enter your surname" />
                                    </div>

                                    <div className={styles.formSection}>
                                        <label htmlFor="group">Student Group:</label>
                                        <select onChange={handleInputChange} value={formData.groupId}
                                            className={styles.formField} name="groupName">
                                            {groups.map(group => (
                                                <option key={group.id} value={group.name} className={styles.optionWrapper}>{group.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <button className={styles.submitButton} type="submit">
                                        Submit
                                    </button>
                                </form>
                        
                    ) : (
                        <LoadingSpinner />
                    )
                }
            </div>
        </div>
    )

};

export default StudentInfoPage;