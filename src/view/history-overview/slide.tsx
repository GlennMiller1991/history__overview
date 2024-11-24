import React from "react";
import classNames from "classnames";

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
            style={{
                fontSize: 20,
                lineHeight: '30px',
                fontWeight: 400,
                minWidth: 200,
                maxWidth: 400,
                height: 135,
                display: 'flex',
                flexDirection: 'column'
            }}>
            <div style={{
                fontFamily: 'var(--history-font-family-secondary)',
                color: 'var(--blue)',
                fontSize: 25
            }}>{title}</div>
            <div
                className={classNames('scroll-hidden')}
                style={{
                    flexGrow: 1,
                    overflowY: 'scroll'
                }}>{description}</div>
        </div>
    )
})