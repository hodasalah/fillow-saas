import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Loading from './components/Loading';
import Dashboard from './layout/dashboard';

{
	/* <FontAwesomeIcon icon={faHouse} />
			<FontAwesomeIcon icon={faMouse} />
			<FontAwesomeIcon icon={faCat} />
			<FontAwesomeIcon icon={faDog} />
			<FontAwesomeIcon icon={faStar} />
			<FontAwesomeIcon icon={faHome} /> */
}
const App = () => {
	const login = true;
	const navigate = useNavigate();
	
	useEffect(() => {
		if (login) {
			navigate('/dashboard');
		} else {
			console.log('not login');
		}
	}, [login]);

	return (
		<div className='overflow-hidden  transition-all duration-300 ease-in'>
			<Loading />
			<Dashboard />
		</div>
	);
};
export default App;
