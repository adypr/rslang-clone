import { Words } from '../../../models/words.interface';
import { Word } from '../../../models/word.interface';
import { SERVER } from '../../../controllers/loader';

const templateAudiocall: string = `
  <div class="audiocall__wrapper wrapper">
    <div class="game-window game-window_audiocall"></div>
  </div>
`;

const templateAudiocallWindow: string = `
    <div class="game-window__text-content">
      <h4 class="game-window__heading">Аудиовызов</h4>
      <p class="game-window__text game-window__text_description">Прослушайте слово и выберите правильный вариант из пяти предложенных</p>
      <p class="game-window__note">Для управления с клавиатуры используйте клавиши&nbsp;“1”–“5”, “Пробел”&nbsp;—&nbsp;пропустить, “Shift”&nbsp;—&nbsp;прослушать.</p>
    </div>
    
    <div class="game-window__categories">
      <p class="game-window__text">Выберите категорию:</p>
      <div class="game-window__buttons">
        <button class="game-window__button game-window__button_a1" data-group="0">A1</button>
        <button class="game-window__button game-window__button_a2" data-group="1">A2</button>
        <button class="game-window__button game-window__button_b1" data-group="2">B1</button>
        <button class="game-window__button game-window__button_b2" data-group="3">B2</button>
        <button class="game-window__button game-window__button_c1" data-group="4">C1</button>
        <button class="game-window__button game-window__button_c2" data-group="5">C2</button>
      </div>
    </div>
    
    <div class="game-window__begin">
      <p class="game-window__text game-window__vocab-text no-display">Используются слова со страницы учебника</p>
      <p class="game-window__text game-window__no-vocab-words no-display">Игра будет со словами из всей категории.<br>На текущей и предыдущих страницах<br>учебника нет неизученных слов.</p>
      <button class="button game-window__buttonBegin button-play-game"></button>
    </div>
`;

