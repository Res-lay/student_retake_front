import React, {useState} from "react";
import styles from "../styles/FormStyles.module.css"
import axios from "axios";

function GroupDataForm(){

    const [FormData, setFormData] = useState({
        groupName: "",
        studentId: "",
        groupId: "",
        subjectId: ""
    });
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...FormData,
            [name]: value,
        });
    };


    const [messageType, setMessageType] = useState(null)
    const [message, setMessage] = useState("User successfully created");

    const axiosTemplate = axios.create({
        baseURL: 'https://students-retake-back.onrender.com/api/admin/groups',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('JwtToken')}`
        }
    });

    const handleSubmit = async(e, action) => {
        e.preventDefault();
        let url = "";
        if (action === "deleteGroup"){
            url = "/delete-group?id=" + FormData.groupId;
            await axiosTemplate.delete(url).then(response => {
                setMessage("Group successfully deleted");
                setMessageType("correct");
            }).catch(error => {
                setMessageType("error")
                setMessage("Something went wrong")
            })
        }else if (action === "deleteSubject"){
            url = "/remove-subject?subjectId="+FormData.subjectId+"&groupId="+FormData.groupId;
            await axiosTemplate.delete(url).then(response => {
                setMessage("Subject successfully removed");
                setMessageType("correct");
            }).catch(error => {
                setMessageType("error")
                setMessage("Something went wrong")
            })
        } else if (action === "newGroup"){
            await axiosTemplate.post(url, FormData).then(response => {
                setMessage("Group successfully created");
                setMessageType("correct")
            }).catch(e => {
                setMessageType("error")
                setMessage("Something went wrong")
            })
        }
        else{
            if (action === "addStudent")
                url = "/add-student"
            else if (action === "addSubject")
                url = "/add-subject";
            await axiosTemplate.put(url, FormData).then(response => {
                setMessage("Success");
                setMessageType("correct")
            }).catch(e => {
                setMessageType("error")
                setMessage("Something went wrong")
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
            <p className={styles.inputInfo}>Create Group</p>
            <form className={styles.formWrapper2} onSubmit={(e) =>
                handleSubmit(e, "newGroup")}>
                <div className={styles.inputWrapperForFormWrapper2}>
                    <label htmlFor="name">Group Name</label>
                    <input className={styles.inputField}
                           type="text"
                           required
                           id="name"
                           name="groupName"
                           onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className={styles.submitButton}>
                    Create
                </button>
            </form>
            <p className={styles.inputInfo}>Add Student to Group</p>
            <form className={styles.formWrapper2} onSubmit={(e) =>
                handleSubmit(e, "addStudent")}>
                <div className={styles.inputWrapperForFormWrapper2}>
                    <label htmlFor="groupId">Group ID</label>
                    <input className={styles.inputField}
                           type="text"
                           required
                           id="groupId"
                           name="groupId"
                           onChange={handleInputChange}
                    />
                </div>
                <div className={styles.inputWrapperForFormWrapper2}>
                    <label htmlFor="studentId">Student ID</label>
                    <input className={styles.inputField}
                           type="text"
                           required
                           id="studentId"
                           name="studentId"
                           onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className={styles.submitButton}>
                    Add
                </button>
            </form>
            <p className={styles.inputInfo}>Add Subject to Group</p>
            <form className={styles.formWrapper2} onSubmit={(e) =>
                handleSubmit(e, "addSubject")}>
                <div className={styles.inputWrapperForFormWrapper2}>
                    <label htmlFor="groupId">Group ID</label>
                    <input className={styles.inputField}
                           type="text"
                           required
                           id="groupId"
                           name="groupId"
                           onChange={handleInputChange}
                    />
                </div>
                <div className={styles.inputWrapperForFormWrapper2}>
                    <label htmlFor="subjectId">Subject ID</label>
                    <input className={styles.inputField}
                           type="text"
                           required
                           id="subjectId"
                           name="subjectId"
                           onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className={styles.submitButton}>
                    Add
                </button>
            </form>
            <p className={styles.inputInfo}>Delete Group</p>
            <form className={styles.formWrapper2} onSubmit={(e) =>
                handleSubmit(e, "deleteGroup")}>
                <div className={styles.inputWrapperForFormWrapper2}>
                    <label htmlFor="groupId">Group ID</label>
                    <input className={styles.inputField}
                           type="text"
                           required
                           id="groupId"
                           name="groupId"
                           onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className={styles.submitButton}>
                    Delete
                </button>
            </form>
            <p className={styles.inputInfo}>Remove Subject from Group</p>
            <form className={styles.formWrapper2} onSubmit={(e) =>
                handleSubmit(e, "deleteSubject")}>
                <div className={styles.inputWrapperForFormWrapper2}>
                    <label htmlFor="groupId">Group ID</label>
                    <input className={styles.inputField}
                           type="text"
                           required
                           id="groupId"
                           name="groupId"
                           onChange={handleInputChange}
                    />
                </div>
                <div className={styles.inputWrapperForFormWrapper2}>
                    <label htmlFor="subjectId">Subject ID</label>
                    <input className={styles.inputField}
                           type="text"
                           required
                           id="subjectId"
                           name="subjectId"
                           onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className={styles.submitButton}>
                    Remove
                </button>
            </form>
        </div>
    );
}

export default GroupDataForm;