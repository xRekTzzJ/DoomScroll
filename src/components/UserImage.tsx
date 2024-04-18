import { FC, useState } from 'react'
import avatar from '../assets/img/avatar.svg'

const UserImage: FC<{ image: string | undefined }> = ({ image }) => {
	const [imageError, setImageError] = useState(false)

	if (imageError) {
		return <img src={avatar} alt='Person avatar.' />
	}
	return (
		<img src={image} alt='Person avatar.' onError={() => setImageError(true)} />
	)
}

export default UserImage
