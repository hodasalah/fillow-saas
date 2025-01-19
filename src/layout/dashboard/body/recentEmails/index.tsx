import { PrimaryOutlineBtn } from '../../../../components/buttons';
import EmailItem from './EmailItem';

interface EmailFile {
	name: string;
	type: 'file' | 'image';
}

interface Email {
	name: string;
	email: string;
	title: string;
	body: string;
	profileImage: string;
	files: EmailFile[];
	pinned: boolean;
}

const RecentEmails = () => {
	const emailsData: Email[] = [
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
			name: 'Jenny Mag',
			email: 'jeny@gmail.com',
			title: 'Lorem ipsum dolor sit amet',
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
			profileImage:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

			files: [
				{ name: 'Master_file.fig', type: 'file' },
				{ name: 'CoverPreview.jpg', type: 'image' },
				{ name: 'CoverPreview3.jpg', type: 'image' },
				{ name: 'Master_file2.fig', type: 'file' },
			],
			pinned: true,
		},
		{
			name: 'George Mike',
			email: 'george@gmail.com',
			title: 'Lorem ipsum dolor sit amet',
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
			profileImage:
				'https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2725&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			files: [],
			pinned: false,
		},
		{
			name: 'Jessica Doe',
			email: 'jessica@gmail.com',
			title: 'Lorem ipsum dolor sit amet',
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
			profileImage:
				'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=3880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			files: [
				{ name: 'file1.fig', type: 'file' },
				{ name: 'CoverPreview5.jpg', type: 'image' },
				{ name: 'CoverPreview8.jpg', type: 'image' },
			],
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
								<EmailItem
									key={email.name}
									email={email}
								/>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecentEmails;
