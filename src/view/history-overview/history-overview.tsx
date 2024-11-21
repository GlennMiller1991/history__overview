import React, {useRef, useState} from "react";
import styles from './history-overview.module.scss'
import {SidePaddingWrapper} from "./side-padding-wrapper/side-padding-wrapper";
import {HeightPaddingWrapper} from "./height-padding-wrapper/height-padding-wrapper";
import {Header} from "./header/header";
import {ContentRow} from "./content-row/content-row";

import {Arrow, Button, Space, SwiperControl} from "./swiper/swiper-control/swiper-control";
import {Swiper, SwiperSlide} from "swiper/react";
import {Swiper as Slider} from 'swiper';
import "swiper/css/bundle";

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
export const HistoryOverview: React.FC<IHistoryOverview> = React.memo(({
                                                                           title,
                                                                           items,
                                                                       }) => {
    const [currentItemIndex, setCurrentItemIndex] = useState(0)
    const [sliderRerender, setSliderRerender] = useState(true)
    const currentItem = items[currentItemIndex]
    const [swiper, setSwiper] = useState<Slider>(null)

    function padStart(value: number) {
        return String(value).padStart(2, '0')
    }

    return (
        <div className={styles.container} style={{opacity: Number(Boolean(swiper))}}>
            <ContentRow mark>
                <Header>
                    {
                        title
                    }
                </Header>
            </ContentRow>


            <svg style={{position: 'absolute', width: '100%', aspectRatio: 1, left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}} viewBox={'0 0 1 1'}>
                <line x1={0} y1={0.5} x2={1} y2={0.5} stroke={'var(--dark-primary)'} strokeWidth={1} vectorEffect={'non-scaling-stroke'}/>
                <line x1={0.5} y1={0} x2={0.5} y2={1} stroke={'var(--dark-primary)'} strokeWidth={1} vectorEffect={'non-scaling-stroke'}/>
                <circle r={1 / 6} cx={0.5} cy={0.5} stroke={'var(--dark-primary)'} strokeWidth={1} vectorEffect={'non-scaling-stroke'} fill={'none'}/>
            </svg>


            {/*<Space gap={80} style={{*/}
            {/*    marginTop: 96,*/}
            {/*    marginBottom: 137,*/}
            {/*    width: '100%',*/}
            {/*    fontSize: 200,*/}
            {/*    fontWeight: 700*/}
            {/*}}>*/}
            {/*    <span style={{color: 'var(--blue)'}}>*/}
            {/*        {*/}
            {/*            currentItem.range[0]*/}
            {/*        }*/}
            {/*    </span>*/}

            {/*    <span style={{color: 'red'}}>*/}
            {/*        {*/}
            {/*            currentItem.range[1]*/}
            {/*        }*/}
            {/*    </span>*/}
            {/*</Space>*/}
            <ContentRow>
                <span>{padStart(currentItemIndex + 1)}/{padStart(items.length + 1)}</span>
                <SwiperControl/>

                <div style={{flexGrow: 1, position: 'relative', overflow: 'hidden', height: 135}}>
                    {
                        !swiper?.isBeginning &&
                        <Button size={50} style={{position: "absolute", left: '10px', zIndex: 2}}
                                onClick={() => swiper.slidePrev()}>
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
                        onSlideChange={() => setSliderRerender(!sliderRerender)}
                        onSwiper={setSwiper}>
                        {
                            currentItem.events.map((element, index) => {
                                return (
                                    <SwiperSlide key={`${currentItemIndex} ${index}`}>
                                        <Slide title={String(element.year)}
                                               description={element.description}
                                        />
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                    {
                        !swiper?.isEnd &&
                        <Button size={50} style={{position: "absolute", right: '10px', zIndex: 2}}
                                onClick={() => swiper.slideNext()}>
                            <Arrow/>
                        </Button>
                    }
                </div>
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