import {
	faAngular,
	faDribbble,
	faFigma,
	faInstagram,
	faLaravel,
	faReact,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '../../../../components/Card';

const relatedApps = [
	{
		name: 'Angular',
		image: faAngular,
		color: '#dd0031',
	},
	{
		name: 'Figma',
		image: faFigma,
		color: '#f24e1e',
	},
	{
		name: 'React',
		image: faReact,
		color: '#41b883',
	},
	{
		name: 'Dribbble',
		image: faDribbble,
		color: '#ea4c89',
	},
	{
		name: 'Instagram',
		image: faInstagram,
		color: '#38a1f3',
	},
	{
		name: 'Laravel',
		image: faLaravel,
		color: '#00c7b7',
	},
];
const RelatedApps = () => {
	return (
		<Card>
			<div className='flex flex-col w-[17rem] p-4'>
				<div className='border-b-[1px] border-b-border'>
					<h5 className='text-[var(--text-dark)] font-semibold text-[1rem] pb-3'>
						Related Apps
					</h5>
				</div>
				<div className='flex flex-wrap'>
					{relatedApps.map((app) => (
						<div
							key={app.name}
							className='my-4 w-[33.33333%] px-8'
						>
							<div className='flex flex-col items-center'>
								<div className='w-[50px] h-[50px] rounded-[0.625rem] flex items-center justify-center bg-body-bg'>
									<FontAwesomeIcon
										icon={app.image}
										className='text-2xl '
										style={{ color: app.color }}
									/>
								</div>
								<p className='text-[.75rem] font-light'>
									{app.name}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</Card>
	);
};

export default RelatedApps;
