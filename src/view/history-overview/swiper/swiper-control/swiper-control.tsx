import React, {HTMLAttributes} from "react";
import {Angle, AngleUnits} from "@fbltd/math";

export const SwiperControl: React.FC = React.memo(() => {
    return (
        <Space gap={20}>
            <Button size={50}>
                <Arrow angle={180}/>
            </Button>
            <Button size={50}>
                <Arrow angle={0}/>
            </Button>
        </Space>
    )
})

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
    size: number | string
} & HTMLAttributes<HTMLButtonElement>
export const Button: React.FC<React.PropsWithChildren<IButton>> = React.memo(({
                                                                                  children,
                                                                                  size,
                                                                                  style = {},
                                                                                  ...props
                                                                              }) => {
    return (
        <button style={{
            width: size,
            height: size,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid blue',
            borderRadius: '50%',
            outline: 'none',
            cursor: 'pointer',
            ...style
        }}
                {...props}>
            {
                children
            }
        </button>
    )
})

type ISpace = {
    gap?: number | string
} & HTMLAttributes<HTMLDivElement>
export const Space: React.FC<React.PropsWithChildren<ISpace>> = React.memo(({
                                                                                children,
                                                                                gap = 0,
                                                                                style = {},
                                                                                ...props
                                                                            }) => {

    style = {
        ...{display: 'flex', justifyContent: 'center', alignItems: 'center', gap, width: 'max-content'},
        ...style
    }

    return (
        <div style={style}>
            {
                children
            }
        </div>
    )
})