import React, { FC, useEffect, useState } from "react";
import cls from './Cubic.module.scss'
import { classNames } from "@/shared/helpers/classNames/classNames";
import { ICubicValue, CubicOption } from "@/widgets/Playground/ui/Playground";

export interface CubicProps {
    className?: string
    transformStyle?: string;
    cubicValues: ICubicValue[]
}


export const Cubic: FC<CubicProps> = (props: CubicProps) => {
    const {cubicValues, className = '', transformStyle } = props

    return (
        <div className={classNames(cls.cubicContainer, {}, [className])}>
            <div style={{transform: transformStyle}} className={cls.cubicWrapper}>
                {
                    cubicValues.map((cubic, cubicIndex) => (
                        <div key={cubicIndex} className={classNames(cls.cubic, { [cls[cubic.text]]: true, [cls[cubic.side]]: true})}>
                            {
                                Array.from({length: cubic.value }, (v, i) => i + 1).map((dot, dotIndex) => (
                                    
                                    <div key={dotIndex} className={classNames(cls.dot)}></div>
                                )) 
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}