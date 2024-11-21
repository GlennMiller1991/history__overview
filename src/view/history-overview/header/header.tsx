import React from "react";
import styles from './header.module.scss';

export const Header: React.FC<React.PropsWithChildren> = React.memo(({
                                                         children
                                                     }) => {
    return (
        <div className={styles.container}>
            {
                children
            }
        </div>
    )
})