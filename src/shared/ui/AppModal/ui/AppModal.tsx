import React, { FC, ReactNode, useEffect, useState } from "react";
import cls from './AppModal.module.scss'
import { classNames } from "@/shared/helpers/classNames/classNames";
import { Icon } from "../../AppIcon";
import CloseIcon from '@/shared/assets/icons/close.svg'

interface AppModalProps {
    isOpen: boolean;
    onClose?: () => void;
    className?: string
    children?: ReactNode;
}

export const AppModal: FC<AppModalProps> = (props: AppModalProps) => {
    
    const { isOpen, onClose, className = '', children } = props

    useEffect(() => {
      if (isOpen) {
        document.body.classList.add('lock');
      } else {
        document.body.classList.remove('lock');
      }
    }, [isOpen]);

    const closeHandler = () => {
        if (onClose) {
          onClose();
        }
      };

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };


    return (
        <div className={classNames(cls.modal, { [cls.opened]: isOpen }, [className])}>
            <div className={cls.overlay} onMouseDown={closeHandler}>
                <div className={cls.content} onMouseDown={onContentClick}>
                  <Icon
                      Svg={CloseIcon}
                      className={cls.closeIcon}
                      onClick={closeHandler}
                  />
                  {children}
                </div>
            </div>
        </div>
        
    )
}