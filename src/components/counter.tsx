import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import {
	decrement,
	increment,
	incrementByAmount,
} from '../store/slices/counterSlice';
import type { RootState } from '../store/store';

export function Counter() {
	const [number, setNumber] = useState(0);
	const count = useAppSelector((state: RootState) => state.counter.value);
	const dispatch = useAppDispatch();

	return (
		<div>
			<div>
				<button
					aria-label='Increment value'
					onClick={() => dispatch(increment())}
				>
					Increment
				</button>
				<span>{count}</span>
				<button
					aria-label='Decrement value'
					onClick={() => dispatch(decrement())}
				>
					Decrement
				</button>
			</div>
			<input
				type='number'
				onChange={(e) => setNumber(Number(e.target.value))}
			/>
			<button onClick={() => dispatch(incrementByAmount(number))}>
				Increment by {number}
			</button>
		</div>
	);
}
