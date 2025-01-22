import { FC } from 'react';
import { Tag } from '.';

const ProjectTag: FC<{ tag: Tag }> = ({ tag }) => (
	<span
		className={`leading-[1.5] rounded-[0.625rem] py-1 px-[0.625rem] border-transparent  first:mr-3 text-[0.75em] font-bold`}
		style={{
			backgroundColor: tag.bg,
			color: tag.color,
		}}
	>
		{tag.name}
	</span>
);
export default ProjectTag;
