import Clock from "react-live-clock"

import styles from "../styles/Clock.module.css"

function CustomClock(){

    return(
        <div className={styles.wrapper}>
            <div className={styles.clock}>
                <Clock format={'HH:mm:ss'} ticking={true} timezone={'Europe/Moscow'}/>
            </div>
        </div>
    )
}

export default CustomClock;