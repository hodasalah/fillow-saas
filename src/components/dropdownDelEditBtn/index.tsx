import { useEffect, useRef, useState } from 'react';
import DropdownMenuIcon from '../svgs/DropdownMenuIcon';

interface Link {
	id: string;
	name: string;
}

interface DropdownDelEditProps {
	links: Link[];
	onEditBtn: (id: string) => void;
	onDeleteBtn: (id: string) => void;
}

const DropdownDelEditBtn = ({
	links,
	onEditBtn,
	onDeleteBtn,
}: DropdownDelEditProps) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownMenuRef = useRef<HTMLDivElement>(null);

	// Close the dropdown when clicking outside of it
	useEffect(() => {
		const closeMenu = (e: MouseEvent) => {
			if (
				showDropdown &&
				dropdownMenuRef.current &&
				!dropdownMenuRef.current.contains(e.target as Node)
			) {
				setShowDropdown(false);
			}
		};
		document.addEventListener('mousedown', closeMenu);
		return () => {
			document.removeEventListener('mousedown', closeMenu);
		};
	}, [showDropdown]);

	// Toggle the dropdown menu
	const toggleMenu = () => {
		setShowDropdown((prevState) => !prevState);
	};

	return (
		<div
			className='ms-2 relative'
			ref={dropdownMenuRef}
		>
			<div
				className='cursor-pointer'
				onClick={toggleMenu}
			>
				<DropdownMenuIcon />
			</div>
			<div
				className={`border-0 z-10 overflow-hidden rounded-xl shadow-[0_0_3.125rem_0_rgba(82,63,105,0.15)] bg-white min-w-40 py-2 px-0 text-[#9da1a5] text-left ${
					showDropdown ? 'block absolute right-0 top-0' : 'hidden'
				}`}
			>
				<ul className='w-full'>
					{links.map((link) => (
						<li
							key={link.id}
							className='py-2 px-7'
						>
							{link.name === 'Edit' && (
								<button
									onClick={() => {
										onEditBtn(link.id);
										setShowDropdown(false);
									}}
									className='block w-full text-left text-base text-[#9da1a5] hover:text-[var(--primary)] hover:bg-[var(--rgba-primary-1)]'
								>
									{link.name}
								</button>
							)}
							{link.name === 'Delete' && (
								<button
									onClick={() => {
										onDeleteBtn(link.id);
										setShowDropdown(false);
									}}
									className='block w-full text-left text-base text-[#9da1a5] hover:text-red-500 hover:bg-[var(--rgba-danger-1)] mt-1'
								>
									{link.name}
								</button>
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default DropdownDelEditBtn;
