import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '../../../hooks/hooks';

const SidebarFooter = () => {
		const isOpen = useAppSelector((state) => state.sidebar.isOpen);
	
	return (
		<div className={`${isOpen?'block my-4 px-[1rem] text-[#9fa4a6]':'hidden'}`}>
			<p className='leading-[1.8]'>
				Fillow Saas Admin © 2025 All Rights Reserved
			</p>
			<p className='text-[.75rem] leading-6'>
				Made with <FontAwesomeIcon icon={faHeart}/> by HodaSalah
			</p>
		</div>
	);
};

export default SidebarFooter;
