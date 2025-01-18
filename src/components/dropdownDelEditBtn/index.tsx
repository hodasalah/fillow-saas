import {useEffect, useRef, useState} from 'react'
import DropdownMenuIcon from '../svgs/DropdownMenuIcon';


interface Link {
  id: string;
  name: string;
}

interface DropdownDelEditProps {
  links: Link[];
}

const DropdownDelEditBtn = ({links}: DropdownDelEditProps) => {
  	const [showDropdown, setShowDropdown] = useState(false);
    const dropdownMenuRef = useRef<HTMLDivElement>(null);

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


  return (
		<div
			className='dropdown ms-2 relative'
			ref={dropdownMenuRef}
		>
			<div
				className='cursor-pointer'
				onClick={ToggleMenu}
			>
				<DropdownMenuIcon />
			</div>
			<div
				className={`border-0 z-10 overflow-hidden rounded-xl shadow-[0 0 3.125rem 0 rgba(82, 63, 105, 0.15)] bg-white min-w-40 py-2 px-0 text-[#9da1a5]  text-left ${
					showDropdown
						? 'block absolute right-auto bottom-auto left-0 top-0 m-0 translate3d'
						: 'hidden'
				} `}
			>
				<ul className=''>
					{links.map((link) => (
						<li
							key={link.id}
							className='block w-full font-normal text-[#9da1a5] text-base py-2 px-7 active:text-[var(--primary)] active:bg-[var(--rgba-primary-1)] hover:text-[var(--primary)] hover:bg-[var(--rgba-primary-1)]'
						>
							{link.name}
						</li>
					))}
				</ul>
			</div>
		</div>
  );
}

export default DropdownDelEditBtn;