import React, {HTMLAttributes, useEffect, useRef, useState} from "react";

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