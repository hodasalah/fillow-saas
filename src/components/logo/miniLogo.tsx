const MiniLogo = () => {
	return (
		<svg
			className='logo-abbr'
			width='55'
			height='55'
			viewBox='0 0 55 55'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<circle
				cx='27.5'
				cy='27.5'
				r='27.5'
				className="fill-primary dark:fill-white transition-colors duration-300"
			/>
            <text
                x='50%'
                y='55%'
                textAnchor='middle'
                dominantBaseline='middle'
                className="fill-white dark:fill-black font-bold text-[30px] font-['Libre_Baskerville']"
            >
                D
            </text>
			<defs></defs>
		</svg>
	);
};

export default MiniLogo;
