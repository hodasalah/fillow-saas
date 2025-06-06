import { useEffect, useState } from 'react';
import { PrimaryOutlineBtn } from '../../../../../../components/buttons';
import { useAppDispatch } from '../../../../../../hooks/hooks';
import { setLoading } from '../../../../../../store/slices/loadingSlice';
import { Email } from '../../../../../../types/dashboard';
import { fetchEmails } from '../../../../../../utils/fetchEmails';
import EmailItem from './EmailItem';

interface RecentEmailsProps {
	emails: Email[];
}

const RecentEmails = ({ emails: initialEmails }: RecentEmailsProps) => {
	const [emails, setEmails] = useState<Email[]>(initialEmails);
	const [error, setError] = useState<string | null>(null);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setEmails(initialEmails);
	}, [initialEmails]);

	const MAX_RETRIES = 3;
	const [retryCount, setRetryCount] = useState(0);

	const handleRetry = async () => {
		if (retryCount >= MAX_RETRIES) {
			setError('Maximum retry attempts reached. Please try again later.');
			return;
		}
		setRetryCount((prev) => prev + 1);
		setError(null);
		try {
			dispatch(setLoading(true));
			const data = await fetchEmails();
			setEmails(data);
			dispatch(setLoading(false));
		} catch (error) {
			console.error('Retry attempt failed:', error);
			setError('Retry attempt failed. Please try again later.');
		}
	};

	const handlePinnedEmail = (id: string) => {
		const email = emails.find((email) => email.id === id);
		const updatedEmails = emails.map((email) =>
			email.id === id ? { ...email, pinned: !email.pinned } : email,
		);
		if (email) {
			setEmails([...updatedEmails]);
		}
	};

	return (
		<div className='w-full shadow-custom-shadow'>
			<div className='bg-white rounded-lg shadow-sm'>
				<div className='py-[1.875rem] pb-0'>
					{/* header */}
					<div className='flex justify-between items-center mb-4 px-[1.875rem] pt-[1.5rem]'>
						<div className=''>
							<h4 className='mb-0 text-xl font-semibold text-[var(--text-dark)] capitalize mt-0'>
								Recent Emails
							</h4>
							<span className='text-sm'>
								Check your Recent Emails here
							</span>
						</div>
						<div className='max-w-fit'>
							<div className='w-36  h-12'>
								<PrimaryOutlineBtn>View More</PrimaryOutlineBtn>
							</div>
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

					{/* emails */}
					<div className='px-0 pt-2'>
						{emails.length > 0 &&
							emails.map((email: Email) => (
								<EmailItem
									key={email.id}
									email={email}
									onBtnClick={handlePinnedEmail}
								/>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecentEmails;
