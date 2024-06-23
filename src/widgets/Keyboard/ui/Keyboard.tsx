'use state'
import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import cls from './Keyboard.module.scss'
import { classNames } from "@/shared/helpers/classNames/classNames";
import { AppText } from "@/shared/ui/AppText";
import { AppTextColor, AppTextWeight } from "@/shared/ui/AppText/ui/AppText.helper";
import { AppButton } from "@/shared/ui/AppButton";
import { AppButtonColor } from "@/shared/ui/AppButton/ui/AppButton";

export interface IButton {
    title: string,
    value: string
}

export interface IButtons {
    [key: string]: IButton
}

export interface KeyboardProps {
    onSelect: (buttonValue: string, specificNumber?: number) => void
}

export const Keyboard: FC<KeyboardProps> = (props: KeyboardProps) => {

    const { onSelect } = props

    const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(null)

    const buttons: IButtons = {
        even: {
            title: 'Четное',
            value: 'EVEN'
        },
        uneven: {
            title: 'Нечетное',
            value: 'UNEVEN'
        },
        fromOneToThree: {
            title: 'От 1 до 3',
            value: 'FROM_ONE_TO_THREE'
        },
        fromFourToSix: {
            title: 'От 4 до 6',
            value: 'FROM_FOUR_TO_SIX'
        },
        specificNumber: {
            title: 'Конкретное число',
            value: 'SPECIFIC_NUMBER'
        }
    }



    const handleClick = (button: IButton, index: number) => {
        onSelect(button.value)
        if (index !== activeButtonIndex) {
            setActiveButtonIndex(index)
        } else {
            setActiveButtonIndex(null)
        }
    }

    return (
        <div className={classNames(cls.keyboard)}>
            <AppText className={cls.keyboardTitle} text={'Варианты ставок'} size={14} weight={AppTextWeight.REGULAR} />
            <div className={cls.keyboardButtons}>
                {
                    Object.keys(buttons).map((item, index) => (
                        <AppButton
                            key={index} 
                            text={buttons[item].title}
                            textColor={AppTextColor.WHITE} 
                            color={activeButtonIndex === index ? AppButtonColor.ORANGE : AppButtonColor.PURPLE} 
                            onClick={() => handleClick(buttons[item], index)}
                        />
                    ))
                }
            </div>
        </div>
    )
}