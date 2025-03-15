import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '../../../../../hooks/hooks';
import { User } from '../../../../../types';
import './sidebarProfile.css';
const SidebarProfile = () => {
	const mode = useAppSelector((state) => state.sidebar.mode);
	const user = useAppSelector(
		(state) => state.users.currentUser,
	) as User | null;
	console.log(user)
	return (
		<div
			className={`${
				mode === 'wide' ? 'side-bar-profile px-4' : 'hidden'
			}`}
		>
			<div className='profile-wrapper'>
				<div className='side-bar-profile-img'>
					<img
						src={user?.profilePicture}
						alt={user?.name}
					/>
				</div>
				<div className='overflow-hidden'>
					<h5 className='leading-6 font-semibold max-w-full'>
						{user?.name}
					</h5>
					<span className='text-[.7rem]'>{user?.email}</span>
				</div>
			</div>
			<div className='flex justify-between mb-2 '>
				<span>
					<FontAwesomeIcon
						icon={faStar}
						className='text-[#ff9900] mr-2'
					/>
					Task Progress
				</span>
				<span className='text-[.75rem] leading-6'>
					{user?.taskProgress}/45
				</span>
			</div>
			<div className='flex h-[8px] bg-[#f6f6f6] rounded-[0.625rem] overflow-hidden default-progress '>
				<div className='progress-bar bg-gradientf progress-animated'>
					<span className='sr-only'>
						{user?.taskProgress} Complete
					</span>
				</div>
			</div>
		</div>
	);
};

export default SidebarProfile;
