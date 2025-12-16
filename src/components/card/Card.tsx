const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className='sm:col-span-6 col-span-12 card-dynamic-bg transition-all relative  rounded-[0.625rem] flex items-center shadow-custom-shadow'>
			{children}
		</div>
	);
};

export default Card;
