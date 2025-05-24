import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
	faAngular,
	faDribbble,
	faFigma,
	faInstagram,
	faLaravel,
	faReact,
} from '@fortawesome/free-brands-svg-icons';
import {
	faBell,
	faEnvelope,
	faHomeAlt,
	faMoon,
	faSearch,
	faShoppingBag,
	faStar,
} from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import Notifications from './Notifications';
import RelatedApps from './RelatedApps';
import Timeline from './Timeline';

export interface HeaderItem {
	icon: IconDefinition;
	action: string;
	num?: number;
	bg?: string;
	children?: React.ReactNode;
}

export const items: HeaderItem[] = [
	{ icon: faSearch, action: 'search' },
	{ icon: faMoon, action: 'toggleTheme' },
	{
		icon: faStar,
		num: 76,
		bg: 'bg-[#ffa7d7]',
		action: 'relatedApps',
		children: (
			<div className='absolute top-[100%] right-0 mt-2'>
				<RelatedApps />
			</div>
		),
	},
	{
		icon: faBell,
		num: 12,
		bg: 'bg-[#ffbf00]',
		action: 'notifications',
		children: (
			<div className='absolute top-[100%] right-0 mt-2'>
				<Notifications />
			</div>
		),
	},
	{ icon: faEnvelope, num: 2, bg: 'bg-[#fc2e53]', action: 'messages' },
	{
		icon: faShoppingBag,
		num: 4,
		bg: 'bg-[#0C0]',
		action: 'cart',
		children: (
			<div className='absolute top-[100%] right-0 mt-2'>
				<Timeline />
			</div>
		),
	},
];
export const notifications = [
	{
		id: uuidv4(),
		icon: '/assets/1.jpg',
		title: 'Dr sultads Send you Photo',
		time: '29 July 2020 - 02:26 PM',
	},
	{
		id: uuidv4(),
		icon: 'KG',
		title: 'Resport created successfully',
		time: '29 July 2020 - 02:26 PM',
		background: '#fbeff9',
		color: '#D653C1',
	},
	{
		id: uuidv4(),
		icon: faHomeAlt,
		title: 'Reminder : Treatment Time!',
		time: '29 July 2020 - 02:26 PM',
		background: '#d7fde2',
		color: '#09BD3C',
	},
	{
		id: uuidv4(),
		icon: '/assets/1.jpg',
		title: 'Dr sultads Send you Photo',
		time: '29 July 2020 - 02:26 PM',
	},
	{
		id: uuidv4(),
		icon: 'KG',
		title: 'Resport created successfully',
		time: '29 July 2020 - 02:26 PM',
		background: '#ffedf0',
		color: '#FC2E53',
	},
	{
		id: uuidv4(),
		icon: faHomeAlt,
		title: 'Reminder : ending developing!',
		time: '29 July 2020 - 02:26 PM',
		background: 'var(--rgba-primary-1)',
		color: 'var(--primary)',
	},
];
export const timeline = [
	{
		id: uuidv4(),
		time: '10 minutes ago',
		message: [
			'Youtube, a video-sharing website, goes live',
			<strong
				key='text-strong'
				className='text-[var(--primary)] font-bold'
			>
				$500.
			</strong>,
		],
		color: 'var(--primary)',
		boxShadow: '0_0.3125rem_0.625rem_0_var(--rgba-primary-2)',
		borderColor: 'var(--rgba-primary-1)',
	},
	{
		id: uuidv4(),
		time: '20 minutes ago',
		message: [
			'New order placed',
			<strong
				key='text-2-strong'
				className='text-[#D653C1] font-bold'
			>
				#XF-2356.
			</strong>,
			`\nQuisque a consequat ante Sit amet magna at volutapt...`,
		],
		color: '#D653C1',
		boxShadow: '0_0.3125rem_0.625rem_0_rgba(214, 83, 193, 0.2)',
		borderColor: '#fbeff9',
	},
	{
		id: uuidv4(),
		time: '30 minutes ago',
		message: [
			`john just buy your product `,
			<strong
				key='text-3-strong'
				className='text-[#FC2E53] font-bold'
			>
				Sell $250
			</strong>,
		],
		color: '#FC2E53',
		boxShadow: '0_0.3125rem_0.625rem_0_rgba(252, 46, 83, 0.2)',
		borderColor: '#ffedf0',
	},
	{
		id: uuidv4(),
		time: '15 minutes ago',
		message: 'StumbleUpon is acquired by eBay.',
		color: '#09BD3C',
		boxShadow: '0_0.3125rem_0.625rem_0_rgba(9,189, 60, 0.2)',
		borderColor: '#d7fde2',
	},
	{
		id: uuidv4(),
		time: '20 minutes ago',
		message: 'Mashable, a news website and blog, goes live.',
		color: '#FFBF00',
		boxShadow: '0_0.3125rem_0.625rem_0_rgba(255, 191, 0, 0.2)',
		borderColor: '#fff9e6',
	},
	{
		id: uuidv4(),
		time: '20 minutes ago',
		message: 'Mashable, a news website and blog, goes live.',
		color: '#312a2a',
		boxShadow: '0_0.3125rem_0.625rem_0_rgba(49,42,42,0.2)',
		borderColor: '#e2dede',
	},
];
export const relatedApps = [
	{ id: uuidv4(), name: 'Angular', image: faAngular, color: '#dd0031' },
	{ id: uuidv4(), name: 'Figma', image: faFigma, color: '#f24e1e' },
	{ id: uuidv4(), name: 'React', image: faReact, color: '#41b883' },
	{ id: uuidv4(), name: 'Dribbble', image: faDribbble, color: '#ea4c89' },
	{ id: uuidv4(), name: 'Instagram', image: faInstagram, color: '#38a1f3' },
	{ id: uuidv4(), name: 'Laravel', image: faLaravel, color: '#00c7b7' },
];
