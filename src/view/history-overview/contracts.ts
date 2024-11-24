import React from "react";

export type IRange = [number, number]
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
export type IHistoryOverview = {
    title: React.JSX.Element | string,
    items: Array<IHistoryItem>
}