import React from "react";
import {Space} from "../_shared/_components/space/space";
import {leadZeros} from "../utils";
import {Button} from "../_shared/_components/button/button";
import {Arrow} from "../_shared/_components/arrow/arrow";

type ICarouselControl = {
    current: number,
    total: number,
    onChange: (index: number) => void,
}
export const CarouselControl: React.FC<ICarouselControl> = React.memo(({
                                                                           current,
                                                                           total,
                                                                           onChange,
                                                                       }) => {

    return (
        <Space direction={'column'} gap={20} style={{marginBottom: 20}}>
            <span>{leadZeros(current + 1)}/{leadZeros(total)}</span>
            <Space gap={20}>
                <Button size={50} disabled={current === 0} onClick={() => {
                    onChange(Math.max(current - 1, 0))
                }}>
                    <Arrow angle={180}/>
                </Button>
                <Button size={50} disabled={current + 1 === total} onClick={() => {
                    onChange(Math.min(current + 1, total - 1))
                }}>
                    <Arrow angle={0}/>
                </Button>
            </Space>
        </Space>
    )
})