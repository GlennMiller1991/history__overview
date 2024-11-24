import React, {useEffect, useState} from "react";
import '../_shared/styles/global.module.scss'
import styles from './history-overview.module.scss'

import {Header} from "./header/header";
import {ContentRow} from "./content-row/content-row";
import "swiper/css/bundle";
import classNames from "classnames";
import {observer} from "mobx-react-lite";
import {IHistoryOverview} from "./contracts";
import {ViewController} from "./view.controller";
import {DisappearedContent} from "./disappeared-content";
import {HistoryItemControl} from "./history-item-control";
import {Carousel} from "./carousel";
import {HistoryItemCalculatedText} from "./history-item-calculated-text";
import {HistorySwiper} from "./history-swiper";
import {Space} from "./swiper-control/swiper-control";


export const HistoryOverview: React.FC<IHistoryOverview> = observer(({
                                                                         title,
                                                                         items,
                                                                     }) => {

    const [controller] = useState(() => new ViewController(items))
    const {isInited, historyIndex, } = controller.state;


    useEffect(() => controller.dispose, [controller])

    return (
        <div ref={controller.init}
             id={controller.containerId}
             className={styles.container}
             style={{maxWidth: controller.fullWidth}}>
            <div
                className={classNames(styles.content, 'position-abs')}
                style={{opacity: Number(isInited)}}>
                <ContentRow mark>
                    <Header>
                        {
                            title
                        }
                    </Header>
                </ContentRow>

                <Carousel controller={controller}/>


                <div className={classNames(
                    'sizes-parent',
                    'halfParent',
                    'zi-0',
                    'skipEvents',
                    'transform-50-percent',
                    'ar-1',
                    'font-weight-700',
                    'flex-center',
                    'fs-200',
                )}>
                    <HistoryItemCalculatedText controller={controller}/>
                </div>

                <ContentRow>
                    <Space direction={'column'} gap={56}>
                        <HistoryItemControl current={historyIndex} total={items.length}
                                            onChange={controller.changeHistoryIndex}
                        />
                        <DisappearedContent flag={controller.isTransition}
                                            gapTime={500}
                                            className={classNames(
                                                'tr500',
                                                'flex-grow-max',
                                                'position-rel',
                                                styles.disappearedContent
                                            )}
                                            style={{opacity: Number(!controller.isTransition)}}>
                            <HistorySwiper controller={controller}/>
                        </DisappearedContent>
                    </Space>
                </ContentRow>
            </div>
        </div>
    )
})

