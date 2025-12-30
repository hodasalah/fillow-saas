import {
    faGear,
    faRightFromBracket,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { logoutUser } from '../../store/slices/authActions';

const links = [
	{
		id: uuidv4(),
		icon: faUser,
		iconColor: 'text-[var(--primary)]',
		name: 'Profile',
		link: '/profile',
	},
	{
		id: uuidv4(),
		icon: faGear,
		iconColor: 'text-green-500',
		name: 'Settings',
		link: '/settings',
	},
	{
		id: uuidv4(),
		icon: faRightFromBracket,
		iconColor: 'text-red-500',
		name: 'Logout',
	},
];
const ProfileDropdown = () => {
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownMenuRef = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.auth.currentUser);
	const navigate = useNavigate();

	useEffect(() => {
		const closeMenu = (e: MouseEvent) => {
			if (
				showDropdown &&
				dropdownMenuRef?.current &&
				!(dropdownMenuRef.current as HTMLElement).contains(
					e.target as Node,
				)
			) {
				setShowDropdown(false);
			}
		};
		document.addEventListener('mousedown', closeMenu);
		return () => {
			document.removeEventListener('mousedown', closeMenu);
		};
	}, [showDropdown]);

	const ToggleMenu = () => {
		setShowDropdown((prevState) => !prevState);
	};
	const handleLogout = () => {
		dispatch(logoutUser());
		navigate('/login');
	};
	return (
		<div
			className='w-full relative'
			onClick={ToggleMenu}
			ref={dropdownMenuRef}
		>
			<div className='flex items-center w-full h-full relative gap-3 cursor-pointer group px-2 py-1 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'>
				<div className="flex flex-col items-end hidden sm:flex">
					<span className="text-[var(--text-dark)] font-bold text-sm leading-tight group-hover:text-[var(--primary)] transition-colors">{user?.name}</span>
					<span className="text-[var(--text-gray)] text-[10px] leading-tight font-medium opacity-70">Administrator</span>
				</div>
				<div className="relative">
					<img
						src={user?.profilePicture}
						alt='profile'
						className='w-[2.5rem] h-[2.5rem] rounded-full object-cover border-2 border-[var(--primary)] group-hover:scale-105 transition-transform'
						onError={(e) => {
							(e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=886cc0&color=fff`;
						}}
					/>
					<div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
				</div>
			</div>
			<div
				className={`border-0 z-10 overflow-hidden rounded-xl shadow-[0_0_3.125rem_0_rgba(82,63,105,0.15)] bg-white min-w-40 py-2 px-0 text-[#9da1a5]  text-left ${
					showDropdown
						? 'block absolute left-auto  right-0 top-1/2 m-0 translate3d'
						: 'hidden'
				} `}
			>
				<ul className='w-full'>
					{links.map((link) => (
						<li
							key={link.id}
							className='block w-full font-normal text-[#9da1a5] text-base py-2 px-7 active:text-[var(--primary)] active:bg-[var(--rgba-primary-1)] hover:text-[var(--primary)] hover:bg-[var(--rgba-primary-1)] cursor-pointer'
						>
							<FontAwesomeIcon
								icon={link.icon}
								className={`${link.iconColor} pr-2`}
							/>{' '}
							{link.link ? (
								<Link to={link.link}>{link.name}</Link>
							) : (
								<span onClick={handleLogout}>{link.name}</span>
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ProfileDropdown;
