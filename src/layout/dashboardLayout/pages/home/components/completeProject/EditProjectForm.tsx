import React, { useEffect, useState } from 'react';
import { generateDataPoints } from '../../../../../../utils/helpers/generateDatePoints';

export interface DataPoint {
	date: string;
	completion: number;
}

export interface ProjectData {
	id: number;
	name: string;
	startDate: string;
	endDate: string;
	targetCompletion: number;
	// You can extend this type with additional fields if needed
	dataPoints: DataPoint[];
}

interface EditProjectFormProps {
	project: ProjectData;
	onSave: (updatedProject: ProjectData) => void;
	onClose: () => void;
}

const EditProjectForm: React.FC<EditProjectFormProps> = ({
	project,
	onSave,
	onClose,
}) => {
	const [formData, setFormData] = useState<ProjectData>(project);

	// Keep form state in sync if the project prop changes
	useEffect(() => {
		setFormData(project);
	}, [project]);
	// Whenever startDate or endDate changes, update the dataPoints accordingly.
	useEffect(() => {
		if (formData.startDate && formData.endDate) {
			const newDataPoints = generateDataPoints(
				formData.startDate,
				formData.endDate,
			);
			setFormData((prev) => ({
				...prev,
				dataPoints: newDataPoints,
			}));
		}
	}, [formData.startDate, formData.endDate]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			// For targetCompletion, ensure to convert the value to a number.
			[name]: name === 'targetCompletion' ? parseInt(value, 10) : value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		console.log('Form submitted:', formData);
		e.preventDefault();
		onSave(formData);
	};

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
			<div className='card-dynamic-bg p-6 rounded-lg shadow-lg max-w-md'>
				<h3 className='text-lg font-semibold mb-4'>Edit Project</h3>
				<form
					onSubmit={handleSubmit}
					className='space-y-4'
				>
					{/* Project Name */}
					<div>
						<label
							htmlFor='name'
							className='block text-sm font-medium'
						>
							Project Name
						</label>
						<input
							id='name'
							type='text'
							name='name'
							value={formData.name}
							onChange={handleChange}
							className='w-full border p-2 rounded'
							required
						/>
					</div>

					{/* Start Date */}
					<div>
						<label
							htmlFor='startDate'
							className='block text-sm font-medium'
						>
							Start Date
						</label>
						<input
							id='startDate'
							type='date'
							name='startDate'
							value={formData.startDate}
							onChange={handleChange}
							className='w-full border p-2 rounded'
							required
						/>
					</div>

					{/* End Date */}
					<div>
						<label
							htmlFor='endDate'
							className='block text-sm font-medium'
						>
							End Date
						</label>
						<input
							id='endDate'
							type='date'
							name='endDate'
							value={formData.endDate}
							onChange={handleChange}
							className='w-full border p-2 rounded'
							required
						/>
					</div>

					{/* Target Completion */}
					<div>
						<label
							htmlFor='targetCompletion'
							className='block text-sm font-medium'
						>
							Target Completion (%)
						</label>
						<input
							id='targetCompletion'
							type='number'
							name='targetCompletion'
							value={formData.targetCompletion}
							onChange={handleChange}
							className='w-full border p-2 rounded'
							min={0}
							max={100}
							required
						/>
					</div>
					{/* (Optional) Displaying generated data points for review */}
					<div>
						<p className='text-sm font-medium'>
							Generated Data Points:
						</p>
						<ul className='text-xs text-(var(--primary)) flex justify-between py-3 gap-4 flex-wrap'>
							{formData.dataPoints.map((dp, idx) => (
								<li
									key={idx}
									className='py-2 px-4 bg-[var(--rgba-primary-1)]'
								>
									{dp.date} :{' '}
									<span className='font-semibold text-primary p-2 bg-rgba-primary-3'>
										{dp.completion}%
									</span>
								</li>
							))}
						</ul>
					</div>
					{/* Action Buttons */}
					<div className='flex justify-end gap-2 mt-4'>
						<button
							type='button'
							onClick={onClose}
							className='px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400'
						>
							Cancel
						</button>
						<button
							type='submit'
							className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
						>
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditProjectForm;
