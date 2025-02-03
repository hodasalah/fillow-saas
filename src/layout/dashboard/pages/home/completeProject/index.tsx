import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Card from '../../../../../components/Card';
import LineChart from '../../../../../components/chart/LineChart';
import DropdownDelEditBtn from '../../../../../components/dropdownDelEditBtn';
import Modal from '../../../../../components/Modal';
import EditProjectForm from './EditProjectForm.tsx';


export interface ProjectData {
	id: number;
	name: string;
	startDate: string;
	endDate: string;
	targetCompletion: number;
	dataPoints: Array<{
		date: string;
		completion: number;
	}>;
}
const links: { id: string; name: string }[] = [
	{ id: uuidv4(), name: 'Edit' },
	{ id: uuidv4(), name: 'Delete' },
];
const CompleteProject = () => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedProject, setSelectedProject] = useState<ProjectData>({
		id: 1,
		name: 'Website Redesign',
		startDate: '2024-01-01',
		endDate: '2024-06-30',
		targetCompletion: 100,
		dataPoints: [
			{ date: '2024-01-31', completion: 15 },
			{ date: '2024-02-29', completion: 30 },
			{ date: '2024-03-31', completion: 55 },
			{ date: '2024-04-30', completion: 75 },
		],
	});	

	const handleDelete = () => {
		// API call to delete project
		console.log('Deleting project:', selectedProject.id);
		setShowDeleteModal(false);
		// Reset or redirect after deletion
	};

	const handleEdit = (updatedProject: ProjectData) => {
		// API call to update project
		console.log('Updating project:', updatedProject);
		setSelectedProject(updatedProject);
		setShowEditModal(false);
	};

	const chartData = {
		labels: selectedProject.dataPoints.map((dp) => dp.date),
		datasets: [
			{
				label: 'Project Completion ',
				data: selectedProject.dataPoints.map((dp) => dp.completion),
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.1,
			},
		],
	};

	return (
		<div className='w-full shadow-custom-shadow'>
			<Card>
				<div className='p-[1.875rem] pb-0 w-full'>
					<div className='flex justify-between items-center mb-4'>
						<h4 className='mb-0 text-xl font-semibold text-[var(--text-dark)] capitalize mt-0'>
							{selectedProject.name} Completion Rate
						</h4>
						<DropdownDelEditBtn
							onDeleteBtn={(id) => {
								const link = links.find(
									(link) => link.id === id,
								);
								if (link) {
									setShowDeleteModal(true);
								}
							}}
							onEditBtn={(id)=>{
								const link = links.find(
									(link) => link.id === id
								);
								if (link) {
									setShowEditModal(true);
								}}}
							links={links}
						/>
					</div>
					<div className='flex flex-1 overflow-hidden'>
						<LineChart data={chartData} />
					</div>
				</div>
			</Card>
			{/* Delete Confirmation Modal */}
			{showDeleteModal&&<Modal
				onClose={() => setShowDeleteModal(false)}
				onConfirm={handleDelete}
				title='Delete Project'
				message="Are you sure you want to delete this project's progress tracking?"
			/>}
			{/* Edit Project Modal */}
			{showEditModal&&<EditProjectForm
				onClose={() => setShowEditModal(false)}
				project={selectedProject}
				onSave={handleEdit}
			/>}
		</div>
	);
};

export default CompleteProject;
