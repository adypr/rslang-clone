const templateHeader: string = `
<div class="header__wrapper wrapper">
  <div class="header__container">
    <div class="mobile-label">
      <span></span>
    </div>
    <div class="mobile-blackout"></div>
    <div class="logo">
      <a href="index.html" class="logo__url">
      <h2 class="logo__text">RS Lang</h2>
      </a>
    </div>
    <nav class="navigation">
  <div class="navigation__links menu mobile-menu">
    <a class="navigation-link menu__link link-basic" href="textbook.html">
      <svg class="navigation-link__icon" width="25" height="29" viewBox="0 0 25 29" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.80476 2.83333H24.0606V0.5H4.22726C2.29526 0.5 0.727264 2.06683 0.727264 4V25C0.727264 26.9332 2.29526 28.5 4.22726 28.5H24.0606V5.16667H4.80476C3.19943 5.16667 3.19943 2.83333 4.80476 2.83333ZM5.39393 7.5H13.5606V15.6667L15.8939 13.3333L18.2273 15.6667V7.5H21.7273V26.1667H5.39393V7.5Z"/>
      </svg>
      <span class="navigation-link__text menu__link_text text">Учебник</span>
    </a>
    
    <a class="navigation-link menu__link link-basic" href="audiocall.html">
      <svg class="navigation-link__icon" width="31" height="29" viewBox="0 0 31 29" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.80824 25.9545C2.05243 25.1782 0.0606079 22.0218 0.0606079 18.9545C0.0606079 15.6264 2.2637 12.3389 6.78443 11.9545C4.98352 13.9795 3.87879 16.6738 3.87879 19.5909C3.87879 21.8589 4.66533 24.1727 5.80824 25.9545ZM30.6061 18.9545C30.6061 22.0205 28.6333 25.1769 24.8788 25.9545C26.0204 24.1727 26.7879 21.8589 26.7879 19.5909C26.7879 16.6738 25.6832 13.9795 23.8822 11.9545C28.403 12.3402 30.6061 15.6276 30.6061 18.9545ZM24.1482 9.42564C25.3472 9.53255 26.4162 9.79982 27.367 10.1905C25.7506 4.60582 21.4284 0.5 15.3333 0.5C9.24206 0.5 4.93134 4.60455 3.31624 10.1816C4.26315 9.796 5.3297 9.53 6.52352 9.42436C8.23788 6.19418 11.4133 4.28255 15.3333 4.29018C19.2546 4.28255 22.4326 6.19418 24.1482 9.42564ZM15.3333 10.6818C10.4142 10.6818 6.42424 14.6705 6.42424 19.5909C6.42424 24.5113 10.4142 28.5 15.3333 28.5C20.2524 28.5 24.2424 24.5113 24.2424 19.5909C24.2424 14.6705 20.2524 10.6818 15.3333 10.6818ZM12.7879 24.6818V14.5L20.4242 19.5909L12.7879 24.6818Z"/>
      </svg>
      <span class="navigation-link__text menu__link_text text">Аудиовызов</span>
    </a>
    
    <a class="navigation-link menu__link link-basic" href="sprint.html">
      <svg class="navigation-link__icon" width="22" height="29" viewBox="0 0 22 29" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.2264 5.21567C13.3064 5.21567 13.2177 1.83817 8.66655 1.83817C6.20722 1.83817 3.91238 2.9815 2.93938 3.8145V0.5H0.606049V28.5H2.93938V17.9148C4.32072 16.9593 6.41488 15.9537 8.68288 15.9537C12.9809 15.9537 13.584 19.1667 17.4142 19.1667C19.8899 19.1667 21.606 17.5812 21.606 17.5812V3.5485C21.606 3.5485 19.7149 5.21567 17.2264 5.21567ZM19.2727 11.3092C16.4529 13.3823 13.4055 10.9125 11.8644 9.89517V14.1757L11.8679 14.1768C10.9847 13.8513 9.94872 13.6203 8.68288 13.6203C6.37405 13.6203 4.35455 14.4125 2.93938 15.1825V10.7608C5.57605 8.46017 9.40855 8.15567 11.8644 9.89517V5.45833C12.9914 6.34033 14.5337 7.549 17.2264 7.549C17.9579 7.549 18.6439 7.44867 19.2727 7.28883V11.3092Z"/>
      </svg>
      <span class="navigation-link__text menu__link_text text">Спринт</span>
    </a>
    
        <a class="navigation-link menu__link link-basic" href="statistics.html">
      <svg class="navigation-link__icon" width="27" height="29" viewBox="0 0 27 29" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.60605 28.5H0.606049V21.5H7.60605V28.5ZM16.9394 18H9.93938V28.5H16.9394V18ZM26.2727 13.3333H19.2727V28.5H26.2727V13.3333ZM26.2727 0.5L19.2727 1.9245L21.2747 3.91717L13.283 11.7723L9.78188 8.27L0.634049 17.3665L2.27905 19.0208L9.77722 11.5658L13.2667 15.0577L22.9267 5.5645L24.8715 7.50117L26.2727 0.5V0.5Z"/>
      </svg>
      <span class="navigation-link__text menu__link_text text">Статистика</span>
    </a>
    
  </div>
  
  
  
  <button class="navigation-link menu__link link-basic sound">
    <svg class="navigation-link__icon icon-sound-on" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{}</style></defs><title/><g data-name="Layer 34" id="Layer_34"><path class="cls-1" d="M18,29a1,1,0,0,1-.57-.18l-10-7A1,1,0,0,1,7,21V11a1,1,0,0,1,.43-.82l10-7a1,1,0,0,1,1-.07A1,1,0,0,1,19,4V28a1,1,0,0,1-.54.89A1,1,0,0,1,18,29ZM9,20.48l8,5.6V5.92l-8,5.6Z"/><path class="cls-1" d="M8,22H4a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H8a1,1,0,0,1,1,1V21A1,1,0,0,1,8,22ZM4,12a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1H7V12Z"/><path class="cls-1" d="M18,21V19a3,3,0,0,0,2.12-5.12l1.42-1.42A5,5,0,0,1,18,21Z"/><path class="cls-1" d="M26.48,25.48a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42,11,11,0,0,0,0-15.54,1,1,0,1,1,1.42-1.42,13,13,0,0,1,0,18.38A1,1,0,0,1,26.48,25.48Z"/><path class="cls-1" d="M23.65,22.65a1,1,0,0,1-.7-.29A1,1,0,0,1,23,21a7,7,0,0,0,0-9.9,1,1,0,0,1,1.41-1.41,9,9,0,0,1,0,12.72A1,1,0,0,1,23.65,22.65Z"/></g></svg>
    <svg class="navigation-link__icon icon-sound-off" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{}</style></defs><title/><g data-name="Layer 35" id="Layer_35"><path class="cls-1" d="M18,29a1,1,0,0,1-.57-.18l-10-7A1,1,0,0,1,7,21V11a1,1,0,0,1,.43-.82l10-7a1,1,0,0,1,1-.07A1,1,0,0,1,19,4V28a1,1,0,0,1-.54.89A1,1,0,0,1,18,29ZM9,20.48l8,5.6V5.92l-8,5.6Z"/><path class="cls-1" d="M8,22H4a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H8a1,1,0,0,1,1,1V21A1,1,0,0,1,8,22ZM4,12a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1H7V12Z"/><rect class="cls-1" height="12" transform="translate(-3.77 22.9) rotate(-45)" width="2" x="24.76" y="10"/><rect class="cls-1" height="2" transform="translate(-3.77 22.9) rotate(-45)" width="12" x="19.76" y="15"/></g></svg>
  </button>
  
  <div class="navigation__links options"></div>  
  
</nav>
  </div>
</div>`;

export default templateHeader;
