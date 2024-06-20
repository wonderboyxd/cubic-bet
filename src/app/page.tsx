'use client'
import Image from "next/image";
import cls from './page.module.scss'
import { AppText } from "@/shared/ui/AppText";
import { AppButton } from "@/shared/ui/AppButton/ui/AppButton";
import { AppSelect } from "@/shared/ui/AppSelect";

export default function Home() {

  const check = (value: string) => {
    console.log(value)

  }

  return (
    <main className={cls.homePage}>
      <AppText text="1234" />
      <AppButton text="Сохранить" disabled={true}/>
      <AppSelect 
        optionsList={[{value: '1', title: 'title'}, {value: '2', title: 'title2', selected: true}]} 
        onChange={(value: string) => check(value)}
        selectLabel="Размер ставки"
      />
     </main>
  );
}
