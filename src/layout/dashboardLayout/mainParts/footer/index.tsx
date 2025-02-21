import { useAppSelector } from '../../../../hooks/hooks';

const Footer = () => {
	const isOpen = useAppSelector((state) => state.sidebar.isOpen);
	return (
		<div
			className={`${
				isOpen
					? 'sm:pl-[var(--dz-sidebar-width)]'
					: 'sm:pl-[var(--dz-sidebar-width-mobile)]'
			} text-center  text-[0.875rem] bg-white h-[3.2rem]`}
		>
			<div className='text-[#9fa4a6] p-[0.9375rem] mt-[1.875rem]'>
				<p className='text-center leading-[1.8] m-0'>
					Copyright © Designed &amp; Developed by{' '}
					<a
						href='#'
						className='text-[var(--primary)]'
					>
						Hoda Salah
					</a>{' '}
					2025
				</p>
			</div>
		</div>
	);
};

export default Footer;
