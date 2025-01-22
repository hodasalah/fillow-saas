import React from 'react';
import Tooltip from './Tooltip';

interface ProgressBarProps {
	progress: number;
	
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
	const [show, setShow] = React.useState(false);
	const TOTAL_PROGRESS = 60; // Add at top level
	const PROGRESS_BAR_STYLES = {
container:'h-[0.325rem] bg-[var(--rgba-primary-1)] flex rounded-[0.625rem]',
progress: 'bg-[var(--primary)] h-[5px] flex flex-col justify-center progress-animated rounded-l-[0.625rem] relative'}

	return (
		<div className={PROGRESS_BAR_STYLES.container}>
			<div
				role='progressbar'
				aria-valuenow={(progress * 100) / TOTAL_PROGRESS}
				aria-valuemin='0'
				aria-valuemax={TOTAL_PROGRESS}
				className={PROGRESS_BAR_STYLES.progress}
				style={{ width: `${(progress * 100) / TOTAL_PROGRESS}%` }}
				onMouseOver={() => setShow(true)}
				onMouseLeave={() => setShow(false)}
			>
				<Tooltip
					show={show}
					progress={progress}
					totalProgress={TOTAL_PROGRESS}
				/>
			</div>
		</div>
	);
};

export default ProgressBar;
