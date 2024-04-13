import { useState } from 'react'
import avatar from '../assets/img/avatar.png'

const UserImage = ({ image }: { image: string | undefined }) => {
	const [imageError, setImageError] = useState(false)

	if (imageError) {
		return <img src={avatar} alt='Person avatar.' />
	}
	return (
		<img src={image} alt='Person avatar.' onError={() => setImageError(true)} />
	)
}

export default UserImage
