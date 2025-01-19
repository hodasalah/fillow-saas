import Card from '../../../../components/Card';
import LineChart from '../../../../components/chart/LineChart';
import DropdownDelEditBtn from '../../../../components/dropdownDelEditBtn';

const CompleteProject = () => {
	const dropdownMenuLinks = [
		{
			name: 'Delete',
			id: 'delete',
		},
		{
			name: 'Edit',
			id: 'edit',
		},
	];
	return (
		<div className='w-full'>
			<Card>
				<div className='w-full p-[1.875rem] pb-0'>
					<div className='flex w-full justify-between items-center mb-4 '>
						<h4 className='mb-0 text-xl font-semibold text-[var(--text-dark)] capitalize mt-0'>
							Completion Project Rate
						</h4>
						<DropdownDelEditBtn links={dropdownMenuLinks} />
					</div>
					<div className='flex flex-1 w-full'>
						<LineChart />
					</div>
				</div>
			</Card>
		</div>
	);
};

export default CompleteProject;
