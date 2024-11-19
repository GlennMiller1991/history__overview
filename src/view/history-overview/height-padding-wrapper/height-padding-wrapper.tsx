import React from "react";
import styles from './height-padding-wrapper.module.scss';

export const HeightPaddingWrapper: React.FC<React.PropsWithChildren> = React.memo(({
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