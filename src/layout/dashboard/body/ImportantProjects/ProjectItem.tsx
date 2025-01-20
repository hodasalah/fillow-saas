import DropdownDelEditBtn from '../../../../components/dropdownDelEditBtn';

const dropdownMenuLinks = [
	{
		name: 'Delete',
		id: 'delete',
	},
	{
		name: 'Edit',
		id: 'edit',
	},
];
const ProjectItem = () => {
	return (
		<div className='my-[0.625rem]'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center'>
					<span className='h-10 w-12 border-[1px] border-[var(--border)] rounded-[0.625rem] text-center leading-[2.8rem]'>
						<img
							src='images/circle-hunt.png'
							alt=''
						/>
					</span>
					<div className='ml-4 '>
						<h5 className='mb-1 font-semibold text-[var(--text-dark)] text-[1.5rem]'>
							Circle Hunt
						</h5>
						<p className='mb-0 leading-[1.8]'>Creative Agency</p>
					</div>
				</div>
				<DropdownDelEditBtn links={dropdownMenuLinks} />
			</div>
			<h5 className='mt-3'>
				Redesign Landing Page Website for Company Profile
			</h5>
			<div className='my-4'>
				<span className='leading-[1.5] rounded-[0.625rem] py-1 px-[0625rem] border-transparent badge-primary light first:mr-3'>
					UI/UX
				</span>
			</div>
			<div className='mt-3'>
				<div className='h-[0.325rem] bg-[var(--rgba-primary-1)]  flex border-[.625rem]'>
					<div className='bg-[var(--primary)] border-[.625rem] h-[5px] w-[45%] flex flex-col justify-center progress-animated'>
						<span className='h-[1px] w-[1px] m-[-1px] absolute overflow-hidden'>
							45% completed
						</span>
					</div>
				</div>
				<div className='flex items-end mt-3 justify-between'>
					<p className='mb-0'>
						<strong className='text-[var(--text-dark)] mr-2'>
							12
						</strong>
						Task Done
					</p>
					<p className='mb-0 leading-[1.8]'>Due date: 12/05/2020</p>
				</div>
			</div>
			<hr />
		</div>
	);
};

export default ProjectItem;
