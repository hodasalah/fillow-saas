import { ReactNode } from 'react';

export const PrimaryOutlineBtn = ({
	children,
	...props
}: {
	children: ReactNode;
}) => {
	return (
		<button
			className='w-full border-[1px] border-[var(--primary)] rounded-full h-12 text-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300 text-[1rem] font-normal'
			{...props}
		>
			{children}
		</button>
	);
};
