import React from "react";
import styles from './header.module.scss';

export const Header: React.FC = React.memo(() => {
    return (
        <div className={styles.container}>
            Исторические<br/>даты
        </div>
    )
})