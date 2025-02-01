const ToggleSwitch = ({
	checked,
	onChange,
	label,
}: {
	checked: boolean;
	onChange: () => void;
	label?: string;
}) => (
	<div className='flex items-center gap-2'>
		{/* Optional Label */}
		{label && <span className='text-sm text-gray-700'>{label}</span>}
		<label className='relative inline-flex items-center cursor-pointer'>
			<input
				type='checkbox'
				className='sr-only peer'
				checked={checked}
				onChange={onChange}
			/>
			{/* Switch Background */}
			<div
				className={`w-11 h-6 rounded-full transition-colors ${
					checked
						? 'bg-[var(--primary)]' // Active background color
						: 'bg-gray-200' // Inactive background color
				}`}
			>
				{/* Switch Knob */}
				<div
					className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full border transition-transform ${
						checked
							? 'bg-white translate-x-5 border-[var(--primary)]' // Active knob
							: 'bg-gray-400 translate-x-0 border-gray-300' // Inactive knob
					}`}
				></div>
			</div>
		</label>
	</div>
);

export default ToggleSwitch;
