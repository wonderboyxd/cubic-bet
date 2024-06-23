'use client'
import React, { FC, useEffect, useState } from "react";
import cls from './Cubic.module.scss'
import { classNames } from "@/shared/helpers/classNames/classNames";
import { ICubicValue } from "@/widgets/Playground/ui/Playground";



export interface CubicProps {
    cubicValue: ICubicValue
}

export const Cubic: FC<CubicProps> = (props: CubicProps) => {
    const { cubicValue } = props

   

    return (
        <div className={classNames(cls.cubicContainer)}>
            <div className={classNames(cls.cubic, { [cls[cubicValue.text]]: true})}>
                {
                    Array.from({ length: cubicValue.value }, (v, i) => i + 1 ).map((item, index) => (
                        <div key={index} className={classNames(cls.dot)}></div>
                    ))
                }
                
            </div>
        </div>
    )
}