import { ConfigProvider, Modal } from 'antd'

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

	const navigate = useNavigate()

	return (
		<ConfigProvider
			theme={{
				components: {
					Modal: {
						headerBg: '#2C2C54',
						contentBg: '#2C2C54',
						titleColor: '#ffffff',
						colorText: '#f0f0f0',
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
