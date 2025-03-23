import {
	faEllipsis,
	faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const chatList = [
	{
		letter: 'A',
		contacts: [
			{
				id: uuidv4(),
				name: 'Archie Parker',
				status: 'online',
				last_seen: null,
				img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
			},
			{
				id: uuidv4(),
				name: 'Alfie Mason',
				status: 'offline',
				last_seen: '7 mins ago',
				img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			},
			{
				id: uuidv4(),
				name: 'AharlieKane',
				status: 'online',
				last_seen: null,
				img: 'https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2725&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			},
			{
				id: uuidv4(),
				name: 'Athan Jacoby',
				status: 'offline',
				last_seen: '30 mins ago',
				img: 'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=3880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			},
		],
	},
	{
		letter: 'B',
		contacts: [
			{
				id: uuidv4(),
				name: 'Bashid Samim',
				status: 'offline',
				last_seen: '50 mins ago',
				img: 'https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2725&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			},
			{
				id: uuidv4(),
				name: 'Breddie Ronan',
				status: 'online',
				last_seen: null,
				img: null,
			},
		],
	},
	{
		letter: 'C',
		contacts: [
			{
				id: uuidv4(),
				name: 'Ceorge Carson',
				status: 'offline',
				last_seen: '7 mins ago',
				img: null,
			},
		],
	},
	{
		letter: 'D',
		contacts: [
			{
				id: uuidv4(),
				name: 'Darry Parker',
				status: 'online',
				last_seen: null,
				img: null,
			},
			{
				id: uuidv4(),
				name: 'Denry Hunter',
				status: 'offline',
				last_seen: '30 mins ago',
				img: 'https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2725&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			},
		],
	},
	{
		letter: 'J',
		contacts: [
			{
				id: uuidv4(),
				name: 'Jack Ronan',
				status: 'offline',
				last_seen: '50 mins ago',
				img: null,
			},
			{
				id: uuidv4(),
				name: 'Jacob Tucker',
				status: 'online',
				last_seen: null,
				img: null,
			},
			{
				id: uuidv4(),
				name: 'James Logan',
				status: 'offline',
				last_seen: '7 mins ago',
				img: 'https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2725&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			},
			{
				id: uuidv4(),
				name: 'Joshua Weston',
				status: 'online',
				last_seen: null,
				img: null,
			},
		],
	},
	{
		letter: 'O',
		contacts: [
			{
				id: uuidv4(),
				name: 'Oliver Acker',
				status: 'offline',
				last_seen: '30 mins ago',
				img: null,
			},
			{
				id: uuidv4(),
				name: 'Oscar Weston',
				status: 'offline',
				last_seen: '50 mins ago',
				img: null,
			},
		],
	},
];
const ChatListTab = () => {
	return (
		<div className='w-full overflow-scroll'>
			<div
				className='flex justify-between items-center text-center border-b-[0.0625rem]
          border-border py-[0.9375rem] px-[1.25rem] text-[var(--text-dark)]'
			>
				<button className='cursor-pointer'>
					<FontAwesomeIcon
						icon={faEllipsis}
						className='text-[1.05rem]'
					/>
				</button>
				<div className='cursor-pointer'>
					<h6 className='mb-1 text-[0.9375rem] font-semibold'>
						Chat List
					</h6>
					<p className='mb-0 leading-5 text-[.75rem] text-[#9da1a5]'>
						Show All
					</p>
				</div>
				<button className='cursor-pointer'>
					<FontAwesomeIcon
						icon={faMagnifyingGlass}
						className='text-[1.05rem]'
					/>
				</button>
			</div>

			<ul className='contacts'>
				{chatList.map((chatItem) => (
					<React.Fragment key={chatItem.letter}>
						<li className='bg-white py-1 px-4 text-black sticky top-0 z-[1] font-bold border-b-[0.0625rem] cursor-pointer'>
							{chatItem.letter}
						</li>
						{chatItem.contacts.map((contact) => (
							<li
								key={contact.id}
								className='border-b-[0.0625rem] cursor-pointer py-[0.4375rem] px-4 hover:bg-[#f6f6f6]'
							>
								<div className='flex'>
									<div className='bg-rgba-primary-1 text-primary w-10 h-10 relative flex justify-center min-w-10 min-h-10 items-center rounded-[2.5rem] mr-[0.625rem] font-medium text-[0.875rem]'>
										<img
											src={
												contact.img
													? contact.img
													: '/assets/fallback.png'
											}
											className='w-full h-full object-cover rounded-[2.5rem] absolute top-0 left-0'
											alt=''
										/>
										<span></span>
									</div>
									<div>
										<span className='text-[var(--text-dark)] text-[0.9375rem] font-medium mb-[0.3125rem] overflow-hidden block max-w-[10.625rem] leading-[1] text-ellipsis whitespace-nowrap'>
											{contact.name}
										</span>
										<p className='text-[0.8125rem] mb-0 max-w-[10.625rem] overflow-clip leading-[1]'>
											{contact.name +
												' is ' +
												contact.status}
											<br />
											{contact.last_seen && (
												<span className='text-[0.5425rem] mb-0 max-w-[10.625rem] overflow-clip text-primary'>
													{'last seen ' +
														contact.last_seen}
												</span>
											)}
										</p>
									</div>
								</div>
							</li>
						))}
					</React.Fragment>
				))}
			</ul>
		</div>
	);
};

export default ChatListTab;
