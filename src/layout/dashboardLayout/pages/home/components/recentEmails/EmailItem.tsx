import {
    faFile,
    faImage,
    faThumbTack,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';
import { Email } from '../../../../../../types/dashboard';

interface EmailItemProps {
	email: Email;
	onBtnClick: (id: string, email: Email) => void;
}

const EmailItem = ({ email, onBtnClick }: EmailItemProps) => {
	return (
		<div className='w-full [&:not(:last-child)]:border-b-[0.0625rem]  [&:not(:last-child)]:border-(var(--border))'>
			<div className='py-[.9375rem] px-[1.8625rem] flex items-center justify-between'>
				{/* image + data */}
				<div className='flex items-center'>
					<div className='flex-shrink-0 w-[3rem] h-[3rem] leading-[3rem] rounded-[50%] text-[1.5rem] overflow-hidden'>
						<img
							className='block w-full h-full object-cover'
							src={email.profileImage || '/assets/fallback.png'}
							alt={email.name}
						/>
					</div>
					<div className='pl-4'>
						<h4 className='leading-[1.5] font-[500] text-[1.125rem] text-[var(--text-dark)] text-wrap'>
							{email.title}
						</h4>
						<p className='leading-[1.8] text-[var(--text-dark)] text-wrap'>
							{email.body}
						</p>
					</div>
				</div>
				{/* pin mark btn */}
				<div className='flex items-center justify-end'>
					<button
						className={`w-[3rem] h-[3rem] border-[0.0625rem] border-[var(--primary)] leading-[3rem] ${
							email.pinned
								? 'bg-[var(--primary)] dark:bg-secondary text-white dark:text-[#333]'
								: 'text-[var(--primary)] dark:text-secondary bg-transparent dark:bg-transparent'
						} rounded-[0.635rem] justify-center items-center text-[1.375rem] transition-all duration-300 `}
						onClick={() => onBtnClick(email.id, email)}
					>
						<FontAwesomeIcon icon={faThumbTack} />
					</button>
				</div>
			</div>
			{email.files.length > 0 && (
				<div className='flex items-center gap-2 mt-2 px-[1.8625rem]'>
					{email.files.length > 2
						? email.files.slice(0, 2).map((file, index) => (
								<div
									key={`${file.name}-${index}`}
									className='cursor-pointer py-3 md:px-9 px-5 rounded-full border-[1px] border-[var(--primary)] bg-transparent text-[var(--primary)] dark:text-secondary dark:border-secondary text-[0.875rem]'
								>
									{file.type === 'image' ? (
										<>
											<FontAwesomeIcon
												className='mr-2 text-[1.1rem]'
												icon={faImage}
											/>{' '}
											{file.name}
										</>
									) : (
										<>
											<FontAwesomeIcon
												className='mr-2 text-[1.1rem]'
												icon={faFile}
											/>{' '}
											{file.name}
										</>
									)}
								</div>
						  ))
						: email.files.map((file, index) => (
								<div
									key={`${file.name}-${index}`}
									className='cursor-pointer py-3 px-9 rounded-full border-[1px] border-[var(--primary)] bg-transparent text-[var(--primary)] dark:text-white text-[0.875rem]'
								>
									{file.type === 'image' ? (
										<>
											<FontAwesomeIcon
												className='mr-2 text-[1.1rem]'
												icon={faImage}
											/>{' '}
											{file.name}
										</>
									) : (
										<>
											<FontAwesomeIcon
												className='mr-2 text-[1.1rem]'
												icon={faFile}
											/>{' '}
											{file.name}
										</>
									)}
									{file.name}
								</div>
						  ))}
				</div>
			)}
			{email.files.length > 2 && (
				<div className='py-[.9375rem] px-[1.8625rem]'>
					<button className='capitalize mt-2 py-3 px-8 rounded-full bg-[var(--rgba-primary-1)] text-[var(--primary)] dark:text-black dark:bg-secondary text-[0.875rem]'>
						view {email.files.length - 2} more files
					</button>
				</div>
			)}
		</div>
	);
};
export default memo(EmailItem);
