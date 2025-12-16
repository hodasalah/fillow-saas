import { EditModalProps } from './types';

const EditModal = ({data, onSave, onClose, onChange}:EditModalProps) => {
  return (
		<div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-[1003]'>
			<div className='card-dynamic-bg p-6 rounded-lg space-y-4 w-[400px]'>
				<h3 className='text-lg font-semibold'>Edit Data</h3>
				<div>
					<label className='block text-sm font-medium'>
						Total Projects
					</label>
					<input
						type='number'
						value={data?.total || 0}
						onChange={(e) =>
							onChange('total', Number(e.target.value))
						}
						className='w-full border rounded p-2'
					/>
				</div>
				<div>
					<label className='block text-sm font-medium'>
						Ongoing Projects
					</label>
					<input
						type='number'
						value={data?.ongoing || 0}
						onChange={(e) =>
							onChange('ongoing', Number(e.target.value))
						}
						className='w-full border rounded p-2'
					/>
				</div>
				<div>
					<label className='block text-sm font-medium'>
						Unfinished Projects
					</label>
					<input
						type='number'
						value={data?.unfinished || 0}
						onChange={(e) =>
							onChange('unfinished', Number(e.target.value))
						}
						className='w-full border rounded p-2'
					/>
				</div>
				<div className='flex justify-end gap-4'>
					<button
						onClick={() => onClose()}
						className='px-4 py-2 bg-gray-200 rounded'
					>
						Cancel
					</button>
					<button
						onClick={() => onSave()}
						className='px-4 py-2 bg-[var(--primary)] text-white rounded'
					>
						Save
					</button>
				</div>
			</div>
		</div>
  );
}

export default EditModal