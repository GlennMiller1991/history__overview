import React, {HTMLAttributes, useEffect, useRef, useState} from "react";
import styles from './history-overview.module.scss'
import {Header} from "./header/header";
import {ContentRow} from "./content-row/content-row";

import {Arrow, Button, Space} from "./swiper/swiper-control/swiper-control";
import {Swiper, SwiperSlide} from "swiper/react";
import {Swiper as Slider} from 'swiper';
import "swiper/css/bundle";
import {Angle, AngleUnits} from "@fbltd/math";
import classNames from "classnames";
import {observer} from "mobx-react-lite";
import {action, makeObservable} from "mobx";

type IRange = [number, number]
export type IHistoryEvent = {
    title: string,
    description: string,
    year: number,
}
export type IHistoryItem = {
    title: string,
    range: IRange,
    events: Array<IHistoryEvent>
}
type IHistoryOverview = {
    title: React.JSX.Element,
    items: Array<IHistoryItem>
}

export class ViewController {
    transitionTime = 1000 //ms
    historyIndex: number = 0
    isTransition: boolean = false
    swiper: Slider | undefined = undefined
    forceRenderFlag = 0

    get historyItem() {
        return this.historyItems[this.historyIndex]
    }

    constructor(public historyItems: IHistoryItem[]) {
        makeObservable(this, {
            historyIndex: true,
            isTransition: true,
            swiper: true,
            forceRenderFlag: true,

            setHistoryIndex: action,
            setIsTransition: action,
            setSwiper: action,
            forceRerender: action,
        })
        this.init()
    }

    init() {
        if (!this.historyItems.length) throw new Error('По условию ТЗ')
    }

    setHistoryIndex = (index: number) => {
        this.historyIndex = index
    }

    setIsTransition = (value: boolean) => {
        this.isTransition = value
    }

    changeHistoryIndex = (index: number) => {
        if (index === this.historyIndex) return
        this.setHistoryIndex(index)
        this.setIsTransition(true)
    }

    setSwiper = (swiper: Slider) => {
        this.swiper = swiper
    }

    forceRerender = () => {
        this.forceRenderFlag++
    }

    get state() {
        return {
            isReady: !!this.swiper,
            renderFlag: this.forceRenderFlag,
            swiper: this.swiper,

        }
    }
}


