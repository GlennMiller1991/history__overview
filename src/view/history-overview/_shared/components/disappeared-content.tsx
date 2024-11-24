import React, {HTMLAttributes, useEffect, useRef, useState} from "react";

type IDisappearedContent = {
    flag: any,
    gapTime?: number,
} & React.DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
export const DisappearedContent: React.FC<React.PropsWithChildren<IDisappearedContent>> = React.memo(({
                                                                                                          children,
                                                                                                          flag,
                                                                                                          gapTime = 0,
                                                                                                          ...props
                                                                                                      }) => {


    const [state, setState] = useState({
        children,
        isTransition: false,
    })
    const ref = useRef<number | null>(null)

    useEffect(() => {
        ref.current && clearTimeout(ref.current)
        ref.current = null
        setState(prev => ({...prev, isTransition: false}))


        if (!flag) {
            return setState(prev => ({...prev, children}))
        }

        setState(prev => ({...prev, isTransition: true}))
        ref.current = setTimeout(() => {
            setState({children, isTransition: false})
        }, gapTime) as unknown as number
    }, [flag, children])


    return (
        <div {...props}>
            {
                state.children
            }
        </div>
    )
}, (prev, next) => {
    return prev.flag === next.flag && prev.children === next.children
})