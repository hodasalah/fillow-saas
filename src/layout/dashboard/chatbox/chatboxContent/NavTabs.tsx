import React from 'react';

const NavTabs = () => {
	const [activeTab, setActiveTab] = React.useState(false);
	return (
		<ul
			className={`px-4 pt-4 pb-0 bg-[var(--rgba-primary-2)] flex justify-between`}
		>
			<li
				className={`border-b-[0.1875rem] rounded-none ${
					activeTab ? 'border-primary' : 'border-transparent'
				}`}
			>
				<span
					className={`block text-primary opacity-70 uppercase font-medium px-4 py-2`}
				>
					Notes
				</span>
			</li>

			<li
				className={`border-b-[0.1875rem] rounded-none ${
					activeTab ? 'border-primary' : 'border-transparent'
				}`}
			>
				<span
					className={`block text-primary opacity-70 uppercase font-medium px-4 py-2`}
				>
					Notes
				</span>
			</li>

			<li
				className={`border-b-[0.1875rem] rounded-none ${
					activeTab ? 'border-primary' : 'border-transparent'
				}`}
			>
				<span
					className={`block text-primary opacity-70 uppercase font-medium px-4 py-2`}
				>
					Notes
				</span>
			</li>
		</ul>
	);
};

export default NavTabs;
