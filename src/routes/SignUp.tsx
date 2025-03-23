import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import Logo from '../components/logo/logo';
import MiniLogo from '../components/logo/miniLogo';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { createUser, loginWithGoogle } from '../store/slices/authActions';

const Signup: React.FC = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const dispatch = useAppDispatch();
	const {
		currentUser,
		status,
		error: authError,
	} = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (currentUser) {
			navigate('/dashboard');
		}
	}, [currentUser, navigate]);

	useEffect(() => {
		if (authError) {
			setError(authError);
		}
	}, [authError]);

	// Signup with email and password
	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		try {
			const userDocRef = doc(db, 'users', email);
			const userDocSnap = await getDoc(userDocRef);
			if (userDocSnap.exists()) {
				setError('Email already exists. Please log in.');
				return; // Stop the signup process
			} else {
				await dispatch(createUser({ email, password, name }));
			}
		} catch (err: any) {
			setError(err.message || 'An error occurred during signup.');
		}
	};

	// Signup with Google
	const handleGoogleSignup = async () => {
		setError(null);
		try {
			await dispatch(loginWithGoogle());
		} catch (err: any) {
			setError(err.message || 'An error occurred during Google signup.');
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
					{error && <p className='text-red-500 px-4'>{error}</p>}
					<form
						onSubmit={handleSignup}
						className='mb-4'
					>
						<div className='mb-4 text-[var(--text-dark)] px-2'>
							<label
								className='block mb-2'
								htmlFor='name'
							>
								Name:
							</label>
							<input
								className='rounded-[0.625rem] border-[0.0625rem] border-border h-[2.9rem] w-full'
								type='text'
								value={name}
								name='name'
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
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
								disabled={status === 'loading'}
							>
								{status === 'loading'
									? 'Signing up...'
									: 'Signup'}
							</button>
						</div>
					</form>
					<div className='px-2 mb-4'>
						<button
							onClick={handleGoogleSignup}
							className='text-primary w-full rounded-lg border-primary py-2 bg-rgba-primary-1'
							disabled={status === 'loading'}
						>
							{status === 'loading'
								? 'Signing up with Google...'
								: 'Signup with Google'}
						</button>
					</div>
					<p className='px-4'>
						Already have an account{'  '}
						<NavLink
							to='/login'
							className={'text-primary'}
						>
							Login
						</NavLink>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Signup;
