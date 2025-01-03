import BodyContent from './body';
import Footer from './footer';
import Header from './header';
import NavHeader from './navHeader';
import Sidebar from './sidebar';

const Dashboard = () => {
	return (
		<>
			{/* nav-header here */}
			<NavHeader />
			{/* start header here */}
			<Header />
			{/* sidebar here */}
			<Sidebar />

			{/* body-content here */}
			<BodyContent />
			{/* end body-content here */}
			{/* footer here */}
			<Footer />
		</>
	);
};

export default Dashboard;