export const HistoryOverview: React.FC<IHistoryOverview> = observer(({
                                                                         title,
                                                                         items,
                                                                     }) => {

    const [controller] = useState(() => new ViewController(items))
    const {isReady, swiper} = controller.state;

    function padStart(value: number) {
        return String(value).padStart(2, '0')
    }


    const angleCoef = (Math.PI * 2) / items.length
    const activeAngle = Angle.toRad(-45, AngleUnits.Deg)

    return (
        <div className={styles.container} style={{opacity: Number(isReady)}}>
            <ContentRow mark>
                <Header>
                    {
                        title
                    }
                </Header>
            </ContentRow>


            <svg style={{
                position: 'absolute',
                width: '100%',
                aspectRatio: 1,
                zIndex: -1,
                pointerEvents: 'none',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <line x1={'0%'} y1={'50%'} x2={'100%'} y2={'50%'} stroke={'var(--dark-primary-transparent)'}
                      strokeWidth={1} vectorEffect={'non-scaling-stroke'}/>
                <line x1={'50%'} y1={'0%'} x2={'50%'} y2={'100%'} stroke={'var(--dark-primary-transparent)'}
                      strokeWidth={1} vectorEffect={'non-scaling-stroke'}/>
                <circle r={200} cx={'50%'} cy={'50%'} stroke={'var(--dark-primary-transparent)'} strokeWidth={1}
                        vectorEffect={'non-scaling-stroke'} fill={'none'}/>
            </svg>
            <div
                onTransitionEnd={(event) => {
                    if (event.target !== event.currentTarget) return
                    controller.setIsTransition(false)
                }}
                style={{
                    position: 'absolute',
                    width: '100%',
                    aspectRatio: 1,
                    left: '50%',
                    top: '50%',
                    pointerEvents: 'none',
                    zIndex: 1,
                    transition: `${controller.transitionTime}ms`,
                    transform: `translate(-50%, -50%) ${Angle.toCSS(angleCoef * controller.historyIndex + activeAngle, AngleUnits.Rad)}`
                }}>
                {
                    items.map((item, index) => {
                        let angle = angleCoef * index
                        const transform = `
                        translate(-50%, -50%) 
                        ${Angle.toCSS(-angle, AngleUnits.Rad)} 
                        translateX(200px) 
                        ${Angle.toCSS(angle, AngleUnits.Rad)}
                        ${Angle.toCSS(-angleCoef * controller.historyIndex, AngleUnits.Rad)}
                        ${Angle.toCSS(-activeAngle, AngleUnits.Rad)}
                        `
                        const isActive = index === controller.historyIndex
                        return (
                            <div style={{
                                width: 'max-content',
                                height: 'max-content',
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transition: `${controller.transitionTime}ms`,
                                pointerEvents: 'all',
                                transform
                            }}>
                                <Button key={index} size={6}
                                        widerEventsField={10}
                                        className={classNames(
                                            styles.button,
                                            isActive && styles.activeButton,
                                            !isActive && styles.inactiveColor,
                                            (!isActive || controller.isTransition) && styles.inactiveButton,
                                        )}
                                        onClick={() => controller.changeHistoryIndex(index)}>
                                    <span className={classNames(
                                        styles.caption,
                                        isActive && !controller.isTransition && styles.activeCaption,
                                    )}
                                          style={{}}>
                                        {
                                            controller.historyItem.title
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
            <div style={{
                position: 'absolute',
                width: '100%',
                aspectRatio: 1,
                left: '50%',
                top: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                zIndex: 0
            }}>
                <Space style={{
                    fontSize: 200,
                    fontWeight: 700,
                    margin: '50%'
                }}>
                    <CalculatedText style={{color: 'var(--blue)'}} value={controller.historyItem.range[0]}
                                    timer={controller.transitionTime}/>
                    <span style={{whiteSpace: 'pre'}}> </span>
                    <CalculatedText style={{color: 'var(--red)'}} value={controller.historyItem.range[1]}
                                    timer={controller.transitionTime}/>
                </Space>
            </div>

            <ContentRow>
                <Space direction={'column'} gap={56}>
                    <Space direction={'column'} gap={20} style={{marginBottom: 20}}>
                        <span>{padStart(controller.historyIndex + 1)}/{padStart(items.length)}</span>
                        <Space gap={20}>
                            <Button size={50} disabled={!controller.historyIndex} onClick={() => {
                                controller.changeHistoryIndex(Math.max(controller.historyIndex - 1, 0))
                            }}>
                                <Arrow angle={180}/>
                            </Button>
                            <Button size={50} disabled={controller.historyIndex === items.length - 1} onClick={() => {
                                controller.changeHistoryIndex(Math.min(controller.historyIndex + 1, items.length - 1))
                            }}>
                                <Arrow angle={0}/>
                            </Button>
                        </Space>
                    </Space>

                    <DisappearedContent flag={controller.isTransition}
                                        gapTime={500}
                                        style={{
                                            transition: `500ms`,
                                            transitionDelay: '100ms',
                                            opacity: Number(!controller.isTransition),
                                            flexGrow: 1,
                                            position: 'relative',
                                            height: 135,
                                            width: '100%'
                                        }}>
                        {
                            controller.isTransition ? null :
                                <>
                                    {
                                        controller.swiper && !controller.swiper.isBeginning &&
                                        <Button size={50} style={{
                                            position: "absolute",
                                            left: 0,
                                            top: '50%',
                                            transform: 'translate(-100%, -50%)',
                                            zIndex: 2
                                        }}
                                                onClick={() => controller.swiper.slidePrev()}>
                                            <Arrow angle={180}/>
                                        </Button>
                                    }
                                    <Swiper
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            right: 0,
                                        }}
                                        grabCursor={true}
                                        slidesPerView={3}
                                        onSlideChange={controller.forceRerender}
                                        onSwiper={controller.setSwiper}>
                                        {
                                            controller.historyItem.events.map((element, index) => {
                                                return (
                                                    <SwiperSlide key={`${controller.historyIndex} ${index}`}>
                                                        <Slide title={String(element.year)}
                                                               description={element.description}
                                                        />
                                                    </SwiperSlide>
                                                )
                                            })
                                        }
                                    </Swiper>
                                    {
                                        controller.swiper && !controller.swiper.isEnd &&
                                        <Button size={50}
                                                style={{
                                                    position: "absolute",
                                                    transform: 'translate(100%, -50%)',
                                                    top: '50%',
                                                    right: 0,
                                                    zIndex: 2
                                                }}
                                                onClick={() => controller.swiper.slideNext()}>
                                            <Arrow/>
                                        </Button>
                                    }
                                </>
                        }
                    </DisappearedContent>
                </Space>
            </ContentRow>
        </div>
    )
})

type ISlide = {
    title: string,
    description: string,
}
export const Slide: React.FC<ISlide> = React.memo(({
                                                       title,
                                                       description,
                                                   }) => {
    return (
        <div style={{
            fontSize: 20,
            lineHeight: '30px',
            fontWeight: 400,
            minWidth: 320,
            maxWidth: 400,
            height: 135,
            overflow: 'hidden',
        }}>
            <div style={{
                fontFamily: 'var(--history-font-family-secondary)',
                color: 'var(--blue)',
                fontSize: 25
            }}>{title}</div>
            <div>{description}</div>
        </div>
    )
})

type ICalculatedText = {
    value: number,
    timer: number,
} & React.DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
export const CalculatedText: React.FC<ICalculatedText> = React.memo(({
                                                                         value,
                                                                         timer,
                                                                         ...props
                                                                     }) => {

    const [rerender, setRerender] = useState(false)
    const state = useRef({
        currentValue: value,
    })

    useEffect(() => {
        if (value === state.current.currentValue) return

        const dif = value - state.current.currentValue
        const tId = setInterval(() => {
            if (state.current.currentValue === value) {
                clearInterval(tId)
                return
            }
            state.current.currentValue = Math.round(state.current.currentValue + Math.sign(dif))
            setRerender(prev => !prev)
        }, timer / Math.abs(dif)) as unknown as number

        return () => clearInterval(tId)
    }, [value])

    return (
        <span style={{color: 'var(--blue)'}} {...props}>{state.current.currentValue}</span>
    )
})

type IDisappearedContent = {
    flag: any,
    gapTime?: number,
} & React.DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
export const DisappearedContent: React.FC<React.PropsWithChildren<IDisappearedContent>> = React.memo(({
                                                                                                          children,
                                                                                                          flag,
                                                                                                          gapTime = 0,
                                                                                                          ...props
                                                                                                      }) => {


    const [state, setState] = useState({
        children,
        isTransition: false,
    })
    const ref = useRef<number | null>(null)

    useEffect(() => {
        ref.current && clearTimeout(ref.current)
        ref.current = null
        setState(prev => ({...prev, isTransition: false}))


        if (!flag) {
            return setState(prev => ({...prev, children}))
        }

        setState(prev => ({...prev, isTransition: true}))
        ref.current = setTimeout(() => {
            setState({children, isTransition: false})
        }, gapTime) as unknown as number
    }, [flag, children])


    return (
        <div {...props}>
            {
                state.children
            }
        </div>
    )
}, (prev, next) => {
    return prev.flag === next.flag && prev.children === next.children
})