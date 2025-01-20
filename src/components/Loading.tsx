import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loading = () => {
	const isLoading = useSelector(
		(state: RootState) => state.loading.isLoading,
	);

	if (!isLoading) return null;

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-white/80 z-50'>
			<FontAwesomeIcon
				icon={faSpinner}
				className='text-[var(--primary)] text-4xl animate-spin'
			/>
		</div>
	);
};

export default Loading;
