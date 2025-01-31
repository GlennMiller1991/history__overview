import React from "react";
import {ViewController} from "../view.controller";
import {observer} from "mobx-react-lite";
import {CalculatedText} from "./calculated-text";
import {Space} from "../_shared/_components/space/space";

export const HistoryItemCalculatedText: React.FC<{ controller: ViewController }> = observer(({
                                                                                                 controller,
                                                                                             }) => {
    return (
        <Space className={'sizes-content'}>
            <CalculatedText style={{color: 'var(--ho__blue)'}}
                            value={controller.historyItem.range[0]}
                            timer={controller.transitionTime}/>
            <span style={{whiteSpace: 'pre'}}> </span>
            <CalculatedText style={{color: 'var(--ho__red)'}}
                            value={controller.historyItem.range[1]}
                            timer={controller.transitionTime}/>
        </Space>
    )
})