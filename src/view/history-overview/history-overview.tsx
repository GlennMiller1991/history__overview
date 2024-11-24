import React, {useState} from "react";
import '../_shared/styles/global.module.scss'

import styles from './history-overview.module.scss'
import {Header} from "./header/header";
import {ContentRow} from "./content-row/content-row";

import {Arrow, Button, Space} from "./swiper/swiper-control/swiper-control";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css/bundle";
import classNames from "classnames";
import {observer} from "mobx-react-lite";
import {IHistoryOverview} from "./contracts";
import {ViewController} from "./view.controller";
import {DisappearedContent} from "./_shared/components/disappeared-content";
import {CalculatedText} from "./calculated-text";
import {Slide} from "./slide";
import {HistoryItemControl} from "./history-item-control";
import {Carousel} from "./carousel";


export const HistoryOverview: React.FC<IHistoryOverview> = observer(({
                                                                         title,
                                                                         items,
                                                                     }) => {

    const [controller] = useState(() => new ViewController(items))
    const {isInited, swiper, historyIndex} = controller.state;


    return (
        <div className={classNames('tr500', styles.container)}
             style={{opacity: Number(isInited)}}
        >
            <ContentRow mark>
                <Header>
                    {
                        title
                    }
                </Header>
            </ContentRow>

            <Carousel controller={controller}/>


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
                    <HistoryItemControl current={historyIndex} total={items.length}
                                        onChange={controller.changeHistoryIndex}
                    />
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
                                        swiper && !swiper.isBeginning &&
                                        <Button size={50} style={{
                                            position: "absolute",
                                            left: 0,
                                            top: '50%',
                                            transform: 'translate(-100%, -50%)',
                                            zIndex: 2
                                        }}
                                                onClick={() => swiper.slidePrev()}>
                                            <Arrow angle={180}/>
                                        </Button>
                                    }
                                    <Swiper key={controller.historyIndex}
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
                                        swiper && !swiper.isEnd &&
                                        <Button size={50}
                                                style={{
                                                    position: "absolute",
                                                    transform: 'translate(100%, -50%)',
                                                    top: '50%',
                                                    right: 0,
                                                    zIndex: 2
                                                }}
                                                onClick={() => swiper.slideNext()}>
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

