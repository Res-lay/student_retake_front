import React from 'react';
import styles from '../styles/LoadingSpinner.module.css'; // Замените на ваши собственные стили

function LoadingSpinner() {
    return (
        <div className={styles.loadingSpinner}>
            <div className={styles.spinner}></div>
        </div>
    );
}

export default LoadingSpinner;
