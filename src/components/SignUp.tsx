import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../core/hooks/hooks'
import { registerNewUser } from '../core/store/actions'
import { ISignUpInputs, IUserData } from '../core/types/types'
import classes from '../styles/form.module.scss'

const SignUp = () => {
	const [loading, setLoading] = useState(false)
	const [agree, setAgree] = useState(false)

	const theme = useSelector((state: { theme: boolean }) => state.theme)

	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		getValues,
		reset,
	} = useForm<ISignUpInputs>({
		mode: 'onChange',
	})

	const buttonClasses = agree ? '' : classes['form__button_disabled']

	const onSubmit = async ({ username, email, password }: IUserData) => {
		setLoading(true)

		try {
			await dispatch(registerNewUser({ username, email, password }))
			setLoading(false)
			navigate('/')
			toast.success('You have successfully registered!')
		} catch (error: any) {
			if (error.status === 422) {
				toast.error('Is already taken.')
			} else {
				toast.error('Something went wrong.')
			}
			setLoading(false)
			reset()
		}
	}

	if (loading) {
		return (
			<section
				className={
					theme
						? `${classes['form']} ${classes['form_light']}`
						: classes['form']
				}
			>
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
		<section
			className={
				theme ? `${classes['form']} ${classes['form_light']}` : classes['form']
			}
		>
			<h2>Create new account</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor='username'>Username</label>
					<input
						type='text'
						id='username'
						value={watch('username', '')}
						placeholder='Username'
						{...register('username', {
							required: 'Username field is require.',
							minLength: {
								value: 3,
								message: 'Your username needs to be at least 3 characters.',
							},
							maxLength: {
								value: 20,
								message: 'Your username needs to be shortest 20 characters.',
							},
							pattern: {
								value: /^[a-z][a-z0-9]*$/,
								message:
									'You can only use lowercase English letters and numbers',
							},
						})}
						style={
							errors.username
								? {
										outline: 'none',
										borderColor: '#F5222D',
								  }
								: {}
						}
					/>
					<label
						htmlFor='username'
						style={{
							visibility: errors.username ? 'visible' : 'hidden',
							color: '#F5222D',
						}}
					>
						{errors.username ? errors.username.message : 'text'}
					</label>
				</div>
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
				<div>
					<label htmlFor='repeatPassword'>Repeat Password</label>
					<input
						type='password'
						id='repeatPassword'
						placeholder='Password'
						value={watch('repeatPassword', '')}
						style={
							errors.repeatPassword
								? {
										outline: 'none',
										borderColor: '#F5222D',
								  }
								: {}
						}
						{...register('repeatPassword', {
							required: 'Please repeat password.',
							validate: i => i === getValues('password'),
						})}
					/>

					<label
						htmlFor='repeatPassword'
						style={{
							visibility: errors.repeatPassword ? 'visible' : 'hidden',
							color: '#F5222D',
						}}
					>
						Passwords must match.
					</label>
				</div>
				<div className={classes['form__agree']}>
					<input
						id='checkbox'
						type='checkbox'
						checked={agree}
						onChange={() => setAgree(agree => !agree)}
					/>
					<label htmlFor='checkbox'>
						I agree to the processing of my personal information
					</label>
				</div>
				<button disabled={!agree} type='submit' className={buttonClasses}>
					Create
				</button>
			</form>
			<span>
				Already have an account? <Link to='/sign-in'>Sign In.</Link>
			</span>
		</section>
	)
}

export default SignUp
