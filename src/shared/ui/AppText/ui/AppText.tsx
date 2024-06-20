import React, { type FC, type ButtonHTMLAttributes } from 'react'
import cls from './AppText.module.scss'
import { classNames } from '@/shared/helpers/classNames/classNames';
import { AlignTextEnum, AppTextColor, AppTextSize, AppTextTag, AppTextWeight } from './AppText.helper';



interface AppTextProps extends ButtonHTMLAttributes<HTMLParagraphElement> {
    className?: string
    text: string;
    size?: AppTextSize;
    weight?: AppTextWeight;
    height?: number;
    tag?: AppTextTag;
    color?: AppTextColor;
}

export const AppText: FC<AppTextProps> = (props: AppTextProps) => {

  const { 
    className = '',
    text, 
    size = AppTextSize.MEDIUM, 
    weight = AppTextWeight.REGULAR, 
    tag = AppTextTag.P,
    height = 24,
    color = AppTextColor.WHITE,
  } = props

  const CustomTag: AppTextTag = tag

  const AppTextStyle = () => {
    return {
        fontSize: `${size}px`,
        lineHeight: `${height}px`,
        fontWeight: weight,
    };
};

  return (
    <CustomTag 
      style={AppTextStyle()}
      className={classNames(cls.appText, {}, [cls[color], className])}
    >
      {text}
    </CustomTag>
  )
}

