import { faThumbTack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PrimaryOutlineBtn } from '../../../../components/buttons';
const RecentEmails = () => {
	const emailsData = [
		{
			name: 'John Doe',
			email: 'john@gmail.com',
			title: 'Lorem ipsum dolor sit amet',
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
			profileImage:
				'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
			files: [],
			pinned: true,
		},
		{
			name: 'Jeny Mag',
			email: 'jeny@gmail.com',
			title: 'Lorem ipsum dolor sit amet',
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
			profileImage:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			files: [
				'Master_file.fig',
				'CoverPreview.jpg',
				'CoverPreview3.jpg',
				'Master_file2.fig',
				'CoverPreview3.jpg',
			],
			pinned: true,
		},
		{
			name: 'Goarge Mike',
			email: 'george@gmail.com',
			title: 'Lorem ipsum dolor sit amet',
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
			profileImage:
				'https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2725&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			files: [],
			pinned: false,
		},
		{
			name: 'Jesica Doe',
			email: 'jessica@gmail.com',
			title: 'Lorem ipsum dolor sit amet',
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
			profileImage:
				'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=3880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			files: ['file1.fig', 'CoverPreview5.jpg', 'CoverPreview8.jpg'],
			pinned: false,
		},
	];
	return (
		<div className='w-full'>
			<div className='bg-white rounded-lg shadow-sm'>
				<div className='py-[1.875rem] pb-0 w-full'>
					{/* header */}
					<div className='flex w-full justify-between items-center mb-4 px-[1.875rem] pt-[1.5rem]'>
						<div className=''>
							<h4 className='mb-0 text-xl font-semibold text-[var(--text-dark)] capitalize mt-0'>
								Recent Emails
							</h4>
							<span className='text-sm'>
								Check your Recent Emails here
							</span>
						</div>
						<div className='w-36 h-12'>
							<PrimaryOutlineBtn>View More</PrimaryOutlineBtn>
						</div>
					</div>
					{/* emails */}
					<div className='px-0 pt-2'>
						{emailsData.length > 0 &&
							emailsData.map((email) => (
								<div className='w-full border-b-[0.0625rem] border-b-[var(--rgba-primary-1)]'>
									<div className='w-ful py-[.9375rem] px-[1.8625rem] flex items-center justify-between gap-[3rem]'>
										{/* image + data */}
										<div className='w-full flex items-center'>
											<div className="w-[3rem] h-[3rem] leading-[3rem] rounded-[50%] text-[1.5rem] ">
												<img
													className='block w-full h-full object-cover'
													src={email.profileImage}
													alt={email.name}
												/>
											</div>
											<div className="ml-4">
												<h4 className='leading-[1.5] font-[500] text-[1.125rem] text-[var(--text-dark)]'>
													{email.title}
												</h4>
												<p className='leading-[1.8] text-[var(--text-dark)]'>
													{email.body}
												</p>
											</div>
										</div>
										{/* pin mark btn */}
										<div className="max-w-full flex items-center justify-end">
											<button className='w-[3rem] h-[3rem] border-[0.0625rem] border-[var(--primary)] leading-[3rem] text-[var(--primary)] rounded-full flex justify-center items-center text-[1.375rem] hover:bg-[var(--primary)] hover:text-white transition-all duration-300 '>
												<FontAwesomeIcon
													icon={faThumbTack}
												/>
											</button>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecentEmails;