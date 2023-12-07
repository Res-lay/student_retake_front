import React, {useState} from "react";
import styles from "../styles/FormStyles.module.css";
import axios from "axios";

function NewUserForm(){

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: ""
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

    const handleSubmit = async(e) => {
        e.preventDefault();
        await axios.post("https://students-retake-91s0.onrender.com/api/auth/signup", formData).then(response => {
            if (response.status === 200){
                setMessage("User successfully created");
                setMessageType("correct")
            }
        }).catch(e => {
            setMessageType("error")
            setMessage("Something went wrong")
            console.log(messageType);
            console.error(e);
        })
        setTimeout(() => {
            setMessageType(null);
            }, 3000)
    }

    return(
        <div>

            <div className={styles.messageWrapper} style={{opacity: messageType ? "1" : "0"}}>
                <p className={styles.message} style={{background: message === "Something went wrong" ?
                        "rgba(204,25,56,0.73)" : "rgba(60,208,37,0.73)"}}>
                    {message}
                </p>
            </div>
            <form className={styles.formWrapper} onSubmit={handleSubmit}>
                <label htmlFor="password">Email</label>
                <input className={styles.inputField}
                       type="text"
                       required
                       id="email"
                       name="email"
                       onChange={handleInputChange}
                />
                <label htmlFor="password">Password</label>
                <input className={styles.inputField}
                       type="text"
                       id="password"
                       name="password"
                       onChange={handleInputChange}
                />
                <label htmlFor="role">Role</label>
                <input className={styles.inputField}
                       type="text"
                       id="role"
                       onChange={handleInputChange}
                       name="role"
                />
                <button type="submit" className={styles.submitButton}>
                    Create
                </button>
            </form>
        </div>
    )

}

export default NewUserForm