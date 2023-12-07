import React, {useState} from "react";
import styles from "../styles/FormStyles.module.css"
import axios from "axios";

function SubjectDataForm(){

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
                <p className={styles.message} style={{
                    background: message === "Something went wrong" ?
                        "rgba(204,25,56,0.73)" : "rgba(60,208,37,0.73)"
                }}>
                    {message}
                </p>
            </div>
            <p className={styles.inputInfo}>Create Subject</p>
            <form className={styles.formWrapper2} onSubmit={handleSubmit}>
                <div className={styles.inputWrapperForFormWrapper2}>
                    <label htmlFor="name">Subject Name</label>
                    <input className={styles.inputField}
                           type="text"
                           required
                           id="name"
                           name="name"
                           onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className={styles.submitButton}>
                    Create
                </button>
            </form>
            <p className={styles.inputInfo}>Add Teacher to Subject</p>
            <form className={styles.formWrapper2} onSubmit={handleSubmit}>
                <div className={styles.inputWrapperForFormWrapper2}>
                    <label htmlFor="name">Teacher ID</label>
                    <input className={styles.inputField}
                           type="text"
                           required
                           id="name"
                           name="name"
                           onChange={handleInputChange}
                    />
                </div>
                <div className={styles.inputWrapperForFormWrapper2}>
                    <label htmlFor="name">Subject ID</label>
                    <input className={styles.inputField}
                           type="text"
                           required
                           id="name"
                           name="name"
                           onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className={styles.submitButton}>
                    Add
                </button>
            </form>
            <p className={styles.inputInfo}>Delete Subject</p>
            <form className={styles.formWrapper2} onSubmit={handleSubmit}>
                <div className={styles.inputWrapperForFormWrapper2}>
                    <label htmlFor="name">Subject ID</label>
                    <input className={styles.inputField}
                           type="text"
                           required
                           id="name"
                           name="name"
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

export default SubjectDataForm;