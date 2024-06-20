import { FC, SelectHTMLAttributes } from "react";
import { AppText } from "../../AppText";
import { AppTextWeight } from "../../AppText/ui/AppText.helper";
import { classNames } from "@/shared/helpers/classNames/classNames";
import cls from './AppSelect.module.scss'

type HTMLSelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'>;

interface OptionsType {
    value: string;
    title: string;
    selected?: boolean;
}

interface AppSelectProps extends HTMLSelectProps  {
    className?: string;
    selectLabel?: string;
    optionsList: OptionsType[],
    onChange?: (value: string) => void
}


export const AppSelect: FC<AppSelectProps> = (props: AppSelectProps) => {
    const { className = '', optionsList, selectLabel = '', onChange } = props

    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value)
    }

    return (
        <div className={cls.appSelectContainer}>
            <AppText text={selectLabel} size={14} height={20} weight={AppTextWeight.REGULAR} />
            <select name="select" onChange={onChangeHandler} className={classNames(cls.appSelect, {} , [className])}>
                {
                    optionsList.map((item, index) => (
                        <option key={index} value={item.value} selected={item.selected}>{item.title}</option>
                    ))
                }
            </select>
        </div>
        
    )
}