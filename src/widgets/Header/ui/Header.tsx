'use client'
import React, { FC } from "react"
import cls from './Header.module.scss'
import { classNames } from "@/shared/helpers/classNames/classNames"
import { AppText } from "@/shared/ui/AppText"
import App from "next/app"
import { AppButton } from "@/shared/ui/AppButton"
import { AppButtonColor } from "@/shared/ui/AppButton/ui/AppButton"



export const Header: FC = () => {
    const onLogin = () => {
        console.log('Login')
    }
    const onRegister = () => {
        console.log('Registration')
    }
    return (
        <header className={classNames(cls.header, {}, [])}>
            <AppText text={'Test Game'} />
            <div className={cls.headerButtons}>
                <AppButton text="Вход" color={AppButtonColor.PURPLE} onClick={onLogin}/>
                <AppButton text="Регистрация" color={AppButtonColor.PURPLE} onClick={onRegister} />
            </div>
        </header>
    )
}