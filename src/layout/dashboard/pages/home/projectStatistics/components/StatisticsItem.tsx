const StatisticItem = ({
	value,
	label,
	icon,
}: {
	value: number;
	label: string;
	icon: React.ReactNode;
}) => (
	<div className='flex items-center gap-3'>
		<div className='mt-1'>{icon}</div>
		<div>
			<h4 className='text-2xl font-semibold text-text-dark'>{value}</h4>
			<p className='text-secondary-500'>{label}</p>
		</div>
	</div>
);
export default StatisticItem;