import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '../../../../../hooks/hooks';
import './sidebarProfile.css';
const SidebarProfile = () => {
	const isOpen = useAppSelector((state) => state.sidebar.isOpen);
	return (
		<div className={`${isOpen ? 'side-bar-profile px-4' : 'hidden'}`}>
			<div className='profile-wrapper'>
				<div className='side-bar-profile-img'>
					<img
						src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80'
						alt=''
					/>
				</div>
				<div className='profile-info1'>
					<h5 className='leading-6 font-semibold'>John Doe</h5>
					<span>JohnDoe@gmail.com</span>
				</div>
			</div>
			<div className='flex justify-between mb-2 '>
				<span className='fs-12'>
					<FontAwesomeIcon
						icon={faStar}
						className='text-[#ff9900] mr-2'
					/>
					Task Progress
				</span>
				<span className='text-[.75rem] leading-6'>20/45</span>
			</div>
			<div className='flex h-[8px] bg-[#f6f6f6] rounded-[0.625rem] overflow-hidden default-progress '>
				<div className='progress-bar bg-gradientf progress-animated'>
					<span className='sr-only'>45% Complete</span>
				</div>
			</div>
		</div>
	);
};

export default SidebarProfile;
