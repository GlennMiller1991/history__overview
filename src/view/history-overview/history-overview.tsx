import React from "react";
import styles from './history-overview.module.scss'
import {SidePaddingWrapper} from "./side-padding-wrapper/side-padding-wrapper";
import {HeightPaddingWrapper} from "./height-padding-wrapper/height-padding-wrapper";
import {Header} from "./header/header";
import {ContentRow} from "./content-row/content-row";

import {SwiperControl} from "./swiper/swiper-control/swiper-control";

export const HistoryOverview: React.FC = React.memo(() => {
    return (
        <div className={styles.container}>
            <SidePaddingWrapper>
                <HeightPaddingWrapper>
                    <ContentRow mark>
                        <Header/>
                    </ContentRow>

                    <ContentRow>
                        <SwiperControl/>
                    </ContentRow>

                    <ContentRow>
                        <Swiper/>
                    </ContentRow>
                </HeightPaddingWrapper>
            </SidePaddingWrapper>
        </div>
    )
})


export const Swiper: React.FC = React.memo(() => {
    return (
        <div>
            Content
        </div>
    )
})

