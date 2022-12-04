import { Statistics } from '../../../models/statistics.interface';

const templateStatistics = (userStat: Statistics) => {
  const date = new Date(userStat.optional.dayStat.today).toLocaleDateString('ru', { day: 'numeric', month: 'long', year: 'numeric' });
  const totalWords = userStat.learnedWords;
  const {
    newWords, learnedWords,
    audioNewWords, audioSuccess,
    audioTotal, audioStreakMax,
    sprintNewWords, sprintSuccess,
    sprintTotal, sprintStreakMax,
  } = userStat.optional.dayStat;
  const audioPercent = audioTotal ? Math.round((audioSuccess / audioTotal) * 100) : 0;
  const sprintPercent = sprintTotal ? Math.round((sprintSuccess / sprintTotal) * 100) : 0;
  const totalPercent = (audioTotal + sprintTotal)
    ? Math.round(((audioSuccess + sprintSuccess) / (audioTotal + sprintTotal)) * 100)
    : 0;

  return `<div class="total-stat">
            <div class="statistics__heading total-stat__heading">
          <div class="total-stat__heading-wrapper wrapper">
            <span class="statistics__heading_text">Статистика</span>
          </div>
        </div>
            <div class="total-stat__wrapper wrapper">
          <div class="total-stat__app app-stat">
            <div class="app-stat__date">
              <div class="app-stat__date_img">
                <img src="./assets/images/statistics/date.svg" alt="Date">
              </div>
              <div class="app-stat__date_text"><span>${date}</span></div>
            </div>
            <div class="app-stat__no-login info-items no-display">
              <div class="info-item item-total">
                <span class="info-item__text item-total__text">Статистика сохраняется для авторизованных пользователей</span>
              </div>
              <div class="info-item">
                <span class="info-item__text"><span class="info-item__link" data-popup="entrance">Авторизуйтесь</span> или 
                <span class="info-item__link" data-popup="registration">зарегистрируйтесь</span>,
                чтобы сохранять ваш прогресс в мини-играх, изученные слова и добавлять сложные слова в личный словарь</span> 
              </div>
            </div> 
            <div class="app-stat__info info-items">
              <div class="info-item item-total">
                <img class="item-total_icon" src="./assets/images/statistics/icon-1.svg" alt="All learned words">
                <span class="info-item__text item-total__text">Всего изученных слов: 
                <span class="info-item__count item-total__count">${totalWords}</span></span>
              </div>
              <div class="info-item">
                <img class="info-item_icon" src="./assets/images/statistics/icon-2.svg" alt="New words per day">
                <span class="info-item__text">Новых слов за день: <span class="info-item__count">${newWords}</span></span>
              </div>
              <div class="info-item">
                <img class="info-item_icon" src="./assets/images/statistics/icon-3.svg" alt="Learned words per day">
                <span class="info-item__text">Изученных слов за день: <span class="info-item__count">${learnedWords}</span></span>
              </div>
              <div class="info-item">
                <img class="info-item_icon" src="./assets/images/statistics/icon-4.svg" alt="Percentage of correct answers per day">
                <span class="info-item__text">Правильные ответы за день: <span class="info-item__count">${totalPercent}%</span></span>
              </div>
            </div>
            <div class="app-stat__diagram"><canvas class="app-stat__diagram-canvas"></canvas></div>
            <div class="game-stat audiocall-stat">
              <div class="game-stat__img audiocall-stat__img"></div>
              <div class="game-stat__content">
                <span class="game-stat__heading">Аудиовызов</span>
                <div class="game-stat__info game-items">
                  <div class="game-item">
                    <img class="game-item_icon" src="./assets/images/statistics/icon-2.svg" alt="New words per day">
                    <span class="game-item__text">Новых слов за день: <span class="game-item__count">${audioNewWords}</span></span>
                  </div>
                  <div class="game-item">
                    <img class="game-item_icon" src="./assets/images/statistics/icon-4.svg" alt="Percentage of correct answers">
                    <span class="game-item__text">Правильные ответы: <span class="game-item__count">${audioPercent}%</span></span>
                  </div>
                  <div class="game-item">
                    <img class="game-item_icon" src="./assets/images/statistics/icon-5.svg" alt="Longest streak">
                    <span class="game-item__text">Самая длинная серия: <span class="game-item__count">${audioStreakMax}</span></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="game-stat sprint-stat">
              <div class="game-stat__img sprint-stat__img"></div>
              <div class="game-stat__content">
                <span class="game-stat__heading">Спринт</span>
                <div class="game-stat__info game-items">
                  <div class="game-item">
                    <img class="game-item_icon" src="./assets/images/statistics/icon-2.svg" alt="New words per day">
                    <span class="game-item__text">Новых слов за день: <span class="game-item__count">${sprintNewWords}</span></span>
                  </div>
                  <div class="game-item">
                    <img class="game-item_icon" src="./assets/images/statistics/icon-4.svg" alt="Percentage of correct answers">
                    <span class="game-item__text">Правильные ответы: <span class="game-item__count">${sprintPercent}%</span></span>
                  </div>
                  <div class="game-item">
                    <img class="game-item_icon" src="./assets/images/statistics/icon-5.svg" alt="Longest streak">
                    <span class="game-item__text">Самая длинная серия: <span class="game-item__count">${sprintStreakMax}</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
          <div class="daily-stat">
        <div class="statistics__heading daily-stat__heading">
          <div class="daily-stat__heading-wrapper wrapper">
            <span class="statistics__subheading_text">Ежедневный прогресс</span>
          </div>
        </div>
        <div class="daily-stat__wrapper wrapper">
        <div class="daily-stat__chart"><canvas class="daily-stat__chart-canvas"></canvas></div>
      </div>
      </div>`;
};

export { templateStatistics };
