const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className='sm:col-span-6 col-span-12  bg-white transition-all relative shadow-[0rem 0.3125rem 0.3125rem 0rem rgba(82, 63, 105, 0.05)] rounded-[0.625rem] flex items-center'>
			{children}
		</div>
	);
};

export default Card;
