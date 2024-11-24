import React from "react";
import {ViewController} from "./view.controller";
import {observer} from "mobx-react-lite";
import {Arrow, Button} from "./swiper-control/swiper-control";
import classNames from "classnames";
import styles from "./history-overview.module.scss";
import {Swiper, SwiperSlide} from "swiper/react";
import {Slide} from "./slide/slide";
import "swiper/css/bundle";


export const HistorySwiper: React.FC<{ controller: ViewController }> = observer(({
                                                                                     controller,
                                                                                 }) => {

    const {renderFlag} = controller.state

    return (
        controller.isTransition ? null :
            <>
                {
                    controller.swiper && !controller.swiper.isBeginning &&
                    <Button size={50}
                            className={classNames(
                                styles.swiperBtn,
                                styles.left,
                                'zi-2',
                            )}
                            onClick={controller.onSlidePrev}>
                        <Arrow angle={180}/>
                    </Button>
                }
                <Swiper key={controller.historyIndex}
                        className={classNames('position-abs', styles.swiper)}
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
                            className={classNames(
                                styles.swiperBtn,
                                styles.right,
                                'zi-2',
                            )}
                            onClick={controller.onSlideNext}>
                        <Arrow/>
                    </Button>
                }
            </>
    )
})