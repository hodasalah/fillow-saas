import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { NotFound } from '../components/errorPages';
import PrivateRoute from '../components/privateRoute';
import { DashboardLayout } from '../layout/dashboardLayout';
import { DashboardHome } from '../layout/dashboardLayout/pages';
import ChatPage from '../layout/dashboardLayout/pages/chat';
import Login from '../layout/publicLayout/AuthPages/Login';
import SignUp from '../layout/publicLayout/AuthPages/SignUp';
import HomeRedirect from '../layout/publicLayout/HomeRedirect';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '',
				element: <HomeRedirect />,
			},
			{
				path: 'dashboard',
				element: <PrivateRoute />,
				children: [
					{
						path: '',
						element: <DashboardLayout />,
						children: [
							{
								index: true,
								element: <DashboardHome />,
							},
							{
								path: 'chat',
								element: <ChatPage />,
							},
						],
					},
				],
			},
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'signup',
				element: <SignUp />,
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
]);

export default router;
