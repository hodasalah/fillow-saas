import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { db } from '../../firebase';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setUser } from '../../store/slices/authSlice';
import { setChatboxOpen } from '../../store/slices/sidebarSlice';
import { makeSerializable } from '../../utils/dateUtils';
import { syncUserProfile } from '../../utils/profilePicture';
import Chatbox from './mainParts/chatbox';
import Footer from './mainParts/footer';
import Header from './mainParts/header';
import NavHeader from './mainParts/navHeader';
import Sidebar from './mainParts/sidebar';

export const DashboardLayout = () => {
	// Theme
	const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
	const isChatboxOpen = useAppSelector((state) => state.sidebar.isChatboxOpen);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [ isDarkMode ]);

	const currentUser = useAppSelector((state) => state.auth.currentUser);

	// Global Profile Sync and Listener
	useEffect(() => {
		if (!currentUser) return;

		// 1. Initial Sync
		syncUserProfile(currentUser.uid, dispatch);

		// 2. Real-time Listener
		const userRef = doc(db, 'userProfiles', currentUser.uid);
		const unsubscribe = onSnapshot(userRef, (docSnap) => {
			if (docSnap.exists()) {
				const data = docSnap.data() as any;

				// Convert timestamps for Redux serialization
				const serializedData = {
					...data,
					name: data.displayName || currentUser.name,
					profilePicture: data.profilePictureBase64 || currentUser.profilePicture,
					updatedAt: data.updatedAt?.toMillis ? data.updatedAt.toMillis() : Date.now(),
					createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : (currentUser.createdAt || Date.now()),
					lastSeen: data.lastSeen?.toMillis ? data.lastSeen.toMillis() : null,
					location: data.location || currentUser.location,
				};

				// Always dispatch latest data to ensure state is fresh
				// Redux Toolkit will handle shallow equality for the state update
				dispatch(setUser(makeSerializable({
					...currentUser,
					...serializedData,
					name: serializedData.name, // Ensure explicit mapping
					profilePicture: serializedData.profilePicture
				})));
			}
		});

		return () => unsubscribe();
	}, [ currentUser?.uid, dispatch ]);


	return (
		<div className="h-screen overflow-hidden flex flex-col bg-[var(--body-bg)]">
			{/* Main layout wrapper */}
			<div className="flex flex-1 overflow-hidden">
				{/* NavHeader - fixed positioned */}
				<NavHeader />

				{/* Sidebar - fixed positioned */}
				<Sidebar />

				{/* Main content column */}
				<div
					data-action='main-content'
					className="flex flex-col flex-1"
				>
					{/* Header - fixed positioned */}
					<Header setShowSlider={(val: boolean) => dispatch(setChatboxOpen(val))} />

					{/* Scrollable content area - ONLY this scrolls */}
					<div className="flex-1 overflow-y-auto">
						<div className="container-fluid">
							<Outlet />
						</div>
					</div>

					{/* Footer - always visible at bottom */}
					<Footer />
				</div>
			</div>

			{/* Chat Box */}
			<Chatbox
				setShowSlider={(val: boolean) => dispatch(setChatboxOpen(val))}
				showSlider={isChatboxOpen}
			/>
		</div>
	);
};
