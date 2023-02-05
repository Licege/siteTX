import { Typography, Button } from '@components';
import { Veranda } from '../../../assets';
import c from './AboutSection.module.css';

export const AboutSection = () => {
  return (
    <section className={c.AboutSection}>
      <img className={c.image} src={Veranda} alt="веранда" />
      <article className={c.info}>
        <Typography className={c.title} variant="title2" align="center">Добро пожаловать</Typography>
        <div>
          <Typography className={c.text} variant="body1">
            Ресторанный комплекс "Три холма" находится вдали от городской суеты, на берегу Голубых озер. С летней веранды ресторана открывается живописный вид на одно из них. Территория украшена цветами и фонтанами. Имеется детская летняя площадка с горками и качелями. В ресторане доступны три зала, идеально подходящих для проведения досуга в спокойной обстановке. Также в отдельном здании имеются два банкетных зала для проведения торжеств. Общая вместимость комплекса "Три холма" составляет 250 персон. Посетителям предлагается обширное и разнообразное меню, которое состоит из блюд европейской, кавказской и азербайджанской кухни.
          </Typography>
          <Button className={c.button} size="s" variant="outline">Подробнее о нас</Button>
        </div>
      </article>
    </section>
  );
};
