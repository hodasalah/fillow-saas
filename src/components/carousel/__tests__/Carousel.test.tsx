import { act, fireEvent, render } from '@testing-library/react';import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import Carousel from '../Carousel';
import '@testing-library/jest-dom';

import { describe } from 'vitest'

describe('Carousel', () => {
	const mockSlides = [
		<div key='1'>Slide 1</div>,
		<div key='2'>Slide 2</div>,
		<div key='3'>Slide 3</div>,
	];

	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('renders all slides and navigation elements', () => {
		const { container, getAllByRole } = render(
			<Carousel>{mockSlides}</Carousel>,
		);

		expect(container.querySelector('.flex')).toBeInTheDocument();
		expect(getAllByRole('button')).toHaveLength(2);
		expect(container.querySelectorAll('.rounded-full')).toHaveLength(
			mockSlides.length,
		);
	});

	it('moves to next slide when right arrow button is clicked', () => {
		const { container } = render(<Carousel>{mockSlides}</Carousel>);

		const rightButton = container.querySelectorAll('button')[1];
		fireEvent.click(rightButton);

		expect((container.querySelector('.flex') as HTMLElement)?.style.transform).toBe(
			'translateX(-100%)',
		);
	});

	it('moves to previous slide when left arrow button is clicked', () => {
		const { container } = render(<Carousel>{mockSlides}</Carousel>);

		const leftButton = container.querySelectorAll('button')[0];
		fireEvent.click(leftButton);

		expect((container.querySelector('.flex') as HTMLElement)?.style.transform).toBe(
			'translateX(-200%)',
		);
	});

	it('autoslides when autoSlide prop is true', () => {
		const { container } = render(
			<Carousel
				autoSlide
				autoSlideInterval={3000}
			>
				{mockSlides}
			</Carousel>,
		);

		act(() => {
			vi.advanceTimersByTime(3000);
		});

		expect((container.querySelector('.flex') as HTMLElement)?.style.transform).toBe(
			'translateX(-100%)',
		);
	});

	it('responds to keyboard arrow keys', () => {
		const { container } = render(<Carousel>{mockSlides}</Carousel>);

		fireEvent.keyDown(window, { key: 'ArrowRight' });
		expect((container.querySelector('.flex') as HTMLElement)?.style.transform).toBe(
			'translateX(-100%)',
		);

		fireEvent.keyDown(window, { key: 'ArrowLeft' });
		expect((container.querySelector('.flex') as HTMLElement)?.style.transform).toBe(
			'translateX(0%)',
		);
	});

	it('wraps around to first slide when clicking next on last slide', () => {
		const { container } = render(<Carousel>{mockSlides}</Carousel>);

		const rightButton = container.querySelectorAll('button')[1];
		fireEvent.click(rightButton);
		fireEvent.click(rightButton);
		fireEvent.click(rightButton);

		expect((container.querySelector('.flex') as HTMLElement)?.style.transform).toBe(
			'translateX(0%)',
		);
	});

	it('stops autoslide when component unmounts', () => {
		const { unmount } = render(
			<Carousel
				autoSlide
				autoSlideInterval={3000}
			>
				{mockSlides}
			</Carousel>,
		);

		const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
		unmount();

		expect(clearIntervalSpy).toHaveBeenCalled();
	});
});
