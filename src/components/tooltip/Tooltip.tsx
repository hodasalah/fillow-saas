import React from 'react';

interface TooltipProps {
	show: boolean;
	progress: number;
	totalProgress: number;
}
const Tooltip: React.FC<TooltipProps> = ({ show, progress, totalProgress }) => {
	const TOOLTIP_STYLES = {
		container:
			'h-[4rem] px-4 absolute bottom-[10px]  border-[1px] border-[var(--border)] rounded-[0.625rem] bg-[var(--primary)]  items-center justify-center text-[.854rem] text-white text-center',
		container_before: `before:content-[""] before:absolute
					before:bottom-[-8px] before:left-[50%] before:transform-translate-x-[-50%] before:w-[0] before:h-[0] before:border-t-[8px]
					before:border-r-[10px] before:border-b-[0] before:border-l-[10px] before:border-[var(--primary)]  before:shadow-[0 1px 2px rgba(0,0,0,.15)] before:z-10 before:transition-all before:duration-200 before:ease-in-out before:border-x-transparent before:border-b-transparent`,
	};
	return (
		<span
			className={
				TOOLTIP_STYLES.container + ' ' + TOOLTIP_STYLES.container_before
			}
			style={{ display: show ? 'flex' : 'none' }}
		>
			{(progress * 100) / totalProgress}% completed
		</span>
	);
};

export default Tooltip;
