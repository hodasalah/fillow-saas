// Login.tsx
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import Logo from '../components/logo/logo';
import MiniLogo from '../components/logo/miniLogo';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { loginUser, loginWithGoogle } from '../store/slices/authActions';

const Login: React.FC = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.auth);

	useEffect(() => {
		// Navigate to dashboard once the user object is set
		if (user) {
			navigate('/dashboard');
		}
	}, [user, navigate]);
	// Handle login with email and password
	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log(email, password);
		setError(null);
		try {
			dispatch(loginUser({ email, password }));
			navigate('/dashboard'); // Navigate to the protected dashboard page
		} catch (err: any) {
			// If error indicates user not found, show a specific message.
			setError(err.message);
		}
	};
	// Handle login with Google

	const handleGoogleLogin = async () => {
		setError(null);
		try {
			dispatch(loginWithGoogle());
			navigate('/dashboard');
		} catch (err: any) {
			setError(err.message);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center py-[30px]'>
			<div className='bg-white max-w-[580px] min-w-[320px] w-full mx-auto py-6 px-4 rounded-lg shadow-lg'>
				<div className='w-full'>
					<div className='w-full flex items-center justify-center gap-2 mb-8'>
						<MiniLogo />
						<Logo />
					</div>
					{error && <p style={{ color: 'red' }}>{error}</p>}
					<form
						onSubmit={handleLogin}
						className='mb-4'
					>
						<div className='mb-4 text-[var(--text-dark)] px-2'>
							<label
								className='block mb-2'
								htmlFor='email'
							>
								Email:
							</label>
							<input
								className='rounded-[0.625rem] border-[0.0625rem] border-border h-[2.9rem] w-full'
								type='email'
								value={email}
								name='email'
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>

						<div className='mb-4 text-[var(--text-dark)] px-2'>
							<label
								className='block mb-2'
								htmlFor='password'
							>
								Password:
							</label>
							<input
								type='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								name='password'
								className='rounded-[0.625rem] border-[0.0625rem] border-border h-[2.9rem] w-full'
							/>
						</div>
						<div className='px-2'>
							<button
								type='submit'
								className='bg-primary w-full rounded-lg py-2 text-white'
							>
								Login
							</button>
						</div>
					</form>
					<div className='px-2 mb-4'>
						<button
							onClick={handleGoogleLogin}
							className='text-primary w-full rounded-lg border-primary py-2 bg-rgba-primary-1'
						>
							Login with Google
						</button>
					</div>
					<p className='px-4'>
						Don't have an account?{' '}
						<NavLink
							to='/signup'
							className={'text-primary'}
						>
							Sign Up
						</NavLink>
					</p>
				</div>
			</div>
		</div>
	);
};
export default Login;
