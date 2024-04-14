import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
	createArticle,
	updateArticle,
} from '../core/services/realworld-service'
import { getArticle } from '../core/store/actions'

import { useAppDispatch } from '../core/hooks/hooks'
import { IArticleState, ICreateArticle, IUserState } from '../core/types/types'
import classes from '../styles/article-form.module.scss'

const ArticleForm = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	const [loading, setLoading] = useState(true)
	const slug = location.state ? location.state.slug : undefined
	const token = useSelector((state: IUserState) => state.user.token)
	const { title, description, body, tagList } = useSelector(
		(state: IArticleState) => state.article
	)

	const loadArticle = async () => {
		try {
			await dispatch(getArticle(slug, token))
			setLoading(false)
		} catch {
			setLoading(false)
		}
	}

	useEffect(() => {
		setLoading(true)
		if (location.pathname !== '/new-article' && !slug) {
			navigate('/new-article')
		}
		if (!slug) {
			reset()
			setLoading(false)
		} else {
			loadArticle()
		}
	}, [slug])

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		getValues,
		reset,
		control,
	} = useForm<ICreateArticle>({
		values: {
			title: slug && title ? title : '',
			description: slug && description ? description : '',
			body: slug && body ? body : '',
			tagList:
				slug && tagList
					? [
							{ value: '', isAdded: false },
							...tagList.map(i => {
								return { value: i, isAdded: true }
							}),
					  ]
					: [{ value: '', isAdded: false }],
		},
		mode: 'onChange',
	})

	const onRemoveTag = (index: number) => {
		if (index > 0) {
			remove(index)
		} else {
			update(index, { value: '', isAdded: false })
		}
	}

	const onAddTag = (index: number, array: any) => {
		if (array.length === 6) {
			return
		}
		const inputValue = getValues('tagList')[index].value
		if (inputValue.length > 0) {
			append(
				{ value: inputValue, isAdded: true },
				{
					focusIndex: 0,
				}
			)
			update(index, { value: '', isAdded: false })
		}
	}

	const onSubmit = async (data: ICreateArticle) => {
		setLoading(true)
		if (!slug) {
			try {
				await createArticle(
					{
						...data,
						tagList: data.tagList
							.map(i => i.value.length && i.value.trim())
							.filter(i => i),
					},
					token
				)
				setLoading(false)
				navigate('/')
				toast.success('You have successfully created an article!')
			} catch {
				toast.error('Something went wrong.')
			} finally {
				setLoading(false)
			}
		} else {
			try {
				await updateArticle(
					{
						...data,
						tagList: data.tagList
							.map(i => i.value.length && i.value.trim())
							.filter(i => i),
					},
					slug,
					token
				)
				setLoading(false)
				navigate(`/articles/${slug}/`)
				toast.success('You have successfully update an article!')
			} catch {
				toast.error('Something went wrong.')
			} finally {
				setLoading(false)
			}
		}
	}

	const { fields, remove, append, update } = useFieldArray({
		control,
		name: 'tagList',
	})

	const TagList = () => {
		return (
			<div className={classes['article-form__tag-list']}>
				<span>Tags (no more than 5)</span>
				{fields.map((field, index, array) => {
					return index === 0 && array.length === 6 ? null : (
						<div key={field.id}>
							<input
								{...register(`tagList.${index}.value`)}
								placeholder='Tag'
							/>
							{index !== 0 && (
								<button
									type='button'
									onClick={() => {
										onRemoveTag(index)
									}}
									style={{
										color: '#F5222D',
										borderColor: '#F5222D',
									}}
								>
									Delete
								</button>
							)}
							{!field.isAdded && array.length !== 6 ? (
								<button
									type='button'
									onClick={() => {
										onAddTag(index, array)
									}}
									style={{
										color: '#1890FF',
										borderColor: '#1890FF',
									}}
								>
									Add
								</button>
							) : null}
						</div>
					)
				})}
			</div>
		)
	}

	if (loading) {
		return (
			<section className={classes['article-form']}>
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
		<section className={classes['article-form']}>
			{slug ? <h2>Edit article</h2> : <h2>Create new article</h2>}
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						id='title'
						placeholder='Title'
						value={watch('title', '')}
						style={
							errors.title
								? {
										outline: 'none',
										borderColor: '#F5222D',
								  }
								: {}
						}
						{...register('title', {
							pattern: {
								value: /^[^\s]+(?:$|.*[^\s]+$)/,
								message: 'The title should not start and end with a space',
							},
							maxLength: {
								value: 110,
								message: 'Maximum of 110 characters.',
							},
							minLength: {
								value: 5,
								message: 'Minimum of 5 characters.',
							},
							required: 'Title field is require.',
						})}
					/>
					<label
						htmlFor='title'
						style={{
							visibility: errors.title ? 'visible' : 'hidden',
							color: '#F5222D',
						}}
					>
						{errors.title ? errors.title.message : 'text'}
					</label>
				</div>
				<div>
					<label htmlFor='description'>Short description</label>
					<input
						type='text'
						id='description'
						placeholder='Description'
						value={watch('description', '')}
						style={
							errors.description
								? {
										outline: 'none',
										borderColor: '#F5222D',
								  }
								: {}
						}
						{...register('description', {
							required: 'Description field is require.',
							pattern: {
								value: /^[^\s]+(?:$|.*[^\s]+$)/,
								message:
									'The description should not start and end with a space',
							},
							maxLength: {
								value: 250,
								message: 'Maximum of 250 characters.',
							},
							minLength: {
								value: 5,
								message: 'Minimum of 5 characters.',
							},
						})}
					/>
					<label
						htmlFor='description'
						style={{
							visibility: errors.description ? 'visible' : 'hidden',
							color: '#F5222D',
						}}
					>
						{errors.description ? errors.description.message : 'text'}
					</label>
				</div>
				<div>
					<label htmlFor='body'>Text</label>
					<textarea
						id='body'
						placeholder='Text'
						value={watch('body', '')}
						style={
							errors.body
								? {
										outline: 'none',
										borderColor: '#F5222D',
								  }
								: {}
						}
						{...register('body', {
							pattern: {
								value: /^[^\s]+(?:$|.*[^\s]+$)/,
								message: 'The text should not start and end with a space',
							},
							required: 'Text field is require.',
							minLength: {
								value: 10,
								message: 'Minimum of 10 characters.',
							},
						})}
					/>
					<label
						htmlFor='body'
						style={{
							visibility: errors.body ? 'visible' : 'hidden',
							color: '#F5222D',
						}}
					>
						{errors.body ? errors.body.message : 'text'}
					</label>
				</div>
				<TagList />
				<button type='submit'>Send</button>
			</form>
		</section>
	)
}

export default ArticleForm
