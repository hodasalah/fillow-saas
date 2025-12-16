import Card from '../../../../../components/card';
import { timeline } from './constants';

const Timeline = () => {
	return (
		<Card>
			<div className='relative h-[23.125rem] w-[25rem] p-4 overflow-hidden'>
				<ul className="relative h-full before:absolute before:top-[1.25rem] before:bottom-0 before:left-[0.5625rem] before:content-[''] before:w-[0.1875rem] before:bg-[#c8c8c8] before:mr-[-0.0938rem] overflow-auto">
					{timeline.map((line) => (
						<li
							key={line.id}
							className='timeline-badge relative mb-[0.9375rem] before:content-[""] table after:content-[""] after:table after:clear-both'
						>
							<div
								className={`rounded-[50%] h-[1.375rem] left-0 absolute top-[0.625rem] w-[1.375rem] border-[0.125rem] border-[var(--after-border-color)] bg-white p-1  after:content-[""] after:w-[0.625rem] after:h-[0.625rem] after:rounded-[100%] after:block  after:bg-[var(--after-color)] after:shadow-[var(--after-box-shadow)] after:border-[var(--after-border-color)]`}
								style={{
									'--after-color': line.color, // Pass dynamic values
									'--after-box-shadow': line.boxShadow,
									'--after-border-color': line.borderColor,
								}}
							></div>

							<div
								className={`relative block ml-[2.5rem] border-l-[0.3125rem] py-[0.3125rem] pr-[0.625rem] pl-[0.9375rem] border-[var(--after-color)] after:content-[''] after:block after:absolute after:w-[0.4375rem] after:h-[0.4375rem] after:top-[0.9375rem] after:left-[-0.5625rem] after:border-0 after:rotate-[45deg] after:bg-[var(--after-color)]`}
								style={{
									'--after-color': line.color, // Pass dynamic values
								}}
							>
								<span className='text-[#9da1a5bf] text-[12.25px] mb-[0.3125rem] opacity-80 tracking-wide'>
									{line.time}
								</span>
								<h6 className='mb-0 leading-normal text-[var(--text-dark)] font-semibold text-[0.938rem]'>
									{line.message}
								</h6>
							</div>
						</li>
					))}
				</ul>
			</div>
		</Card>
	);
};

export default Timeline;
