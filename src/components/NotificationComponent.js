import React, {useState, useContext} from "react";

const NotificationContext = React.createContext();
function NotificationComponent() {

    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, duration = 86400000) => {
        const id = Math.random().toString(36).substring(2, 9);
        setNotifications((prevNotifications) => [
            ...prevNotifications,
            {id, message},
        ]);

        setTimeout(() => {
            removeNotification(id);
        }, duration);
    };

    function getLength(){
        return notifications.length;
    }

    const removeNotification = (id) => {
        setNotifications((prevNotifications) => {
            return prevNotifications.filter((notification) => notification.id !== id);
        });
    };
    return (
        <div>
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className="notification"
                >
                    {notification.message}
                </div>
            ))}
        </div>
    );

}

export function useNotification() {
    return useContext(NotificationContext);
}

export default NotificationComponent;