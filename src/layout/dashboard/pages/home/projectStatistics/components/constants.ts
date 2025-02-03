import { StatisticsData, TabConfig, TimePeriod } from './types';
import { v4 as uuidv4 } from 'uuid';

const TABS: TabConfig[] = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'daily', label: 'Daily' },
];

const DEFAULT_DATA: Record<TimePeriod, StatisticsData> = {
  monthly: {
    total: 246,
    ongoing: 200,
    unfinished: 46,
    chartData: [80, 40, 70, 90, 50, 60, 85].map((value) =>
      Number(value.toFixed(2)),
    ),
  },
  weekly: {
    total: 70,
    ongoing: 60,
    unfinished: 10,
    chartData: [10, 20, 30, 40, 50, 60, 70].map((value) =>
      Number(value.toFixed(2)),
    ),
  },
  daily: {
    total: 10,
    ongoing: 8,
    unfinished: 2,
    chartData: [1, 2, 3, 4, 5, 6, 7].map((value) =>
      Number(value.toFixed(2)),
    ),
  },
};

const links:{ id: string; name: string }[]= [
  { id: uuidv4(), name: 'Edit' },
  { id: uuidv4(), name: 'Delete' },
];
export { TABS, DEFAULT_DATA, links };