'use client'
import React, { FC, useState } from "react"
import cls from './Header.module.scss'
import { classNames } from "@/shared/helpers/classNames/classNames"
import { AppText } from "@/shared/ui/AppText"
import App from "next/app"
import { AppButton } from "@/shared/ui/AppButton"
import { AppButtonColor } from "@/shared/ui/AppButton/ui/AppButton"
import { AuthModal } from "@/shared/ui/AuthModal/ui/AuthModal"
import { useAppStore } from "@/app/providers/Store/store"
import { AppTextColor } from "@/shared/ui/AppText/ui/AppText.helper"

export const Header: FC = () => {

    const [isShowModal, setIsShowModal] = useState(false)
    const { isLogin, userBalance } = useAppStore()

    const showAuthModal = () => {
        setIsShowModal(true)
    }

    const onRegister = () => {
        console.log('Registration')
    }
    return (
        <header className={classNames(cls.header, {}, [])}>
            <AppText text={'Test Game'} />
            <div className={cls.headerButtons}>
                {
                    isLogin ? (<AppText text={`${userBalance} (TND)`} color={AppTextColor.WHITE}/>)  : (
                        <>
                        <AppButton text="Вход" color={AppButtonColor.PURPLE} onClick={showAuthModal}/>
                        <AppButton text="Регистрация" color={AppButtonColor.PURPLE} onClick={onRegister} />
                        </>
                    )
                }
               
            </div>
            <AuthModal isShowModal={isShowModal} onCloseModal={() => setIsShowModal(false)} />
        </header>
    )
}