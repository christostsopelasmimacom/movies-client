import React from 'react';
import styles from './ServerDown.module.css';

export const ServerDown = () => (
        <div className={styles.container}>
            <h1 className={styles.title}>Server is Down!</h1>
            <p className={styles.message}>The server is currently unavailable. Please try again later.</p>
        </div>
    );

