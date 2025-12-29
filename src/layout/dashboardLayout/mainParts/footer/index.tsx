import { useAppSelector } from '../../../../hooks/hooks';

const Footer = () => {
	const mode = useAppSelector((state) => state.sidebar.mode);
	const isMobileView = useAppSelector((state) => state.sidebar.isMobileView);
	
	return (
		<div
			className={`${
				mode === 'wide' && !isMobileView
					? 'sm:pl-[var(--dz-sidebar-width)]'
					: 'sm:pl-[var(--dz-sidebar-width-mobile)]'
			} flex items-center justify-center text-[0.875rem] bg-white dark:bg-[var(--card)] h-[3.2rem] border-t border-[var(--border)] mt-auto`}
		>
			<p className='text-[var(--text-gray)] dark:text-[var(--text-gray)] m-0'>
				Copyright © Designed &amp; Developed by{' '}
				<a
					href='#'
					className='text-[var(--primary)] hover:underline'
				>
					Hoda Salah
				</a>{' '}
				2025
			</p>
		</div>
	);
};

export default Footer;
