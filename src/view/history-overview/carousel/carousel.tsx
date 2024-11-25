import {ViewController} from "../view.controller";
import React, {TransitionEventHandler} from "react";
import {observer} from "mobx-react-lite";
import {Angle, AngleUnits} from "@fbltd/math";
import classNames from "classnames";
import styles from "./carousel.module.scss";
import {Button} from "../_shared/_components/button/button";

type ICarousel = {
    controller: ViewController,
}
export const Carousel: React.FC<ICarousel> = observer(({controller}) => {

    const total = controller.historyItems.length
    const current = controller.historyIndex
    const angleCoef = (Math.PI * 2) / total
    const activeAngle = Angle.toRad(-45, AngleUnits.Deg)

    return (
        <>
            <svg className={classNames('sizes-parent', 'skipEvents', 'zi-0', styles.bg)}>
                <line x1={'0%'} y1={'50%'} x2={'100%'} y2={'50%'}/>
                <line x1={'50%'} y1={'0%'} x2={'50%'} y2={'100%'}/>
                <circle r={200} cx={'50%'} cy={'50%'}/>
            </svg>
            <div
                onTransitionEnd={controller.onTransitionEnd as unknown as TransitionEventHandler}
                className={classNames('sizes-parent', 'tr1000', 'zi-2', 'skipEvents', 'halfParent')}
                style={{
                    transform: `translate(-50%, -50%) ${Angle.toCSS(angleCoef * current + activeAngle, AngleUnits.Rad)}`
                }}>
                {
                    controller.historyItems.map((item, index) => {
                        let angle = angleCoef * index
                        const transform = `
                        translate(-50%, -50%) 
                        ${Angle.toCSS(-angle, AngleUnits.Rad)} 
                        translateX(200px) 
                        ${Angle.toCSS(angle, AngleUnits.Rad)}
                        ${Angle.toCSS(-angleCoef * current, AngleUnits.Rad)}
                        ${Angle.toCSS(-activeAngle, AngleUnits.Rad)}
                        `
                        const isActive = index === controller.historyIndex
                        return (
                            <div
                                key={`${index} ${item.title}`}
                                className={classNames('trackEvents', 'halfParent', 'position-abs', 'sizes-content', 'tr1000')}
                                style={{
                                    transform
                                }}>
                                <Button size={6}
                                        widerEventsField={10}
                                        className={classNames(
                                            styles.button,
                                            isActive && styles.activeButton,
                                            !isActive && styles.inactiveColor,
                                        )}
                                        onClick={() => controller.changeHistoryIndex(index)}>
                                    <span className={classNames(
                                        styles.caption,
                                        isActive && !controller.isTransition && styles.activeCaption,
                                    )}>
                                        {
                                            item.title
                                        }
                                    </span>
                                    {
                                        index + 1
                                    }
                                </Button>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
})