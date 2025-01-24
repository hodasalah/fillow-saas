import MetisMenu from '@metismenu/react';
import MenuItem from './MenuItem';
import '/node_modules/metismenujs/dist/metismenujs.css';

// import MetisMenu css
const list = [
	{
		icon: 'faHome',
		name: 'Dashboard',
		link: '/dashboard',
		hasSubMenu: true,
		submenu: [
			'Dashboard',
			'Project',
			'Contacts',
			'Kanban',
			'Calendar',
			'Messages',
		],
	},
	{
		icon: 'faChart',
		name: 'CMS',
		link: '/cms',
		hasSubMenu: true,
		submenu: [
			'Content',
			'Add Content',
			'Menus',
			'Email Template',
			'Add Email',
			'Blog',
			'Add Blog',
			'Blog Category',
		],
	},
	{
		icon: 'faChart',
		name: 'Apps',
		link: '/apps',
		hasSubMenu: true,
		submenu: [
			'Profile',
			'Edit Profile',
			'Post Details',
			'Email',
			'Calendar',
			'Shop',
		],
	},
	{
		icon: 'faChart',
		name: 'Charts',
		link: '/charts',
		hasSubMenu: true,
		submenu: [
			'Flot',
			'Morris',
			'Chartjs',
			'Chartist',
			'Sparkline',
			'Peity',
		],
	},
	{
		icon: 'faChart',
		name: 'Bootstrap',
		link: '/bootstrap',
		hasSubMenu: true,
		submenu: [
			'Flot',
			'Morris',
			'Chartjs',
			'Chartist',
			'Sparkline',
			'Peity',
		],
	},
	{
		icon: 'faChart',
		name: 'Plugins',
		link: '/plugins',
		hasSubMenu: true,
		submenu: [
			'Flot',
			'Morris',
			'Chartjs',
			'Chartist',
			'Sparkline',
			'Peity',
		],
	},
	{
		icon: 'faChart',
		name: 'Widget',
		link: '/widget',
		hasSubMenu: false,
	},
	{
		icon: 'faChart',
		name: 'Forms',
		link: '/forms',
		hasSubMenu: true,
		submenu: [
			'Flot',
			'Morris',
			'Chartjs',
			'Chartist',
			'Sparkline',
			'Peity',
		],
	},
	{
		icon: 'faChart',
		name: 'Pages',
		link: '/pages',
		hasSubMenu: true,
		submenu: [
			'Flot',
			'Morris',
			'Chartjs',
			'Chartist',
			'Sparkline',
			'Peity',
		],
	},
];

const MenuList = () => {
	return (
		<MetisMenu className='metismenu flex flex-col pt-[0.9375rem]' >
			{list.map((item) => (
				<MenuItem
					key={item.name}
					item={item}
				/>
			))}
		</MetisMenu>
	);
};

export default MenuList;
