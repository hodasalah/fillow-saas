import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '../../../../hooks/hooks';

const SidebarFooter = () => {
	const mode = useAppSelector((state) => state.sidebar.mode);
	const isMobileOpen = useAppSelector((state) => state.sidebar.isMobileOpen);
	if (mode === 'mini' && !isMobileOpen) {
        return (
            <div className="py-4 flex justify-center text-[#9fa4a6]">
                 <span className="text-xl">©</span>
            </div>
        );
    }

	return (
		<div
			className={`
				${isMobileOpen ? 'block' : 'block'}
				 my-4 px-[1rem] text-[#9fa4a6] `}
		>
			<p className='leading-[1.8]'>
				Dashora Saas Admin © 2025 All Rights Reserved
			</p>
			<p className='text-[.75rem] leading-6'>
				Made with <FontAwesomeIcon icon={faHeart} /> by HodaSalah
			</p>
		</div>
	);
};

export default SidebarFooter;
