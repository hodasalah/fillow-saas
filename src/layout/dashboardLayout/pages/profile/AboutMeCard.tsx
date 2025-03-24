import React from 'react';

const AboutMeCard: React.FC = () => {
	const aboutMeDetails = [
		{ label: 'Work passion', value: 'IT Section' },
		{ label: 'Email', value: 'Ninfa@gmail.com' },
		{ label: 'Contact', value: '0384 455603' },
		{ label: 'Birth of Date', value: '24 Oct' },
		{ label: 'Location', value: 'Via Partenope, 117' },
		{ label: 'Website', value: 'Ninfa_devWWW.com' },
		{ label: 'Github', value: 'Ninfa_dev' },
	];

	return (
		<div className='bg-white rounded-xl shadow-sm p-6 w-80'>
			<h2 className='text-xl font-semibold mb-4'>About Me</h2>
			<p className='text-gray-600 mb-6'>
				Hello! I am Ninfa Monaldo Devoted web designer with over five
				years of experience and a strong understanding of Adobe Creative
				Suite, HTML5, CSS3 and Java.
			</p>
			<div className='space-y-3'>
				{aboutMeDetails.map((item, index) => (
					<div
						key={index}
						className='flex justify-between'
					>
						<span className='text-gray-500'>{item.label}</span>
						<span className='text-gray-800'>{item.value}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default AboutMeCard;
