import { PrimaryBtn } from '../../../../components/buttons';
import DropdownDelEditBtn from '../../../../components/dropdownDelEditBtn';

const Messages = () => {
	return (
		<div className='w-full shadow-custom-shadow'>
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
					{/* {error && (
					<div className='p-4 text-center bg-red-100'>
						<p className='text-red-500'>{error}</p>
						<button
							onClick={() => handleRetry()}
							className='mt-2 px-4 py-2 bg-[var(--primary)] text-white rounded-md'
						>
							Retry
						</button>
					</div>
				)} */}

					{/* messages */}

					<div className='px-0 pt-2'>
						<div className='relative flex justify-between items-center border-b-[0.0625rem] border-[var(--border)] px-[1.85rem] py-[0.950rem]'>
							<div className='flex items-center w-full'>
								<div className='h-12 w-12 relative inline-block active after:content-[""] after:h-[.9rem] after:w-[.9rem] after:absolute after:bottom-0 after:right-[-0.3125rem] after:rounded-[50%] after:bg-[#09BD3C]'>
									<img
										className='h-full w-full rounded-[50%] object-cover'
										src='images/profile/small/pic6.jpg'
										alt=''
									/>
								</div>
								<div className='ml-4 w-full'>
									<a href='app-profile.html'>
										<h5 className='mb-1 leading-6 text-[var(--text-dark)] font-semibold'>
											Maren Rosser
										</h5>
									</a>
									<div className='flex justify-between'>
										<p className='mr-auto mb-0 leading-[1.8] text-[var(--text-dark)]'>
											Hei, dont forget to clear server
											cache!
										</p>
										<small className='mr-6'>
											25min ago
										</small>
									</div>
								</div>
							</div>
							<DropdownDelEditBtn
								links={[
									{ name: 'Edit', id: '1' },
									{ name: 'Delete', id: '2' },
								]}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Messages;
