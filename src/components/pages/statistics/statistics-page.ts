import { renderElement } from '../../../controllers/helpers';
import Loader from '../../../controllers/loader';
import { templateStatistics } from './templates';

const userStat = await Loader.getStatistics();

export const wordsLearnedPieData = {
  labels: [
    'Изученные слова',
    'Неизученные слова',
  ],
  datasets: [{
    label: 'Изученные слова',
    data: [userStat.learnedWords, 3600 - userStat.learnedWords],
    backgroundColor: [
      '#F26120',
      '#05D7E2',
    ],
    hoverOffset: 4,
  }],
};

export const wordsLearnedPieOptions = {
  maintainAspectRatio: false,
  layout: {
    padding: 8,
  },
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        font: {
          family: 'Balsamiq Sans',
        },
      },
    },
    datalabels: {
      color: '#000',
      font: {
        size: 20,
        family: 'Balsamiq Sans',
      },
    },
  },
};

const dailyChartLabels = Object.keys(userStat.optional.completeStat).map((e) => {
  const date = new Date(Number(e));
  return date.toLocaleDateString('ru', { day: 'numeric', month: 'short' });
});

const dailyChartValuesNewWords = Object.values(userStat.optional.completeStat)
  .map((e) => e.newWords);
const dailyChartValuesTotalLearned = Object.values(userStat.optional.completeStat)
  .map((e) => e.totalLearnedWords);

export const dailyChartData = {
  labels: dailyChartLabels,
  datasets: [
    {
      type: 'line' as 'bar',
      label: 'Всего изучено слов',
      data: dailyChartValuesTotalLearned,
      borderColor: '#04A6B7',
      backgroundColor: '#05D7E2',
      pointStyle: 'circle',
      pointRadius: 6,
      pointHoverRadius: 8,
      yAxisID: 'y',
      datalabels: {
        backgroundColor: '#05D7E2',
        color: '#004249',
        borderRadius: 4,
        padding: 6,
        font: {
          size: 16,
          family: 'Balsamiq Sans',
        },
        align: 'end' as 'end',
        anchor: 'end' as 'end',
      },
    },
    {
      label: 'Новых слов за день',
      data: dailyChartValuesNewWords,
      borderColor: '#F26120',
      backgroundColor: '#FFCE22',
      yAxisID: 'y1',
      datalabels: {
        color: '#F22020',
        font: {
          size: 24,
          family: 'Balsamiq Sans',
        },
        align: 'end' as 'end',
        anchor: 'start' as 'start',
      },
    },
  ],
};

export const dailyChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        padding: 24,
        font: {
          size: 20,
          family: 'Balsamiq Sans',
        },
      },
    },
    tooltip: {
      position: 'nearest' as 'nearest',
    },
  },
  interaction: {
    intersect: false,
    mode: 'index' as 'index',
  },
  elements: {
    line: {
      tension: 0.4,
    },
  },
  layout: {
    padding: {
      top: 8,
      right: 16,
      bottom: 16,
      left: 8,
    },
  },
  scales: {
    x: {},
    y: {
      beginAtZero: true,
      type: 'linear' as 'linear',
      display: true,
      position: 'left' as 'left',
    },
    y1: {
      beginAtZero: true,
      type: 'linear' as 'linear',
      display: true,
      position: 'right' as 'right',

      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

export const addStatistics: () => void = () => {
  renderElement('main', templateStatistics(userStat), document.body, 'statistics');

  if (!localStorage.getItem('token')) {
    document.querySelector('.app-stat__no-login').classList.remove('no-display');
    document.querySelector('.app-stat__info').classList.add('no-display');
  }
};
