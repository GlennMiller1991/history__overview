import React from "react";
import styles from './side-padding-wrapper.module.scss'

export const SidePaddingWrapper: React.FC<React.PropsWithChildren> = React.memo(({
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