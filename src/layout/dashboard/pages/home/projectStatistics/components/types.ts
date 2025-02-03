export type TimePeriod = 'daily' | 'weekly' | 'monthly';

export interface StatisticsData {
	total: number;
	ongoing: number;
	unfinished: number;
	chartData: number[];
}

export interface TabConfig {
	id: TimePeriod;
	label: string;
}

export type EditModalProps = {
	data: StatisticsData | null;

	onSave: () => void;

	onClose: () => void;

	onChange: (key: keyof StatisticsData, value: number) => void;
};