const templateAudiocallListening = (wordsArray: Words) => `
<div class="audiocall-game">
  <div class="audiocall-game__wrapper wrapper">
  
     <div class="audiocall-game__container">
     <div class="audiocall-game__listening">
        <div class="audiocall-game__listening-button-wrapper">
          <button class="audiocall-game__listening-button button-play-audio">
           <img src="./assets/images/icons/btn-listen.svg" class="btn-listen__img" alt="👂">
          </button>
        </div>
        <div class="audiocall-game__image">
          <img class="audiocall-game__dog" src="./assets/images/game-audiocall/audiocall-dog.svg" alt="Audiocall dog">
        </div>
     </div>
     </div>
     
     <div class="audiocall-game__content audiocall-content">
      <div class="audiocall-content__items">
        <div class="audiocall-content__item" data-number="1" data-id="${wordsArray[0].id}">
        <svg class="audiocall-content__image" width="298" height="77" viewBox="0 0 298 77" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="audiocall-content__image_bg" fill-rule="evenodd" clip-rule="evenodd" d="M257.912 61.5754C253.894 58.5285 250.696 56.4972 247.416 53.1329C249.63 54.0851 271.606 68.8752 282.183 71.4778C278.247 66.4631 267.916 54.212 266.44 48.9434L276.935 61.5754C300.058 59.6076 296.696 43.9287 295.958 22.9812C295.876 19.8709 295.712 16.6335 295.384 13.2058C294.646 4.57286 285.545 2.2242 274.721 2.28768C222.982 2.47811 72.2122 4.22571 20.063 4.67005C-2.64984 4.92396 2.51525 20.5476 3.89424 43.2939C3.64826 60.3058 10.7819 60.1789 33.6587 60.4328C47.7619 60.5597 255.042 62.8449 257.912 61.5754Z"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M257.01 60.9403C254.14 62.2098 46.124 60.5594 32.0208 60.4325C3.25689 60.0516 3.81425 57.1951 3.73226 18.4106C3.73226 3.0491 19.1474 5.39775 37.1045 5.14384C83.924 4.50907 223.42 6.03252 269.994 5.14384C295.33 4.63603 292.15 15.13 292.806 36.8392C292.888 40.5209 293.708 45.9597 292.806 49.0066C290.756 56.0525 284.807 57.9215 274.885 59.2546L266.44 49.0066C267.916 54.2117 278.247 66.5263 282.183 71.541C271.523 68.9384 249.63 54.1482 247.417 53.1961C250.778 56.6238 252.828 57.8299 257.01 60.9403ZM271.605 0.00219288C253.32 -0.0612843 17.7535 1.26247 12.0958 2.78592C0.633028 5.87251 0.633027 11.3646 0.633027 16.7602C0.0590576 23.9331 -1.60884 49.9962 4.70482 55.5187C15.0363 64.5324 19.4875 63.9244 38.0456 63.9244C46.0812 63.734 202.237 62.9715 205.844 63.162C210.272 63.3524 257.502 62.5272 257.584 62.5272C259.388 62.4003 273.245 70.1445 274.885 71.0966L290.218 77C289.726 75.54 279.395 64.1776 278.001 62.6542C283.823 60.4325 297.106 63.3524 297.844 44.5632C298.09 38.3424 298.172 14.0941 297.106 11.3646C292.678 -0.505625 280.543 0.383056 271.605 0.00219288Z" fill="#482800"/>
        </svg>
        <span class="audiocall-content__text">1. ${wordsArray[0].wordTranslate}</span>
        </div>
        <div class="audiocall-content__item" data-number="2" data-id="${wordsArray[1].id}">
        <svg class="audiocall-content__image" width="298" height="77" viewBox="0 0 298 77" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="audiocall-content__image_bg" fill-rule="evenodd" clip-rule="evenodd" d="M257.912 61.5754C253.894 58.5285 250.696 56.4972 247.416 53.1329C249.63 54.0851 271.606 68.8752 282.183 71.4778C278.247 66.4631 267.916 54.212 266.44 48.9434L276.935 61.5754C300.058 59.6076 296.696 43.9287 295.958 22.9812C295.876 19.8709 295.712 16.6335 295.384 13.2058C294.646 4.57286 285.545 2.2242 274.721 2.28768C222.982 2.47811 72.2122 4.22571 20.063 4.67005C-2.64984 4.92396 2.51525 20.5476 3.89424 43.2939C3.64826 60.3058 10.7819 60.1789 33.6587 60.4328C47.7619 60.5597 255.042 62.8449 257.912 61.5754Z"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M257.01 60.9403C254.14 62.2098 46.124 60.5594 32.0208 60.4325C3.25689 60.0516 3.81425 57.1951 3.73226 18.4106C3.73226 3.0491 19.1474 5.39775 37.1045 5.14384C83.924 4.50907 223.42 6.03252 269.994 5.14384C295.33 4.63603 292.15 15.13 292.806 36.8392C292.888 40.5209 293.708 45.9597 292.806 49.0066C290.756 56.0525 284.807 57.9215 274.885 59.2546L266.44 49.0066C267.916 54.2117 278.247 66.5263 282.183 71.541C271.523 68.9384 249.63 54.1482 247.417 53.1961C250.778 56.6238 252.828 57.8299 257.01 60.9403ZM271.605 0.00219288C253.32 -0.0612843 17.7535 1.26247 12.0958 2.78592C0.633028 5.87251 0.633027 11.3646 0.633027 16.7602C0.0590576 23.9331 -1.60884 49.9962 4.70482 55.5187C15.0363 64.5324 19.4875 63.9244 38.0456 63.9244C46.0812 63.734 202.237 62.9715 205.844 63.162C210.272 63.3524 257.502 62.5272 257.584 62.5272C259.388 62.4003 273.245 70.1445 274.885 71.0966L290.218 77C289.726 75.54 279.395 64.1776 278.001 62.6542C283.823 60.4325 297.106 63.3524 297.844 44.5632C298.09 38.3424 298.172 14.0941 297.106 11.3646C292.678 -0.505625 280.543 0.383056 271.605 0.00219288Z" fill="#482800"/>
        </svg>
        <span class="audiocall-content__text">2. ${wordsArray[1].wordTranslate}</span>
        </div>
        <div class="audiocall-content__item" data-number="3" data-id="${wordsArray[2].id}">
        <svg class="audiocall-content__image" width="298" height="77" viewBox="0 0 298 77" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="audiocall-content__image_bg" fill-rule="evenodd" clip-rule="evenodd" d="M257.912 61.5754C253.894 58.5285 250.696 56.4972 247.416 53.1329C249.63 54.0851 271.606 68.8752 282.183 71.4778C278.247 66.4631 267.916 54.212 266.44 48.9434L276.935 61.5754C300.058 59.6076 296.696 43.9287 295.958 22.9812C295.876 19.8709 295.712 16.6335 295.384 13.2058C294.646 4.57286 285.545 2.2242 274.721 2.28768C222.982 2.47811 72.2122 4.22571 20.063 4.67005C-2.64984 4.92396 2.51525 20.5476 3.89424 43.2939C3.64826 60.3058 10.7819 60.1789 33.6587 60.4328C47.7619 60.5597 255.042 62.8449 257.912 61.5754Z"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M257.01 60.9403C254.14 62.2098 46.124 60.5594 32.0208 60.4325C3.25689 60.0516 3.81425 57.1951 3.73226 18.4106C3.73226 3.0491 19.1474 5.39775 37.1045 5.14384C83.924 4.50907 223.42 6.03252 269.994 5.14384C295.33 4.63603 292.15 15.13 292.806 36.8392C292.888 40.5209 293.708 45.9597 292.806 49.0066C290.756 56.0525 284.807 57.9215 274.885 59.2546L266.44 49.0066C267.916 54.2117 278.247 66.5263 282.183 71.541C271.523 68.9384 249.63 54.1482 247.417 53.1961C250.778 56.6238 252.828 57.8299 257.01 60.9403ZM271.605 0.00219288C253.32 -0.0612843 17.7535 1.26247 12.0958 2.78592C0.633028 5.87251 0.633027 11.3646 0.633027 16.7602C0.0590576 23.9331 -1.60884 49.9962 4.70482 55.5187C15.0363 64.5324 19.4875 63.9244 38.0456 63.9244C46.0812 63.734 202.237 62.9715 205.844 63.162C210.272 63.3524 257.502 62.5272 257.584 62.5272C259.388 62.4003 273.245 70.1445 274.885 71.0966L290.218 77C289.726 75.54 279.395 64.1776 278.001 62.6542C283.823 60.4325 297.106 63.3524 297.844 44.5632C298.09 38.3424 298.172 14.0941 297.106 11.3646C292.678 -0.505625 280.543 0.383056 271.605 0.00219288Z" fill="#482800"/>
        </svg>
        <span class="audiocall-content__text">3. ${wordsArray[2].wordTranslate}</span>
        </div>
        <div class="audiocall-content__item" data-number="4" data-id="${wordsArray[3].id}">
        <svg class="audiocall-content__image" width="298" height="77" viewBox="0 0 298 77" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="audiocall-content__image_bg" fill-rule="evenodd" clip-rule="evenodd" d="M257.912 61.5754C253.894 58.5285 250.696 56.4972 247.416 53.1329C249.63 54.0851 271.606 68.8752 282.183 71.4778C278.247 66.4631 267.916 54.212 266.44 48.9434L276.935 61.5754C300.058 59.6076 296.696 43.9287 295.958 22.9812C295.876 19.8709 295.712 16.6335 295.384 13.2058C294.646 4.57286 285.545 2.2242 274.721 2.28768C222.982 2.47811 72.2122 4.22571 20.063 4.67005C-2.64984 4.92396 2.51525 20.5476 3.89424 43.2939C3.64826 60.3058 10.7819 60.1789 33.6587 60.4328C47.7619 60.5597 255.042 62.8449 257.912 61.5754Z"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M257.01 60.9403C254.14 62.2098 46.124 60.5594 32.0208 60.4325C3.25689 60.0516 3.81425 57.1951 3.73226 18.4106C3.73226 3.0491 19.1474 5.39775 37.1045 5.14384C83.924 4.50907 223.42 6.03252 269.994 5.14384C295.33 4.63603 292.15 15.13 292.806 36.8392C292.888 40.5209 293.708 45.9597 292.806 49.0066C290.756 56.0525 284.807 57.9215 274.885 59.2546L266.44 49.0066C267.916 54.2117 278.247 66.5263 282.183 71.541C271.523 68.9384 249.63 54.1482 247.417 53.1961C250.778 56.6238 252.828 57.8299 257.01 60.9403ZM271.605 0.00219288C253.32 -0.0612843 17.7535 1.26247 12.0958 2.78592C0.633028 5.87251 0.633027 11.3646 0.633027 16.7602C0.0590576 23.9331 -1.60884 49.9962 4.70482 55.5187C15.0363 64.5324 19.4875 63.9244 38.0456 63.9244C46.0812 63.734 202.237 62.9715 205.844 63.162C210.272 63.3524 257.502 62.5272 257.584 62.5272C259.388 62.4003 273.245 70.1445 274.885 71.0966L290.218 77C289.726 75.54 279.395 64.1776 278.001 62.6542C283.823 60.4325 297.106 63.3524 297.844 44.5632C298.09 38.3424 298.172 14.0941 297.106 11.3646C292.678 -0.505625 280.543 0.383056 271.605 0.00219288Z" fill="#482800"/>
        </svg>
        <span class="audiocall-content__text">4. ${wordsArray[3].wordTranslate}</span>
        </div>
        <div class="audiocall-content__item" data-number="5" data-id="${wordsArray[4].id}">
        <svg class="audiocall-content__image" width="298" height="77" viewBox="0 0 298 77" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="audiocall-content__image_bg" fill-rule="evenodd" clip-rule="evenodd" d="M257.912 61.5754C253.894 58.5285 250.696 56.4972 247.416 53.1329C249.63 54.0851 271.606 68.8752 282.183 71.4778C278.247 66.4631 267.916 54.212 266.44 48.9434L276.935 61.5754C300.058 59.6076 296.696 43.9287 295.958 22.9812C295.876 19.8709 295.712 16.6335 295.384 13.2058C294.646 4.57286 285.545 2.2242 274.721 2.28768C222.982 2.47811 72.2122 4.22571 20.063 4.67005C-2.64984 4.92396 2.51525 20.5476 3.89424 43.2939C3.64826 60.3058 10.7819 60.1789 33.6587 60.4328C47.7619 60.5597 255.042 62.8449 257.912 61.5754Z"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M257.01 60.9403C254.14 62.2098 46.124 60.5594 32.0208 60.4325C3.25689 60.0516 3.81425 57.1951 3.73226 18.4106C3.73226 3.0491 19.1474 5.39775 37.1045 5.14384C83.924 4.50907 223.42 6.03252 269.994 5.14384C295.33 4.63603 292.15 15.13 292.806 36.8392C292.888 40.5209 293.708 45.9597 292.806 49.0066C290.756 56.0525 284.807 57.9215 274.885 59.2546L266.44 49.0066C267.916 54.2117 278.247 66.5263 282.183 71.541C271.523 68.9384 249.63 54.1482 247.417 53.1961C250.778 56.6238 252.828 57.8299 257.01 60.9403ZM271.605 0.00219288C253.32 -0.0612843 17.7535 1.26247 12.0958 2.78592C0.633028 5.87251 0.633027 11.3646 0.633027 16.7602C0.0590576 23.9331 -1.60884 49.9962 4.70482 55.5187C15.0363 64.5324 19.4875 63.9244 38.0456 63.9244C46.0812 63.734 202.237 62.9715 205.844 63.162C210.272 63.3524 257.502 62.5272 257.584 62.5272C259.388 62.4003 273.245 70.1445 274.885 71.0966L290.218 77C289.726 75.54 279.395 64.1776 278.001 62.6542C283.823 60.4325 297.106 63.3524 297.844 44.5632C298.09 38.3424 298.172 14.0941 297.106 11.3646C292.678 -0.505625 280.543 0.383056 271.605 0.00219288Z" fill="#482800"/>
        </svg>
        <span class="audiocall-content__text">5. ${wordsArray[4].wordTranslate}</span>
        </div>
      </div>
      <button class="button audiocall-content__button button-dont-know" data-id="button-dont-know">Не знаю</button>
     </div>
  
  </div>
</div>`;

const templateResults = (word: Word) => `
     <div class="audiocall-game__results audiocall-results">
      <div class="audiocall-results__content">
        <span class="audiocall-results__name">${word.word}</span>
        <span class="audiocall-results__translation">${word.wordTranslate}</span>
        <div class="audiocall-results__listening">
          <button class="audiocall-results__button button-play-audio">
            <img src="./assets/images/icons/btn-listen.svg" class="btn-listen__img" alt="👂">
          </button>
          <span class="audiocall-results__transcription">${word.transcription}</span>
        </div>
      </div>
      <div class="audiocall-results__picture">
      <img class="audiocall-results__image" src="${SERVER + word.image}" alt="${word.word} image">
      </div>
    </div>`;

export {
  templateAudiocall,
  templateAudiocallWindow,
  templateAudiocallListening,
  templateResults,
};
