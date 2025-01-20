import Dashboard from './layout/dashboard';
import Loading from './components/Loading';


{
	/* <FontAwesomeIcon icon={faHouse} />
			<FontAwesomeIcon icon={faMouse} />
			<FontAwesomeIcon icon={faCat} />
			<FontAwesomeIcon icon={faDog} />
			<FontAwesomeIcon icon={faStar} />
			<FontAwesomeIcon icon={faHome} /> */
}
const App = () => {
	return (
		<div className='overflow-hidden  transition-all duration-300 ease-in'>
			<Loading />
			<Dashboard />
		</div>
	);
};
export default App;
