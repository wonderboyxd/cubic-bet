'use client'
import React, { FC, useEffect, useState } from "react";
import { classNames } from "@/shared/helpers/classNames/classNames";
import cls from './Playground.module.scss'
import { AppText } from "@/shared/ui/AppText";
import { AppTextColor, AppTextWeight } from "@/shared/ui/AppText/ui/AppText.helper";
import { Cubic } from "@/shared/ui/Cubic";
import { AppSelect } from "@/shared/ui/AppSelect";
import { IOptionsItem } from '@/shared/ui/AppSelect'
import { Keyboard } from "@/widgets/Keyboard";
import { AppButton } from "@/shared/ui/AppButton";
import { AppButtonColor } from "@/shared/ui/AppButton/ui/AppButton";
import { useAppStore } from "@/app/providers/Store/store";

export interface ICubicValue {
    text: string,
    value: number,
    side: string,
    transform: string
}
export enum CubicOption {
    ONE = 'one',
    TWO = 'two',
    THREE = 'three',
    FOUR = 'four',
    FIVE = 'five',
    SIX = 'six',
}

export const Playground: FC = () => {

    const betsSelectList: IOptionsItem[] = [
        {title: '1', value: '1'},
        {title: '5', value: '5'},
        {title: '10', value: '10'},
        {title: '15', value: '15'},
        {title: '20', value: '20'}
    ]
    const cubicValues: ICubicValue[] = [
        { text: CubicOption.ONE, value: 1, side: 'front', transform: 'rotateX(0deg) rotateY(0deg)' },
        { text: CubicOption.TWO, value: 2, side: 'back', transform: 'rotateX(0deg) rotateY(180deg)' },
        { text: CubicOption.THREE, value: 3, side: 'right', transform: 'rotateX(0deg) rotateY(90deg)' },
        { text: CubicOption.FOUR, value: 4, side: 'left', transform: 'rotateX(0deg) rotateY(-90deg)' },
        { text: CubicOption.FIVE, value: 5, side: 'top', transform: 'rotateX(90deg) rotateY(0deg)' },
        { text: CubicOption.SIX, value: 6, side: 'bottom', transform: 'rotateX(-90deg) rotateY(0deg)' },
    ]

    const [cubicValue, setCubicValue] = useState<ICubicValue>(cubicValues[0])
    const [userCubicValue, setUserCubicValue] = useState<number | null>(null)
    const [keyboardButtonPressed, setKeyboardButtonPressed] = useState<string>()
    const [transformCubic, setTransformCubic] = useState<string>('')
    const [betSize, setBetSize] = useState<number>(+betsSelectList[0].value)
    const [notificationTitle, setNotificationTitle] = useState<string>('Сделайте ставку')
    const [notificationSubtitle, setNotificationSubtitle] = useState<string>('')
    const {userBalance, setUserBalance, isLogin} = useAppStore()
    

    const onSelectBetSize = (bet: IOptionsItem) => {
        setBetSize(+bet.value)
    }
  
    const checkWIN = () => {
        switch (true) {
            case keyboardButtonPressed === 'EVEN':
                if (cubicValue.value % 2 === 0) {
                    setUserBalance(userBalance + (betSize * 2)) 
                    setNotificationSubtitle(`Вы выиграли ${betSize} TND!`)
                } else {
                    setUserBalance(userBalance - betSize)
                    setNotificationSubtitle('Повезет в следующий раз!')
                }
                break;
            case keyboardButtonPressed === 'UNEVEN':
                if (cubicValue.value % 2 !== 0) {
                    setUserBalance(userBalance + (betSize * 2))
                    setNotificationSubtitle(`Вы выиграли ${betSize} TND!`)
                } else {
                    setUserBalance(userBalance - betSize)
                    setNotificationSubtitle('Повезет в следующий раз!')
                }
                break;
            case keyboardButtonPressed === 'FROM_ONE_TO_THREE':
                if (cubicValue.value >= 1 && cubicValue.value <= 3) {
                    setUserBalance(userBalance + (betSize * 2))
                    setNotificationSubtitle(`Вы выиграли ${betSize} TND!`)
                } else {
                    setUserBalance(userBalance - betSize)
                    setNotificationSubtitle('Повезет в следующий раз!')
                }
                break;
            case keyboardButtonPressed === 'FROM_FOUR_TO_SIX':
                if (cubicValue.value >= 4 && cubicValue.value <= 6) {
                    setUserBalance(userBalance + (betSize * 2))
                    setNotificationSubtitle(`Вы выиграли ${betSize} TND!`)
                } else {
                    setUserBalance(userBalance - betSize)
                    setNotificationSubtitle('Повезет в следующий раз!')
                }
                break;
            case keyboardButtonPressed === 'SPECIFIC_NUMBER': 
                if (cubicValue.value === userCubicValue) {
                        setUserBalance(userBalance + (betSize * 2))
                        setNotificationSubtitle(`Вы выиграли ${betSize} TND!`)
                } else {
                        setUserBalance(userBalance - betSize)
                        setNotificationSubtitle('Повезет в следующий раз!')
                }
                break;
            default:
                return;
        }
        setNotificationTitle(`Результат броска: ${cubicValue.value}`)

    }

    
    const onPlaceABet = () => {
        if (keyboardButtonPressed && (userBalance - betSize) >= 0) {
            const cubicValue = cubicValues[Math.floor(Math.random() * (7 - 1) + 1) - 1]
            setCubicValue(cubicValue)
            setTransformCubic(cubicValue.transform)
        }
    }

    useEffect(() => {
        if (keyboardButtonPressed) {
            checkWIN()
        }
    }, [cubicValue])

    useEffect(() => {
        if (!isLogin) {
            setNotificationTitle("Войдите, чтобы продолжить")
        } else {
            setNotificationTitle('Сделайте ставку')
        }
        
    }, [isLogin])

    const onSelectBetOption = (buttonValue: string, userSelectedNumber?: number) => {
        setKeyboardButtonPressed(buttonValue)
        if (userSelectedNumber) {
            setUserCubicValue(userSelectedNumber)
        }
    }


    return (
        <div className={classNames(cls.playground, { [cls.disable]: !isLogin}, [])}>
            <header className={cls.playgroundHeader}>
            <AppText className={cls.playgroundTitle} text={notificationTitle} weight={AppTextWeight.BOLD} />
            {notificationSubtitle && <AppText className={cls.playgroundTitle} text={notificationSubtitle} size={16} weight={AppTextWeight.REGULAR} />}
            </header>
            <Cubic cubicValues={cubicValues} transformStyle={transformCubic} className={classNames(cls.cubic, { [cls.transparency]: !isLogin }, [])}/>
            <div className={classNames(cls.playgroundActivities, { [cls.transparency]: !isLogin }, [])}>
                <AppSelect options={betsSelectList} defaultValue={betsSelectList[0]} label="Размер ставки" onSelect={(value) => onSelectBetSize(value)}/>
                <Keyboard onSelect={(buttonValue, userSelectedNumber) => onSelectBetOption(buttonValue, userSelectedNumber)} />
            </div>
            <AppButton className={classNames(cls.placeBetButton, { [cls.transparency]: !isLogin }, [])} text="Сделать ставку" color={AppButtonColor.GREEN} textColor={AppTextColor.WHITE} onClick={() => onPlaceABet()} />
        </div>
    )
}