import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { setToggleActiveSidebar } from '../../store/slices/sidebarSlice';
import HamburgerBtn from './hamburgerBtn';

const mockStore = configureStore([]);
const mockOnBtnClick = jest.fn();

describe('HamburgerBtn', () => {

	let store: ReturnType<typeof mockStore>;

	beforeEach(() => {
		store = mockStore({
			activeSidebar: { isActive: false },
		});
		store.dispatch = jest.fn();
	});

	test('renders without crashing', () => {
		render(
			<Provider store={store}>
				<HamburgerBtn OnBtnClick={mockOnBtnClick} />
			</Provider>,
		);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	test('toggles sidebar state on click', () => {
		render(
			<Provider store={store}>
				<HamburgerBtn OnBtnClick={mockOnBtnClick} />
			</Provider>,
		);
		const button = screen.getByRole('button');
		fireEvent.click(button);
		expect(store.dispatch).toHaveBeenCalledWith(setToggleActiveSidebar());
		expect(mockOnBtnClick).toHaveBeenCalled();
	});

	test('applies correct class based on isActive state', () => {
		store = mockStore({
			activeSidebar: { isActive: true },
		});
		render(
			<Provider store={store}>
				<HamburgerBtn OnBtnClick={mockOnBtnClick} />
			</Provider>,
		);
		expect(screen.getByRole('button')).toHaveClass('is-active');
	});
});
