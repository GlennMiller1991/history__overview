import React from "react";
import styles from './content-row.module.scss';

type IContentRow = {
    mark?: boolean,
}
export const ContentRow: React.FC<React.PropsWithChildren<IContentRow>> = React.memo(({
                                                                                          mark,
                                                                                          children
                                                                                      }) => {
    return (
        <>
            <div className={styles.container}>
                {
                    mark && <div className={styles.marked}/>
                }
                {
                    children
                }
            </div>
        </>

    )
})