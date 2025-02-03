interface ModalProps {
	title?: string;
	message?: string;
	onConfirm: () => void;
	onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
	title,
	message,
	onConfirm,
	onClose,
}) => {
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1002]'>
			<div className='bg-white p-6 rounded-lg shadow-lg w-96'>
				<h3 className='text-lg font-semibold'>{title || 'Modal'}</h3>
				<p className='text-sm text-gray-600 mt-2'>
					{message || 'Content goes here.'}
				</p>
				<div className='mt-4 flex justify-end gap-2'>
					<button
						className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
						onClick={() => {
							onConfirm();
						}}
					>
						Confirm
					</button>

					<button
						className='px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400'
						onClick={() => onClose()}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
