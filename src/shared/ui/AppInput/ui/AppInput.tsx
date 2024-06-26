'use client'
import React, { FC, InputHTMLAttributes, useEffect, useRef, useState } from "react";
import cls from './AppInput.module.scss'
import { classNames } from "@/shared/helpers/classNames/classNames";
import { AppText } from "../../AppText";
import { AppTextColor, AppTextWeight } from "../../AppText/ui/AppText.helper";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

export interface AppInputProps extends HTMLInputProps {
    className?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    error?: string;
    onFocus?: () => void;
    onBlur?: () => void;
}

export const AppInput: FC<AppInputProps> = (props: AppInputProps) => {

    const {
        className = '',
        placeholder = '',
        value,
        type = 'text',
        autoFocus,
        error = '',
        onChange,
        onBlur,
        onFocus,
        ...otherProps
      } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (autoFocus) {
          setIsFocused(true);
          inputRef.current?.focus();
        }
    
      }, [autoFocus, isFocused]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value.trim());
    };

    const onBlurHandler = () => {
        setIsFocused(false);
        onBlur?.();
    };
    
    const onFocusHandler = () => {
        setIsFocused(true);
        onFocus?.();
    };

    return (
      <div className={cls.appInput}>
        <input
            ref={inputRef}
            className={cls.input}
            type={type}
            value={value}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            onFocus={onFocusHandler}
            onWheel={(e) => {
              if (e.target instanceof HTMLInputElement) e.target.blur();
            }}
            {...otherProps}
            {...(placeholder ? { placeholder: placeholder } : {})}
          />
          {error && <AppText className={cls.appInputErrorText} text={error} size={14} weight={AppTextWeight.REGULAR} color={AppTextColor.RED} />}
        </div>
    )
}