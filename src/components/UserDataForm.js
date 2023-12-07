import React, {useState} from "react";
import styles from "../styles/FormStyles.module.css"
import axios from "axios";

function UserDataForm(){

    const axiosInstance = axios.create({
        baseURL: "https://students-retake-91s0.onrender.com/api/admin/",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("JwtToken")}`
        }
    })

    const [formData, setFormData] = useState({
        groupName: "",
        id: "",
        firstName: "",
        lastName: "",
        term: "",
        code: "",
    });
    const [messageType, setMessageType] = useState(null)
    const [message, setMessage] = useState("User successfully created");

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async(e, action) => {
        e.preventDefault();
        if (action === "updateInfo"){
            await axiosInstance.put("/student/set-info", formData).then(response => {
                setMessage("Student info successfully set");
                setMessageType("correct");
            }).catch(error => {
                setMessageType("error");
                setMessage("Something went wrong");
                console.error(error);
            })
        }else{
            await axiosInstance.delete("/user/delete").then(response => {
                setMessage("User successfully deleted");
                setMessageType("correct");
            }).catch(error => {
                setMessageType("error");
                setMessage("Something went wrong");
                console.error(error);
            })
        }

        setTimeout(() => {
            setMessageType(null);
        }, 3000)
    }

    return(
        <div>
            <div className={styles.messageWrapper} style={{opacity: messageType ? "1" : "0"}}>
                <p className={styles.message} style={{
                    background: message === "Something went wrong" ?
                        "rgba(204,25,56,0.73)" : "rgba(60,208,37,0.73)"
                }}>
                    {message}
                </p>
            </div>
            <p className={styles.inputInfo}>Add Student Info</p>
            <form className={styles.formWrapper2} onSubmit={(e) =>
                handleSubmit(e, "updateInfo")}>
                <div className={styles.inputWrapperForFormWrapper2}>
                    <label htmlFor="ID">ID</label>
                    <input className={styles.inputField}
                           type="text"
                           required
                           id="ID"
                           name="id "
                           onChange={handleInputChange}
                    />
                </div>
                <div className={styles.inputWrapperForFormWrapper2}>
                    <label htmlFor="firstName">First Name</label>
                    <input className={styles.inputField}
                           type="text"
                           required
                           id="firstName"
                           name="firstName"
                           onChange={handleInputChange}
                    />
                </div>
                <div className={styles.inputWrapperForFormWrapper2}>
                    <label htmlFor="lastName">Last Name</label>
                    <input className={styles.inputField}
                           type="text"
                           required
                           id="lastName"
                           name="lastName"
                           onChange={handleInputChange}
                    />
                </div>
                <div className={styles.inputWrapperForFormWrapper2}>
                    <label htmlFor="term">Term</label>
                    <input className={styles.inputField}
                           type="text"
                           required
                           id="term"
                           name="term"
                           onChange={handleInputChange}
                    />
                </div>
                <div className={styles.inputWrapperForFormWrapper2}>
                    <label htmlFor="code">Code</label>
                    <input className={styles.inputField}
                           type="text"
                           required
                           id="code"
                           name="code"
                           onChange={handleInputChange}
                    />
                </div>
                <div className={styles.inputWrapperForFormWrapper2}>
                    <label htmlFor="groupName">Group Name</label>
                    <input className={styles.inputField}
                           type="text"
                           required
                           id="groupName"
                           name="groupName"
                           onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className={styles.submitButton}>
                    Add
                </button>
            </form>

            <p className={styles.inputInfo}>Delete User</p>
            <form className={styles.formWrapper2} onSubmit={handleSubmit}>
                <div className={styles.inputWrapperForFormWrapper2}>
                    <label htmlFor="id">User ID</label>
                    <input className={styles.inputField}
                           type="text"
                           required
                           id="id"
                           name="ID"
                           onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className={styles.submitButton}>
                    Delete
                </button>
            </form>
        </div>
    );
}

export default UserDataForm;