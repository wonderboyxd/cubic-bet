'use client'
import React, { FC, useState } from "react";
import cls from './AuthModal.module.scss'
import { classNames } from "@/shared/helpers/classNames/classNames";
import { AppModal } from "../../AppModal";
import { AppInput } from "../../AppInput";
import { AppButton } from "../../AppButton";
import { AppButtonColor } from "../../AppButton/ui/AppButton";
import { login } from "@/features/auth/api/requests";
import { useAppStore } from "@/app/providers/Store/store";
import Cookies from "js-cookie";
export interface AuthModalProps {
    isShowModal: boolean;
    className?: string;
    onCloseModal: () => void
}
export interface AuthForm {
    login: string,
    password: string
}

export const AuthModal: FC<AuthModalProps> = (props: AuthModalProps) => {

    const { isShowModal, className = '', onCloseModal } = props

    const [loginValue, setLoginValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [inputsErrors, setInputsErrors] = useState({loginError: '', passwordError: ''})
    const {userBalance, setUserBalance, setIsLogin} = useAppStore()

    const nonEmptyStringRegex = /^(?!\s*$).+/;

    const handleLoginInputChange = (login: string) => {
        if (nonEmptyStringRegex.test(login)) {
            setLoginValue(login)
            setInputsErrors({loginError: '' , passwordError: inputsErrors.passwordError ?? ''})
        } else {
            setLoginValue('')
            setInputsErrors({loginError: 'Login is required.', passwordError: inputsErrors.passwordError ?? ''})
        }
        
    }

    const handlePasswordInputValue = (password: string) => {
        if (nonEmptyStringRegex.test(password)) {
            setPasswordValue(password)
            setInputsErrors({loginError: inputsErrors.loginError ?? '', passwordError: ''})
        } else {
            setPasswordValue('')
            setInputsErrors({loginError: inputsErrors.loginError ?? '', passwordError: 'Password is required.'})
        }
    }

    const handleLogin = async () => {
        login({login: loginValue, password: passwordValue})
        .then((res) => {
            setIsLogin(true)
            setUserBalance(res.data.balance + 100)
            onCloseModal?.()
        })
        .catch((error) => {
            console.log(error);
        })
    }


    return (
        <AppModal isOpen={isShowModal} onClose={onCloseModal}>
            <form  className={cls.authModalForm} onSubmit={handleLogin} >
                <AppInput placeholder={'Login'} type={'text'} value={loginValue} error={inputsErrors.loginError} onChange={handleLoginInputChange} />
                <AppInput placeholder={'Password'} type={'password'} value={passwordValue} error={inputsErrors.passwordError} onChange={handlePasswordInputValue}/>
                <AppButton className={cls.authModalButton} text="Войти" color={AppButtonColor.PURPLE} onClick={handleLogin} />
            </form>
        </AppModal>
    )
}