import React, { ButtonHTMLAttributes, type FC } from "react";
import { AppTextColor, AppTextSize, AppTextWeight } from "@/shared/ui/AppText/ui/AppText.helper";
import cls from './AppButton.module.scss'
import { AppText } from "@/shared/ui/AppText";
import { classNames } from "@/shared/helpers/classNames/classNames";

export enum AppButtonCustomType {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    DISABLED = 'disabled'
}

export enum AppButtonColor {
    GREEN = 'green',
    ORANGE = 'orange',
    PURPLE = 'purple',
    DISABLED = 'disabled'
}

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    customType?: AppButtonCustomType;
    text: string;
    color?: AppButtonColor,
    textColor?: AppTextColor,
    textWeight?: AppTextWeight;
    textSize?: AppTextSize;
    textHeight?: number;
    disabled?: boolean;
}


export const AppButton: FC<AppButtonProps> = (props: AppButtonProps) => {

    const {
        className = '',
        disabled = false,
        customType = AppButtonCustomType.PRIMARY,
        text = '',
        color = AppButtonColor.GREEN,
        textColor = AppTextColor.WHITE,
        children,
        textWeight = AppTextWeight.REGULAR,
        textSize = AppTextSize.MEDIUM,
        textHeight = 24,
        ...otherProps
    } = props;

    const buttonClasses = () => {
        return {
            [cls[customType]]: true,
            [cls[color]]: true
        };
    };

    return (
        <button
                type="button"
                className={classNames(cls.appButton, buttonClasses(), [disabled ? cls.disabled : '', className])}
                disabled={disabled}
                {...otherProps}
            >
                {text && <AppText className={cls.text} text={text} weight={textWeight} size={textSize} height={textHeight} color={textColor} />}
                {children}
            </button>
    )
}