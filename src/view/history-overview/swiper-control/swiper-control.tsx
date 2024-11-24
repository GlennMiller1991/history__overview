import React, {ButtonHTMLAttributes, HTMLAttributes} from "react";
import {Angle, AngleUnits} from "@fbltd/math";
import styles from './swiper-control.module.scss'
import classNames from "classnames";

type IArrow = {
    angle?: number,
    units?: AngleUnits
}
export const Arrow: React.FC<IArrow> = React.memo(({
                                                       angle = 0,
                                                       units = AngleUnits.Deg,
                                                   }) => {
    return (
        <svg style={{transform: `${Angle.toCSS(angle, units)}`}} width="10" height="14" viewBox="0 0 10 14"
             fill={'none'}>
            <path d="M1.50012 0.750001L7.75012 7L1.50012 13.25" stroke="#42567A" strokeWidth="2"/>
        </svg>
    )
})

type IButton = {
    size: number | string,
    widerEventsField?: number | string,
} & React.DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
export const Button: React.FC<React.PropsWithChildren<IButton>> = React.memo(({
                                                                                  children,
                                                                                  size,
                                                                                  widerEventsField,
                                                                                  style = {},
                                                                                  className,
                                                                                  ...props
                                                                              }) => {
    return (
        <button style={{
            width: size,
            height: size,
            ...style
        }}
                className={classNames(styles.button, className)}

                {...props}>
            <div>
            {
                children
            }
            </div>

            {
                widerEventsField &&
                <div
                    style={{
                        inset: typeof widerEventsField === 'number' ? widerEventsField * -1 :
                            widerEventsField.startsWith('-') ? widerEventsField.slice(1) : ('-' + String(widerEventsField))
                    }}
                    className={styles.eventsField}>

                </div>
            }
        </button>
    )
})

type ISpace = {
    gap?: number | string,
    direction?: 'column' | 'row'
} & HTMLAttributes<HTMLDivElement>
export const Space: React.FC<React.PropsWithChildren<ISpace>> = React.memo(({
                                                                                children,
                                                                                gap = 0,
                                                                                direction = 'row',
                                                                                style = {},
                                                                                ...props
                                                                            }) => {

    style = {
        ...{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap,
            width: '100%',
            flexDirection: direction
        },
        ...style
    }

    return (
        <div style={style} {...props}>
            {
                children
            }
        </div>
    )
})