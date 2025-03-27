import { Outlet } from 'react-router';
import Loading from './components/Loading';
import { useAppSelector } from './hooks/hooks';
import AuthListener from './ِAuthListener';

const App = () => {
	const { isLoading } = useAppSelector((state) => state.loading);

	return (
		<>
			<AuthListener />
			{isLoading  && <Loading />}
			{!isLoading && <Outlet />}
		</>
	);
};

export default App;
