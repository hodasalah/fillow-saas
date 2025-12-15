import React from 'react';
import { useAppSelector } from '../../../../hooks/hooks';
import AboutMeCard from './AboutMeCard';
import ActivitiesCard from './ActivitiesCard';
import FeaturedPostCard from './FeaturedPostCard';
import FeaturedStories from './FeaturedStories';
import ProfileCard from './ProfileCard';
import ProjectsGallery from './ProjectsGallery';
import TeamCard from './TeamCard';

const Profile: React.FC = () => {
	const mode = useAppSelector((state) => state.sidebar.mode);
	const isMobileView = useAppSelector((state) => state.sidebar.isMobileView);
	// Removed unused state variables: activeTab, currentSlide, isFollowing

	const sliderImages = [
		'https://source.unsplash.com/random/800x600?nature1',
		'https://source.unsplash.com/random/800x600?nature2',
		'https://source.unsplash.com/random/800x600?nature3',
		'https://source.unsplash.com/random/800x600?nature4',
		'https://source.unsplash.com/random/800x600?nature5',
		'https://source.unsplash.com/random/800x600?nature6',
	];

	const projects = [
		{ id: '1', title: 'Modern UI', imageUrl: 'https://via.placeholder.com/600x400?text=Modern+UI' },
		{ id: '2', title: 'E-Commerce', imageUrl: 'https://via.placeholder.com/600x400?text=E-Commerce' },
		{ id: '3', title: 'Dashboard', imageUrl: 'https://via.placeholder.com/600x400?text=Dashboard' },
		{ id: '4', title: 'Mobile App', imageUrl: 'https://via.placeholder.com/600x400?text=Mobile+App' },
		{ id: '5', title: 'Landing Page', imageUrl: 'https://via.placeholder.com/600x400?text=Landing+Page' },
	];

	return (
		<div
			className={`
        ${
			isMobileView
				? 'px-3'
				: mode === 'wide'
				? 'pl-[var(--dz-sidebar-width)]'
				: 'pl-[var(--dz-sidebar-width-mobile)]'
		} w-full bg-body-bg text-[0.875rem] min-h-[calc(100vh-5.3rem)]  pt-[--dz-header-height]`}
		>
			<div className='container mx-auto w-full p-6'>
				<div className='w-full grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-6'>
					{/* Left Column - Desktop */}
					<div className='hidden lg:block space-y-6'>
						<ActivitiesCard />
						<TeamCard />
						<FeaturedPostCard />
					</div>

					{/* Middle Column - Desktop */}
					<div className='hidden lg:block space-y-6'>
						<FeaturedStories stories={sliderImages} />
						<ProjectsGallery projects={projects} />
					</div>

					{/* Right Column - Desktop */}
					<div className='hidden lg:block space-y-6'>
						<ProfileCard />
						<AboutMeCard />
					</div>

					{/* Mobile/Tablet Layout */}
					<div className='lg:hidden space-y-6'>
						{/* First Row - Activities (Full Width) */}
						<div>
							<ActivitiesCard />
						</div>

						{/* Second Row - Profile & About Me */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<ProfileCard />
							<AboutMeCard />
						</div>

						{/* Third Row - Team & Featured Post */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<TeamCard />
							<FeaturedPostCard />
						</div>
						{/* Third Row - Featured Stories (Full Width) */}
						<div>
							<FeaturedStories stories={sliderImages} />
						</div>

						{/* Fourth Row - Projects Gallery (Full Width) */}
						<div>
							<ProjectsGallery projects={projects} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
