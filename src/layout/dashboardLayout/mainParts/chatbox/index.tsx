import React from 'react';
import './chatbox.css';
import ChatboxContent from './chatboxContent';

interface ChatboxProps {
	showSlider: boolean;
	setShowSlider: (val: boolean) => void;
}

const Chatbox: React.FC<ChatboxProps> = ({ showSlider, setShowSlider }) => {
	const onClose = () => {
		setShowSlider(false);
	};

	return (
		<>
			<div
				className={`chatbox-overlay ${showSlider ? 'active' : ''}`}
				onClick={onClose}
			/>
			<div className={`chatbox ${showSlider ? 'active' : ''}`}>
				<div className='chatbox-content h-full'>
					<ChatboxContent />
				</div>
			</div>
		</>
	);
};

export default Chatbox;
