import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../../hooks/hooks'
import { loginUser } from '../../store/actions'
import classes from '../SignUp/form.module.scss'

interface Inputs {
	email: string
	password: string
}

const SignIn = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
	} = useForm<Inputs>({
		mode: 'onChange',
	})

	const login = async ({
		email,
		password,
	}: {
		email: string
		password: string
	}) => {
		setLoading(true)

		try {
			await dispatch(loginUser({ email, password }))
			setLoading(false)
			navigate('/')
			toast.success('You have successfully logged in to your profile!')
		} catch (error) {
			toast.error('The email or password is incorrect.')
			setLoading(false)
			reset()
		}
	}

	const onSubmit = ({
		email,
		password,
	}: {
		email: string
		password: string
	}) => {
		login({ email, password })
	}

	if (loading) {
		return (
			<section className={classes['form']}>
				<Spin
					indicator={
						<LoadingOutlined
							style={{
								width: '100%',
								fontSize: 48,
							}}
							spin
						/>
					}
				/>
			</section>
		)
	}

	return (
		<section className={classes['form']}>
			<h2>Sign In</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor='email'>Email address</label>
					<input
						type='email'
						id='email'
						placeholder='Email address'
						value={watch('email', '')}
						style={
							errors.email
								? {
										outline: 'none',
										borderColor: '#F5222D',
								  }
								: {}
						}
						{...register('email', {
							required: 'Email field is require.',
							pattern: {
								value:
									/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
								message: 'Please enter valid email.',
							},
						})}
					/>
					<label
						htmlFor='email'
						style={{
							visibility: errors.email ? 'visible' : 'hidden',
							color: '#F5222D',
						}}
					>
						{errors.email ? errors.email.message : 'text'}
					</label>
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						value={watch('password', '')}
						placeholder='Password'
						{...register('password', {
							required: 'Password field is require',
							minLength: {
								value: 6,
								message: 'Your password needs to be at least 6 characters.',
							},
							maxLength: {
								value: 40,
								message: 'Your password needs to be shortest 40 characters.',
							},
						})}
						style={
							errors.password
								? {
										outline: 'none',
										borderColor: '#F5222D',
								  }
								: {}
						}
					/>
					<label
						htmlFor='password'
						style={{
							visibility: errors.password ? 'visible' : 'hidden',
							color: '#F5222D',
						}}
					>
						{errors.password ? errors.password.message : 'text'}
					</label>
				</div>
				<button type='submit'>Login</button>
			</form>
			<span>
				Don’t have an account? <Link to='/sign-up'>Sign Up.</Link>
			</span>
		</section>
	)
}

export default SignIn
