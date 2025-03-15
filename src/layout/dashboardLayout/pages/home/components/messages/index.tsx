import { useEffect, useState } from 'react';
import { PrimaryBtn } from '../../../../../../components/buttons';
import { useAppDispatch } from '../../../../../../hooks/hooks';
import { setLoading } from '../../../../../../store/slices/loadingSlice';
import { fetchMessages } from '../../../../../../utils/fetchMessages';
import MessageItem from './MessageItem';

export interface Message {
	id: string;
	profileImage: string;
	name: string;
	lastMessage: string;
	lastMessageTime: string;
	active: boolean;
}

const Messages = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [retryCount, setRetryCount] = useState(0);
	const MAX_RETRIES = 3;
	const dispatch = useAppDispatch();

	const handleRetry = async () => {
		if (retryCount >= MAX_RETRIES) {
			setError('Maximum retry attempts reached. Please try again later.');
			return;
		}
		setRetryCount((prev) => prev + 1);
		setError(null);
		try {
			dispatch(setLoading(true));
			const data = await fetchMessages();
			setMessages(data);
			dispatch(setLoading(false));
		} catch (error) {
			console.error('Retry attempt failed:', error);
			setError('Retry attempt failed. Please try again later.');
		}
	};
	useEffect(() => {
		const fetchData = async () => {
			dispatch(setLoading(true));
			const messagesData = await fetchMessages();
			setMessages(messagesData);
			dispatch(setLoading(false));
		};
		fetchData();
	}, [dispatch]);
	return (
		<div className='w-full shadow-custom-shadow mb-10'>
			<div className='bg-white rounded-lg shadow-sm'>
				<div className='py-[1.875rem] pb-0 w-full'>
					{/* header */}
					<div className='flex w-full justify-between gap-8 items-center mb-4 px-[1.875rem] pt-[1.5rem]'>
						<div className='w-full'>
							<h4 className='mb-0 text-xl font-semibold text-[var(--text-dark)] capitalize mt-0'>
								Messages
							</h4>
							<span className='text-sm'>
								Check your Messages here
							</span>
						</div>
						<div className='w-[20rem] h-12'>
							<PrimaryBtn>add New Message</PrimaryBtn>
						</div>
					</div>
					{error && (
						<div className='p-4 text-center bg-red-100'>
							<p className='text-red-500'>{error}</p>
							<button
								onClick={() => handleRetry()}
								className='mt-2 px-4 py-2 bg-[var(--primary)] text-white rounded-md'
							>
								Retry
							</button>
						</div>
					)}

					{/* messages */}
					<div className='px-0 pt-2'>
						{messages.length > 0 &&
							messages.map((message) => (
								<MessageItem
									key={message.id}
									message={message}
								/>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Messages;
