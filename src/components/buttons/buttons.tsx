import { ReactNode } from 'react';

export const PrimaryOutlineBtn = ({
	onBtnClick,
	children,
	...props
}: {
	onBtnClick?: () => void;
	children: ReactNode;
}) => {
	return (
		<button
			className='w-full border-[1px] border-[var(--primary)] dark:border-secondary rounded-full h-12 text-center text-[var(--primary)] dark:text-secondary hover:bg-[var(--primary)] dark:hover:bg-secondary hover:text-white dark:hover:text-[#333]  transition-all duration-300 text-[1rem] font-normal px-5'
			onClick={onBtnClick}
			{...props}
		>
			{children}
		</button>
	);
};
export const PrimaryBtn = ({onBtnClick, children, ...props }: { onBtnClick?: () => void; children: ReactNode }) => {
	return (
		<button
			className='w-full border-[1px] border-[var(--primary)] dark:border-secondary rounded-full h-12 text-center hover:text-[var(--primary)] hover:bg-[var(--rgba-primary-1)] bg-[var(--primary)] dark:bg-secondary dark:text-[#333] dark:hover:bg-transparent dark:hover:text-white text-white transition-all duration-300 text-[1rem] font-normal  
			shadow-primary-btn px-5'
			onClick={onBtnClick}
			{...props}
		>
			{children}
		</button>
	);
};
