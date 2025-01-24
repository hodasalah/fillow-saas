import Card from '../../../../../components/Card';
import Carousel from '../../../../../components/carousel/Carousel';
import Radial from '../../../../../components/chart/Radial';

const DognutArea = () => {
	const slides = [
		{
			title: 'Fillow Company Profile Website Project',
			text: 'Fillow is a company profile website project that I have created using HTML, CSS, and JavaScript. This project is a simple company profile website that contains a home page, about page, services page, and contact page.',
		},
		{
			title: 'Welcome to Hoda Salah new project',
			text: 'Hoda Salah is a software engineer who is passionate about web development and loves to create beautiful and functional websites. She has been working in the industry for over 5 years and has a strong background in HTML, CSS, JavaScript, and React.',
		},
		{
			title: 'Welcome to react tailwind project',
			text: 'React Tailwind is a project that I have created using React and Tailwind CSS. This project is a simple website that contains a home page, about page, services page, and contact page. The home page contains a header, a hero section, a services section, a team section, and a contact section.',
		},
	];
	return (
		<div className='w-full h-fit shadow-custom-shadow'>
			<Card>
				<div className='flex justify-between items-center p-[1.875rem]'>
					<div className='max-w-full w-[50%]'>
						<Carousel autoSlide={false}>
							{slides.map((s) => (
								<div
									className='min-w-full p-4 pl-0'
									key={s.title}
								>
									<h4 className='leading-8 text-[1.5rem] font-bold mb-4 text-black'>
										{s.title}
									</h4>
									<p className='leading-[1.8] text-black text-[0.875rem] '>
										{s.text}
									</p>
								</div>
							))}
						</Carousel>
					</div>
					<div className='flex flex-col justify-center items-center h-fit w-[50%]'>
						<Radial />
						<span className='text-center block text-lg font-bold'>
							On Progress{' '}
							<small className='text-[#20903f]'>70%</small>
						</span>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default DognutArea;
