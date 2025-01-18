import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface CarouselButtonProps {
	onClick: () => void;
	icon: IconProp;
}

const CarouselButton = ({ onClick, icon }: CarouselButtonProps) => (
	<button
		onClick={onClick}
		className='w-[2.3125rem] h-[2.3125rem] leading-[2.3125rem] rounded-full text-center shadow bg-[#d7d7d7] hover:bg-slate-600 text-white'
	>
		<FontAwesomeIcon icon={icon} />
	</button>
);
export default CarouselButton;
