import React from "react";
import styles from './swiper-control.module.scss';
import {Angle, AngleUnits, Matrix2d} from "@fbltd/math";

export const SwiperControl: React.FC = React.memo(() => {
    return (
        <div className={styles.container}>
            <div>
                <span>06/06</span>
            </div>
            <div>
                <button>
                    <Arrow angle={180}/>
                </button>
                <button>
                    <Arrow angle={0}/>
                </button>
            </div>
        </div>
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
        <svg style={{transform: `${Angle.toCSS(angle, units)}`}} width="10" height="14" viewBox="0 0 10 14" fill={'none'}>
            <path d="M1.50012 0.750001L7.75012 7L1.50012 13.25" stroke="#42567A" strokeWidth="2"/>
        </svg>
    )
})