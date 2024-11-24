import React from "react";
import classNames from "classnames";
import styles from './slide.module.scss'

type ISlide = {
    title: string,
    description: string,
}
export const Slide: React.FC<ISlide> = React.memo(({
                                                       title,
                                                       description,
                                                   }) => {
    return (
        <div
            className={classNames(
                'fs-20',
                'font-weight-400',
                styles.container
            )}>
            <div>{title}</div>
            <div className={classNames('scroll-hidden')}>{description}</div>
        </div>
    )
})