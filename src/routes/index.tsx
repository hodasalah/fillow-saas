import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { NotFound } from '../components/errorPages';
import { Profile, Projects } from '../layout/dashboardLayout/pages';
import HomeRedirect from '../layout/publicLayout/HomeRedirect';

// Lazy load components
const DashboardLayout = lazy(() =>
	import('../layout/dashboardLayout').then((module) => ({
		default: module.DashboardLayout,
	})),
);
const DashboardHome = lazy(() =>
	import('../layout/dashboardLayout/pages/home').then((module) => ({
		default: module.default,
	})),
);
const ChatPage = lazy(() => import('../layout/dashboardLayout/pages/chat'));
const Login = lazy(() => import('../layout/publicLayout/AuthPages/Login'));
const SignUp = lazy(() => import('../layout/publicLayout/AuthPages/SignUp'));

// Loading component
const LoadingSpinner = () => (
	<div className='flex items-center justify-center min-h-screen'>
		<div className='w-8 h-8 border-4 border-purple-600 rounded-full animate-spin border-t-transparent'></div>
	</div>
);

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
						element: (
							<Suspense fallback={<LoadingSpinner />}>
								<DashboardLayout />
							</Suspense>
						),
						children: [
							{
								index: true,
								element: (
									<Suspense fallback={<LoadingSpinner />}>
										<DashboardHome />
									</Suspense>
								),
							},
							{
								path: 'chat',
								element: (
									<Suspense fallback={<LoadingSpinner />}>
										<ChatPage />
									</Suspense>
								),
							},
							{
								path: 'projects',
								element: (
									<Suspense fallback={<LoadingSpinner />}>
										<Projects />
									</Suspense>
								),
							},
							{
								path: 'profile',
								element: (
									<Suspense fallback={<LoadingSpinner />}>
										<Profile />
									</Suspense>
								),
							},
						],
					},
				],
			},
			{
				path: 'login',
				element: (
					<Suspense fallback={<LoadingSpinner />}>
						<Login />
					</Suspense>
				),
			},
			{
				path: 'signup',
				element: (
					<Suspense fallback={<LoadingSpinner />}>
						<SignUp />
					</Suspense>
				),
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
]);

export default router;
