import React from 'react';
import {HistoryOverview} from "./history-overview/history-overview";
import {IHistoryItem} from "./history-overview/contracts";

const template = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
const historyItems: IHistoryItem[] = new Array(5).fill(undefined).map((entry, index) => {
    let start = 1985 + index * 5
    let end = start + 5
    const events: IHistoryItem['events'] = new Array(end - start).fill(undefined).map((entry, index) => {
        return {
            year: start + index,
            title: 'Event ' + String(index + 1),
            description: template
        }
    })
    return {
        title: `Random ${index + 1}`,
        range: [start, start + 5],
        events
    }
})

function App() {
    return (
        <HistoryOverview title={<>Исторические<br/>даты</>}
                         items={historyItems}
        />
    );
}

export default App;
