import React, {ButtonHTMLAttributes} from "react";
import classNames from "classnames";
import styles from "./button.module.scss";

type IButton = {
    size: number | string,
    widerEventsField?: number | string,
} & React.DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
export const Button: React.FC<React.PropsWithChildren<IButton>> = React.memo(({
                                                                                  children,
                                                                                  size,
                                                                                  widerEventsField,
                                                                                  style = {},
                                                                                  className,
                                                                                  ...props
                                                                              }) => {
    return (
        <button style={{
            width: size,
            height: size,
            ...style
        }}
                className={classNames(styles.button, className)}

                {...props}>
            <div>
                {
                    children
                }
            </div>

            {
                widerEventsField &&
                <div
                    style={{
                        inset: typeof widerEventsField === 'number' ? widerEventsField * -1 :
                            widerEventsField.startsWith('-') ? widerEventsField.slice(1) : ('-' + String(widerEventsField))
                    }}
                    className={styles.eventsField}>

                </div>
            }
        </button>
    )
})