//import { faHouse } from '@fortawesome/free-solid-svg-icons';
import Barchart from './components/chart/Barchart';
import EmailChart from './components/chart/EmailChart';
import LineChart from './components/chart/LineChart';
import NewCustomerLineChart from './components/chart/NewCustomerLineChart';
import Radial from './components/chart/Radial';
import StackedBarChart from './components/chart/StackedBarChart';
import HamburgerBtn from './components/hamburger/hamburgerBtn';
import Logo from './components/logo/logo';

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
			{/* nav-header here */}

			<div className='nav-header fixed inline-block transition-all top-0  h-[--dz-header-height]  w-[--dz-sidebar-width] bg-nav-headbg z-40'>
				<div className='brand-logo'>
					<svg
						className='logo-abbr'
						width='55'
						height='55'
						viewBox='0 0 55 55'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							fill-rule='evenodd'
							clip-rule='evenodd'
							d='M27.5 0C12.3122 0 0 12.3122 0 27.5C0 42.6878 12.3122 55 27.5 55C42.6878 55 55 42.6878 55 27.5C55 12.3122 42.6878 0 27.5 0ZM28.0092 46H19L19.0001 34.9784L19 27.5803V24.4779C19 14.3752 24.0922 10 35.3733 10V17.5571C29.8894 17.5571 28.0092 19.4663 28.0092 24.4779V27.5803H36V34.9784H28.0092V46Z'
							fill='url(#paint0_linear)'
						></path>
						<defs></defs>
					</svg>{' '}
					<div className='brand-title'>
						<Logo />
					</div>
				</div>
				<HamburgerBtn />
			</div>
			{/* start header here */}
			<div className='overflow-hidden fixed h-[--dz-header-height] pl-[--dz-sidebar-width] bg-headerbg border-b-[1px] border-[--border] transition-all ease-in duration-300 w-full z-1'>
				<h2 className='text-white'>header</h2>
			</div>
			{/* sidebar here */}
			<div className='w-[--dz-sidebar-width] h-[calc(100vh-4.5rem)] fixed top-[--dz-header-height] bg-sidebar-bg pt-0 border-r-[1px] border-[--border]  transition-all ease-in-out duration-300 shadow-[0rem_0.9375rem_1.875rem_0rem_rgba(0,0,0,0.1)]'>
				sidebar
			</div>

			{/* body-content here */}
			<div className='overflow-hidden pl-[--dz-sidebar-width] bg-body-bg text-[0.875rem]  min-h-[calc(100vh-7.7rem)]  pt-[--dz-header-height]'>
				<Barchart />
				DASHBOARD
				<LineChart />
				<StackedBarChart />
				<NewCustomerLineChart />
				<Radial />
				<EmailChart />
			</div>

			{/* end body-content here */}
			{/* footer here */}
			<div className='overflow-hidden pl-[--dz-sidebar-width] bg-[--card] text-[0.875rem] bg-slate-500 h-[3.2rem]'>
				footer
			</div>
		</div>
	);
};

export default App;
