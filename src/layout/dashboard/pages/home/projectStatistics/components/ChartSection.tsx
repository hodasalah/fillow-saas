import Barchart from '../../../../../../components/chart/Barchart';
import ToggleSwitch from '../../../../../../components/toggleSwitch/ToggleSwitch';

const ChartSection=({data,switchStates,onToggleChange}:{data:number[],switchStates:{showOngoing:boolean,showUnfinished:boolean},onToggleChange:(key:'showOngoing'|'showUnfinished')=>void})=>{
  return (
		<div className='space-y-6'>
			<Barchart
				showOngoing={switchStates.showOngoing}
				showUnfinished={switchStates.showUnfinished}
				data={data}
			/>

			<div className='flex items-center gap-7 flex-wrap'>
				<ToggleSwitch
					checked={switchStates.showOngoing}
					onChange={() => onToggleChange('showOngoing')}
					label='Show Ongoing'
				/>
				<ToggleSwitch
					checked={switchStates.showUnfinished}
					onChange={() => onToggleChange('showUnfinished')}
					label='Show Unfinished'
				/>
			</div>
		</div>
  );
}
export default ChartSection;