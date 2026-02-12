import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../components/ErrorPage';
import { NotFound } from '../components/errorPages';
import PrivateRoute from '../components/privateRoute';
const Projects = lazy(() => import('../layout/dashboardLayout/pages/projects'));
const Profile = lazy(() => import('../layout/dashboardLayout/pages/profile'));
const EditProfile = lazy(() => import('../layout/dashboardLayout/pages/editProfile'));
const HomeRedirect = lazy(() => import('../layout/publicLayout/HomeRedirect'));

const DashboardLayout = lazy(() => import('../layout/dashboardLayout').then(m => ({ default: m.DashboardLayout })));
const DashboardHome = lazy(() => import('../layout/dashboardLayout/pages/home'));
const ChatPage = lazy(() => import('../layout/dashboardLayout/pages/chat/index.tsx'));
const ChartsPage = lazy(() => import('../layout/dashboardLayout/pages/charts/index.tsx'));
const WidgetsPage = lazy(() => import('../layout/dashboardLayout/pages/widgets/index.tsx'));
const Login = lazy(() => import('../layout/publicLayout/AuthPages/Login'));
const SignUp = lazy(() => import('../layout/publicLayout/AuthPages/SignUp'));

const LoadingSpinner = () => (
	<div className='flex items-center justify-center min-h-screen'>
		<div className='w-8 h-8 border-4 border-purple-600 rounded-full animate-spin border-t-transparent'></div>
	</div>
);

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '',
				element: (
					<Suspense fallback={<LoadingSpinner />}>
						<HomeRedirect />
					</Suspense>
				),
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
							{
								path: 'edit-profile',
								element: (
									<Suspense fallback={<LoadingSpinner />}>
										<EditProfile />
									</Suspense>
								),
							},
							{
								path: 'charts',
								element: (
									<Suspense fallback={<LoadingSpinner />}>
										<ChartsPage />
									</Suspense>
								),
							},
							{
								path: 'widgets',
								element: (
									<Suspense fallback={<LoadingSpinner />}>
										<WidgetsPage />
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
