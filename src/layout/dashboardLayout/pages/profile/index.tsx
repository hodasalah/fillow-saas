import React, { useState } from 'react';
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
	const [activeTab, setActiveTab] = useState('Profile');
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isFollowing, setIsFollowing] = useState(false);

	const sliderImages = [
		'https://source.unsplash.com/random/800x600?nature1',
		'https://source.unsplash.com/random/800x600?nature2',
		'https://source.unsplash.com/random/800x600?nature3',
		'https://source.unsplash.com/random/800x600?nature4',
		'https://source.unsplash.com/random/800x600?nature5',
		'https://source.unsplash.com/random/800x600?nature6',
	];

	const visibleSlides = 3;
	const totalSlides = Math.ceil(sliderImages.length / visibleSlides);

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
						<FeaturedStories />
						<ProjectsGallery />
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
							<FeaturedStories />
						</div>

						{/* Fourth Row - Projects Gallery (Full Width) */}
						<div>
							<ProjectsGallery />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
