import HeaderContent from './headerContent/index';

const Header = () => {
	return (
		<div className='overflow-hidden fixed h-[--dz-header-height] pl-[--dz-sidebar-width] bg-headerbg border-b-[1px] border-[--border] transition-all ease-in duration-300 w-full z-1'>
			<HeaderContent />
		</div>
	);
};

export default Header;
