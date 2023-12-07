import React, {useState} from "react";
import AdminHeader from "../components/AdminHeader";
import styles from "../styles/AdminHomePage.module.css"
import NewUserForm from "../components/NewUserForm";
import GroupDataForm from "../components/GroupDataForm";
import SubjectDataForm from "../components/SubjectDataForm";
import UserDataForm from "../components/UserDataForm";

function AdminHomePage(){

    const [state, setState] = useState("New User");

    function handleButtonClick(buttonName){
        setState(buttonName);
    }

    const formComponents = {
        "New User": <NewUserForm />,
        "Group Settings" : <GroupDataForm />,
        "Subject Settings" : <SubjectDataForm/>,
        "User Settings" : <UserDataForm/>

    }

    return (
        <div>
            <AdminHeader/>

            <div className={styles.mainWrapper}>
                <div className={styles.adminPanel}>
                    <div className={styles.button} onClick={() =>
                        handleButtonClick("Group Settings")}>Group Settings
                    </div>
                    <div className={styles.button} onClick={() =>
                        handleButtonClick("Subject Settings")}>Subject Settings
                    </div>
                    <div className={styles.button} onClick={() =>
                        handleButtonClick("New User")}>New User
                    </div>
                    <div className={styles.button} onClick={() =>
                        handleButtonClick("User Settings")}>User Settings
                    </div>
                </div>
                <div className={styles.infoPanel} style={{height: state === "Group Settings" ? "860px" : "640px"}}>
                    <div className={styles.nameWrapper}>
                    <h1 className={styles.actionName}>{state}</h1>
                    </div>
                    {formComponents[state]}
                </div>
            </div>

        </div>
    )
}

export default AdminHomePage;