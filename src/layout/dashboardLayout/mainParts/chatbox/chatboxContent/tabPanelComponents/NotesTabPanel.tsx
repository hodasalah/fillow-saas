import {
	faMagnifyingGlass,
	faPencil,
	faPlus,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';

const notes = [
	{
		title: 'New order placed..',
		date: '10 Aug 2020',
		id: uuidv4(),
	},
	{
		title: 'Youtube, a video-sharing website..',
		date: '10 Aug 2020',
		id: uuidv4(),
	},
	{
		title: 'john just buy your product..',
		date: '10 Aug 2020',
		id: uuidv4(),
	},
	{
		title: 'Athan Jacoby',
		date: '10 Aug 2020',
		id: uuidv4(),
	},
];

const NotesTabPanel = () => {
	return (
		<div className='w-full items-center'>
			<div
				className='flex justify-between items-center text-center border-b-[0.0625rem]
      border-border py-[0.9375rem] px-[1.25rem] text-[var(--text-dark)]'
			>
				<button className='cursor-pointer'>
					<FontAwesomeIcon
						icon={faPlus}
						className='text-[1.05rem]'
					/>
				</button>
				<div className='cursor-pointer'>
					<h6 className='mb-1 text-[0.9375rem] font-semibold'>
						Notes
					</h6>
					<p className='mb-0 leading-5 text-[.75rem] text-[#9da1a5]'>
						Add New Nots
					</p>
				</div>
				<button className="cursor-pointer">
					<FontAwesomeIcon
						icon={faMagnifyingGlass}
						className='text-[1.05rem]'
					/>
				</button>
			</div>
			<div>
				<ul>
					{notes.map((note) => (
						<li key={note.id} className='py-3  border-b-[0.0625rem] hover:bg-[#f5f5f5]'>
							<div className='flex items-center justify-between px-4'>
								<div className=''>
									<span className='text-[var(--text-dark)] text-[0.9375rem] font-medium mb-[0.3125rem] overflow-hidden block max-w-[10.625rem] leading-[1] text-ellipsis whitespace-nowrap'>
										{note.title}
									</span>
									<p className='text-[0.8125rem] mb-0 max-w-[10.625rem] overflow-clip leading-[1]'>
										{note.date}
									</p>
								</div>
								<div className=''>
									<button className='w-[1.625rem] h-[1.625rem] min-w-[1.625rem] min-h-[1.625rem] p-[0.1875rem] text-white text-[.75rem] font-semibold mr-1 bg-primary hover:bg-[#a089cd] rounded-[0.625rem]'>
										<FontAwesomeIcon icon={faPencil} />
									</button>

									<button className='bg-[#FC2E53] hover:bg-[#fd5875] w-[1.625rem] h-[1.625rem] min-w-[1.625rem] min-h-[1.625rem] p-[0.1875rem] text-white text-[.75rem] font-semibold rounded-[0.625rem]'>
										<FontAwesomeIcon icon={faTrash} />
									</button>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default NotesTabPanel;
