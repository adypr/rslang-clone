import '../../../global.scss';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { addHeader } from '../../header/header';
import { addFooter } from '../../footer/footer';
import {
  addStatistics,
  dailyChartData,
  dailyChartOptions,
  wordsLearnedPieData,
  wordsLearnedPieOptions,
} from './statistics-page';

Chart.register(ChartDataLabels);
Chart.defaults.font.family = "'Arimo', 'Arial', sans-serif";
Chart.defaults.font.size = 16;

addHeader();
addStatistics();
addFooter();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const wordsLearnedPie = new Chart(
  document.querySelector('.app-stat__diagram-canvas') as HTMLCanvasElement,
  {
    type: 'pie',
    data: wordsLearnedPieData,
    options: wordsLearnedPieOptions,
  },
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DailyChart = new Chart(
  document.querySelector('.daily-stat__chart-canvas') as HTMLCanvasElement,
  {
    type: 'bar',
    data: dailyChartData,
    options: dailyChartOptions,
  },
);

window.addEventListener('resize', () => {
  if (window.outerWidth <= 700) {
    Chart.defaults.font.size = 14;
    dailyChartOptions.plugins.legend.labels.font.size = 16;
    dailyChartData.datasets[0].datalabels.font.size = 14;
    dailyChartData.datasets[1].datalabels.font.size = 18;
  }
  if (window.outerWidth > 700) {
    Chart.defaults.font.size = 16;
    dailyChartOptions.plugins.legend.labels.font.size = 20;
    dailyChartData.datasets[0].datalabels.font.size = 16;
    dailyChartData.datasets[1].datalabels.font.size = 24;
  }
});
