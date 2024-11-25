import React, {HTMLAttributes} from "react";

type ISpace = {
    gap?: number | string,
    direction?: 'column' | 'row'
} & HTMLAttributes<HTMLDivElement>
export const Space: React.FC<React.PropsWithChildren<ISpace>> = React.memo(({
                                                                                children,
                                                                                gap = 0,
                                                                                direction = 'row',
                                                                                style = {},
                                                                                ...props
                                                                            }) => {

    style = {
        ...{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap,
            width: '100%',
            flexDirection: direction
        },
        ...style
    }

    return (
        <div style={style} {...props}>
            {
                children
            }
        </div>
    )
})