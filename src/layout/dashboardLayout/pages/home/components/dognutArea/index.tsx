import Card from '../../../../../../components/card';
import Carousel from '../../../../../../components/carousel/Carousel';
import Radial from '../../../../../../components/chart/Radial';

const DognutArea = () => {
	const slides = [
		{
			title: 'Dashora Company Profile Website Project',
			text: 'Dashora is a company profile website project that I have created using HTML, CSS, and JavaScript. This project is a simple company profile website that contains a home page, about page, services page, and contact page.',
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
				<div className='max-w-full flex justify-between items-center p-[1.875rem] flex-wrap'>
					<div className='w-full xl:w-[50%] lg:w-[100%] md:w-[100%]'>
						<div className=' max-w-full'>
							<Carousel autoSlide={false}>
								{slides.map((s) => (
									<div
										className='min-w-full p-4 pl-4'
										key={s.title}
									>
										<h4 className='max-w-full leading-8 text-[1.5rem] font-bold mb-4 text-black dark:text-secondary  text-wrap'>
											{s.title}
										</h4>
										<p className='max-w-full leading-[1.8] text-black dark:text-white text-[0.875rem] text-wrap'>
											{s.text}
										</p>
									</div>
								))}
							</Carousel>
						</div>
					</div>

					<div className='flex flex-col justify-center items-center h-fit  w-[100%] xl:w-[50%] lg:w-[100%] md:w-[100%]  '>
						<Radial />
						<span className='text-center block text-lg font-bold'>
							On Progress{' '}
							<small className='text-[#20903f] dark:text-secondary'>70%</small>
						</span>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default DognutArea;
