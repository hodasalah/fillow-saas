import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '../../../../../hooks/hooks';
import { User } from '../../../../../types';
import './sidebarProfile.css';

const SidebarProfile = () => {
	const mode = useAppSelector((state) => state.sidebar.mode);
	const user = useAppSelector(
		(state) => state.auth.currentUser,
	) as User | null;

	const handleImageError = (
		e: React.SyntheticEvent<HTMLImageElement, Event>,
	) => {
		const target = e.target as HTMLImageElement;
		const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
			user?.name || 'User',
		)}&background=random&color=fff&size=200&bold=true&format=png`;
		if (target.src !== fallbackUrl) {
			target.src = fallbackUrl;
		}
	};

	return (
		<div
			className={`
				${mode === 'wide' ? 'side-bar-profile px-4' : 'px-2 py-4 flex flex-col items-center'}
                transition-all duration-300
			`}
		>
			<div className={`profile-wrapper ${mode === 'wide' ? '' : 'flex-col justify-center'}`}>
				<div className={`side-bar-profile-img ${mode === 'wide' ? '' : '!w-10 !h-10 !mr-0'}`}>
					<img
						src={user?.profilePicture}
						alt={user?.name || 'Profile'}
						onError={handleImageError}
                        className={`${mode === 'wide' ? '' : 'w-10 h-10 rounded-full'}`}
					/>
				</div>
				<div className={`overflow-hidden ${mode === 'wide' ? '' : 'hidden'}`}>
					<h5 className='leading-6 font-semibold max-w-full'>
						{user?.name}
					</h5>
					<span className='text-[.7rem]'>{user?.email}</span>
				</div>
			</div>
            
            {/* Task Progress - Only show in wide mode */}
			{mode === 'wide' && (
                <div>
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
            )}
		</div>
	);
};

export default SidebarProfile;
