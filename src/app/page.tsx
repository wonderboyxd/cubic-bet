import cls from './page.module.scss'
import { Playground } from "@/widgets/Playground";

export default function Home() {


  return (
    <section className={cls.homePage}>
        <Playground />
     </section>
  );
}
