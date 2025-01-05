//import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import Dashboard from './layout/dashboard';
import { useAppDispatch,useAppSelector} from './hooks/hooks';
import {  setActiveSidebar,setNotActiveSidebar } from './store/slices/sidebarSlice';
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
			<Dashboard />
		</div>
	);
};
export default App;
