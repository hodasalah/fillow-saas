import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { createUser, loginWithGoogle } from '../../../store/slices/authActions';
import Logo from '../../../components/logo/logo';
import MiniLogo from '../../../components/logo/miniLogo';

const Signup: React.FC = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const dispatch = useAppDispatch();
	const { status, error: authError } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (authError) setError(authError);
	}, [authError]);

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		try {
			const result = await dispatch(
				createUser({ email, password, name }),
			);

			if (createUser.fulfilled.match(result)) {
				navigate('/dashboard');
			}
		} catch (err: any) {
			if (err.code === 'auth/email-already-in-use') {
				setError('Email already registered. Please login instead.');
			} else {
				setError(err.message || 'Signup failed. Please try again.');
			}
		}
	};

	const handleGoogleSignup = async () => {
		setError(null);
		try {
			await dispatch(loginWithGoogle());
		} catch (err: any) {
			setError(err.message || 'Google signup failed');
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
					onSubmit={handleSignup}
					className='mb-4'
				>
					<div className='mb-4'>
						<label className='block mb-2 text-[var(--text-dark)]'>
							Name:
						</label>
						<input
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
							className='auth-input'
							required
						/>
					</div>

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
						{status === 'loading'
							? 'Creating Account...'
							: 'Sign Up'}
					</button>
				</form>

				<button
					onClick={handleGoogleSignup}
					className='auth-button google hover:bg-primary/10'
					disabled={status === 'loading'}
				>
					{status === 'loading'
						? 'Processing...'
						: 'Continue with Google'}
				</button>

				<p className='text-center mt-6'>
					Already have an account?{' '}
					<NavLink
						to='/login'
						className='text-primary font-semibold'
					>
						Login
					</NavLink>
				</p>
			</div>
		</div>
	);
};

export default Signup;
