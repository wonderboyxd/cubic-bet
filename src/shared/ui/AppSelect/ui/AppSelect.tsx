'use client'
import { classNames } from '@/shared/helpers/classNames/classNames';
import cls from './AppSelect.module.scss';
import React, { type FC, ReactNode, useState } from 'react';
import { useOutsideClick } from '@/shared/hooks/useOutsideClick';
import { AppText } from '../../AppText';
import { AppTextColor } from '../../AppText/ui/AppText.helper';
import ChevronDown from '@/shared/assets/icons/chevron-down.svg'
import { Icon } from '../../AppIcon';


export enum AppSelectVerticalPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
}

export enum AppSelectHorizontalPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

export interface IOptionsItem {
    title: string;
    value: string;
}

interface AppSelectProps {
  className?: string;
  dropdownClassName?: string;
  options: IOptionsItem[];
  defaultValue: IOptionsItem;
  label: string;
  onToggle?: (state: boolean) => void;
  onSelect: (value: IOptionsItem) => void
}

export const AppSelect: FC<AppSelectProps> = (props: AppSelectProps) => {
  const {
    className = '',
    dropdownClassName = '',
    options,
    label,
    defaultValue,
    onToggle,
    onSelect
  } = props;

  const ref = useOutsideClick(() => {
    if (isOpen) {
      setIsOpen(false);
      onToggle?.(isOpen);
    }
  });
  const [activeValue, setActiveValue] = useState(defaultValue)

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    onToggle?.(isOpen);
  };


  const onSelectItem = (value: IOptionsItem) => {
    setActiveValue(value)
    onSelect(value)
  }



  return (
    <div ref={ref} className={classNames(cls.appSelect, {}, [className])}>
        <AppText className={cls.appSelectLabel} text={label} size={14}/>
      <div className={classNames(cls.activator, {[cls.active]: isOpen})} onClick={(e) => toggleDropdown(e)}>
        <div className={classNames(cls.activatorContent, {[cls.open]: isOpen})}>
            <AppText text={activeValue.title} color={AppTextColor.BLACK} />
            <Icon Svg={ChevronDown} />
        </div>
        <ul
          className={classNames(cls.dropdown, { [cls.hide]: !isOpen }, [dropdownClassName])}
        >   {
            options.map((option, index) => (
                <li key={index} className={cls.dropdownItem} onClick={() => onSelectItem(option)}>
                    <AppText text={option.title} color={AppTextColor.BLACK} />
                </li>
            ))
        }
        </ul>
      </div>
    </div>
  );
};
