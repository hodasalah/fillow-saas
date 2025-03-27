import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import Logo from '../../../components/logo/logo';
import MiniLogo from '../../../components/logo/miniLogo';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { loginUser, loginWithGoogle } from '../../../store/slices/authActions';

const Login: React.FC = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const dispatch = useAppDispatch();
	const {
		status,
		error: authError,
		currentUser,
	} = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (authError) setError(authError);
	}, [authError]);

	useEffect(() => {
		if (currentUser) {
			navigate('/dashboard');
		}
	}, [currentUser, navigate]);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		try {
			await dispatch(loginUser({ email, password }));
		} catch (err: any) {
			setError(err.message || 'An error occurred during login.');
		}
	};

	const handleGoogleLogin = async () => {
		setError(null);
		try {
			await dispatch(loginWithGoogle());
		} catch (err: any) {
			console.error('Google login error:', err);
			setError(err.message || 'Google login failed');
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center py-[30px]'>
			<div className='bg-white max-w-[580px] min-w-[320px] w-full mx-auto py-6 px-4 rounded-lg shadow-lg'>
				<div className='w-full flex items-center justify-center gap-2 mb-8'>
					<MiniLogo />
					<Logo />
				</div>

				{error && <p className='text-red-500 px-4 mb-4'>{error}</p>}

				<form
					onSubmit={handleLogin}
					className='mb-4'
				>
					<div className='mb-4'>
						<label className='block mb-2 text-[var(--text-dark)]'>
							Email:
						</label>
						<input
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='auth-input'
							required
						/>
					</div>

					<div className='mb-6'>
						<label className='block mb-2 text-[var(--text-dark)]'>
							Password:
						</label>
						<input
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='auth-input'
							required
						/>
					</div>

					<button
						type='submit'
						className='auth-button primary'
						disabled={status === 'loading'}
					>
						{status === 'loading' ? 'Logging In...' : 'Login'}
					</button>
				</form>

				<button
					onClick={handleGoogleLogin}
					className='auth-button google hover:bg-primary/10'
					disabled={status === 'loading'}
				>
					{status === 'loading'
						? 'Processing...'
						: 'Continue with Google'}
				</button>

				<p className='text-center mt-6'>
					Don't have an account?{' '}
					<NavLink
						to='/signup'
						className='text-primary font-semibold'
					>
						Sign Up
					</NavLink>
				</p>
			</div>
		</div>
	);
};

export default Login;
