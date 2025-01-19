import { PrimaryOutlineBtn } from '../../../../components/buttons';
import Card from '../../../../components/Card';
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
			name: 'Jesica Doe',
			email: 'jessica@gmail.com',
			title: 'Lorem ipsum dolor sit amet',
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
			profileImage:
				'https://images.unsplash.com/photo-1535713875005-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
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
				'https://images.unsplash.com/photo-1535713875007-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
			files: [],
			pinned: false,
		},
		{
			name: 'Jesica Doe',
			email: 'jessica@gmail.com',
			title: 'Lorem ipsum dolor sit amet',
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
			profileImage:
				'https://images.unsplash.com/photo-1535713875005-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
			files: ['file1.fig', 'CoverPreview5.jpg', 'CoverPreview8.jpg'],
			pinned: false,
		},
	];
	return (
		<div className='w-full'>
			<Card>
				<div className='p-[1.875rem] pb-0 w-full'>
					{/* header */}
					<div className='flex w-full justify-between items-center mb-4 '>
						<div className='mb-4 '>
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
					<div className=''>
						<div className='flex items-center justify-between'>
							{/* image+ email message col */}

							{/* pinned button col */}
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default RecentEmails;
