// components/Loading.tsx

const Loading = () => (
	<div className='fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50'>
		<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
	</div>
);

export default Loading;
