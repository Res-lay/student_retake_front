import React from 'react';
import styles from '../styles/MainLoadingSpinner.module.css'; // Замените на ваши собственные стили

function MainLoadingSpinner() {
    return (
        <div className={styles.loadingSpinner}>
            <div className={styles.spinner}></div>
        </div>
    );
}

export default MainLoadingSpinner;
