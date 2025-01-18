import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';
import CarouselButton from './CarouselButton';

interface CarouselProps {
	children: React.ReactNode[];
	autoSlide?: boolean;
	autoSlideInterval?: number;
}

const Carousel = ({
	children: slides,
	autoSlide = false,
	autoSlideInterval = 3000,
}: CarouselProps) => {
	const [curr, setCurr] = useState(0);

	const prev = () =>
		setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

	const next = useCallback(() => {
		setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
	}, [slides.length]);

	useEffect(() => {
		if (!autoSlide) return;
		const slideInterval = setInterval(next, autoSlideInterval);
		return () => clearInterval(slideInterval);
	}, [autoSlide, autoSlideInterval, next]);
	//Add Keyboard Navigation Implement keyboard arrow key support for better accessibility:

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') prev();
			if (e.key === 'ArrowRight') next();
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<div className='overflow-hidden relative w-full'>
			<div
				className='flex transition-transform ease-out duration-500'
				style={{ transform: `translateX(-${curr * 100}%)` }}
			>
				{slides}
			</div>
			<div className='flex items-center gap-6 pb-2'>
				<CarouselButton
					onClick={prev}
					icon={faArrowLeft}
				/>
				<CarouselButton
					onClick={next}
					icon={faArrowRight}
				/>
			</div>
			<div className='absolute bottom-4 right-0 left-0'>
				<div className='flex items-center justify-center gap-2'>
					{slides.map((s, i: number) => (
						<div
							key={i}
							className={`transition-all w-1.5 h-1.5 bg-white rounded-full  ${
								curr === i ? 'p-0.5' : 'bg-opacity-50'
							}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Carousel;
