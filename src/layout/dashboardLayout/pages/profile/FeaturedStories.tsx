import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const FeaturedStories: React.FC = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const stories = [
		'https://source.unsplash.com/random/800x600?nature1',
		'https://source.unsplash.com/random/800x600?nature2',
		'https://source.unsplash.com/random/800x600?nature3',
		'https://source.unsplash.com/random/800x600?nature4',
		'https://source.unsplash.com/random/800x600?nature5',
		'https://source.unsplash.com/random/800x600?nature6',
		'https://source.unsplash.com/random/800x600?nature7',
		'https://source.unsplash.com/random/800x600?nature8',
	];

	const slidesCount = Math.ceil(stories.length / 4);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev < slidesCount - 1 ? prev + 1 : 0));
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slidesCount - 1));
	};

	return (
		<div className='relative px-8 py-6 bg-white rounded-xl shadow-lg'>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-2xl font-bold text-gray-800'>
					Featured Stories
				</h2>
				<div className='flex space-x-4'>
					<button
						onClick={prevSlide}
						className='p-2 rounded-full bg-gray-100 hover:bg-gray-200'
					>
						<FontAwesomeIcon
							icon={faChevronLeft}
							className='w-4 h-4'
						/>
					</button>
					<button
						onClick={nextSlide}
						className='p-2 rounded-full bg-gray-100 hover:bg-gray-200'
					>
						<FontAwesomeIcon
							icon={faChevronRight}
							className='w-4 h-4'
						/>
					</button>
				</div>
			</div>

			<div className='overflow-hidden'>
				<div
					className='flex transition-transform duration-300'
					style={{ transform: `translateX(-${currentSlide * 100}%)` }}
				>
					{Array.from({ length: slidesCount }).map(
						(_, slideIndex) => (
							<div
								key={slideIndex}
								className='w-full flex-shrink-0 grid grid-cols-4 gap-4'
							>
								{stories
									.slice(slideIndex * 4, slideIndex * 4 + 4)
									.map((img, index) => (
										<div
											key={index}
											className='relative group overflow-hidden rounded-xl aspect-square'
										>
											<img
												src={img}
												alt={`Story ${
													slideIndex * 4 + index + 1
												}`}
												className='w-full h-full object-cover transform group-hover:scale-105 transition-all duration-300'
											/>
											<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
											<div className='absolute bottom-0 left-0 p-4 text-white'>
												<h3 className='font-semibold text-lg'>
													Story Title
												</h3>
												<p className='text-sm'>
													Author Name
												</p>
											</div>
										</div>
									))}
							</div>
						),
					)}
				</div>
			</div>

			<div className='flex justify-center mt-4 space-x-2'>
				{Array.from({ length: slidesCount }).map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentSlide(index)}
						className={`w-3 h-3 rounded-full ${
							currentSlide === index
								? 'bg-gray-800'
								: 'bg-gray-300'
						}`}
					/>
				))}
			</div>
		</div>
	);
};

export default FeaturedStories;
