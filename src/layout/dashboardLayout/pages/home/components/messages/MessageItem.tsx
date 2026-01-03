import { formatDistanceToNow } from 'date-fns';
import DropdownDelEditBtn from '../../../../../../components/dropdownDelEditBtn';
import { Message } from '../../../../../../types/dashboard';

const MessageItem = ({ message }: { message: Message }) => {
	const getProfileImageClasses = (isActive: boolean) => {
		const baseClasses = 'h-12 w-[3.2rem] relative inline-block';
		const activeClasses =
			'active after:content-[""] after:h-[.9rem] after:w-[.9rem] after:absolute after:bottom-0 after:-right-[0.3125rem] after:rounded-[50%] after:bg-[#09BD3C]';
		return isActive ? `${baseClasses} ${activeClasses}` : baseClasses;
	};
	return (
		<div className='relative flex justify-between items-center [&:not(:last-child)]:border-b-[0.0625rem] [&:not(:last-child)]:border-[var(--border)] px-[1.85rem] py-[0.950rem]'>
			<div className='flex items-center w-full'>
				<div className={getProfileImageClasses(false)}>
					<img
						className='h-full w-full rounded-[50%] object-cover'
						src={message.sender?.avatar || '/assets/fallback.png'}
						alt={`${message.sender?.name || 'User'}'s profile`}
						onError={(e) => {
							e.currentTarget.src = '/assets/fallback.png';
						}}
					/>
				</div>
				<div className='ml-4 w-full'>
					{/* will replace it with react-router-dom Link component */}
					<a href='#'>
						<h5 className='mb-1 leading-6 text-[var(--text-dark)] font-semibold'>
							{message.sender?.name || 'Unknown'}
						</h5>
					</a>
					<div className='flex justify-between'>
						<p className='mr-auto mb-0 leading-[1.8] text-[var(--text-dark)]'>
							{message.content}
						</p>
						<small className='mr-6'>
							{formatDistanceToNow(
								new Date(message.timestamp),
								{ addSuffix: true },
							)}
						</small>
					</div>
				</div>
			</div>
			<DropdownDelEditBtn
				links={[
					{ name: 'Edit', id: '1' },
					{ name: 'Delete', id: '2' },
				]}
				onEditBtn={() => console.log('Edit button clicked')}
				onDeleteBtn={() => console.log('Delete button clicked')}
			/>
		</div>
	);
};

export default MessageItem;
