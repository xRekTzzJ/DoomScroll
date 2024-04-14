import { ConfigProvider, Modal } from 'antd'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../core/hooks/hooks'
import { logOut } from '../core/store/actions'

const LogOutModal = ({
	active,
	logOutHandler,
}: {
	active: boolean
	logOutHandler: (arg: boolean) => void
}) => {
	const dispatch = useAppDispatch()

	const theme = useSelector((state: { theme: boolean }) => state.theme)

	const navigate = useNavigate()

	return (
		<ConfigProvider
			theme={{
				components: {
					Modal: {
						headerBg: theme ? '#f0f0f0' : '#2C2C54',
						contentBg: theme ? '#f0f0f0' : '#2C2C54',
						titleColor: theme ? '#2C2C54' : '#ffffff',
						colorText: theme ? '#2C2C54' : '#ffffff',
						borderRadiusLG: 20,
					},
				},
			}}
		>
			<Modal
				title='Log out'
				open={active}
				onOk={() => {
					logOutHandler(false)
					dispatch(logOut())
					navigate('/')
					toast.success('You have successfully logged out!')
				}}
				onCancel={() => {
					logOutHandler(false)
				}}
			>
				<p>Do you really want to log out?</p>
			</Modal>
		</ConfigProvider>
	)
}

export default LogOutModal
