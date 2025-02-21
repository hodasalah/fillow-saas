// Signup.tsx
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import Logo from '../components/logo/logo';
import MiniLogo from '../components/logo/miniLogo';
import { useAppDispatch } from '../hooks/hooks';
import { createUser, loginWithGoogle } from '../store/slices/authActions';

const Signup: React.FC = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const dispatch = useAppDispatch();
	

	// Signup with email and password
	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		try{
dispatch(createUser({email, password}));
		navigate('/login')
		}catch(error: any) {
			setError(error)
		}
		
	};

	// Signup with Google
	const handleGoogleSignup = async () => {
		setError(null);
		dispatch(loginWithGoogle());
		navigate('/dashboard')
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
						onSubmit={handleSignup}
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
								Signup
							</button>
						</div>
					</form>
					<div className='px-2 mb-4'>
						<button
							onClick={handleGoogleSignup}
							className='text-primary w-full rounded-lg border-primary py-2 bg-rgba-primary-1'
						>
							Signup with Google
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
