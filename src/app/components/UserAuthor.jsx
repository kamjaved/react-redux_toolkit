import { useSelector } from 'react-redux';
import { getUserById } from '../../redux/slices/userSlice';

const UserAuthor = ({ userId }) => {
	const user = useSelector((state) => getUserById(state, Number(userId)));
	// const author = users.find(user => user.id === userId);

	return <span> by {user ? user.name : 'Unknown author'}</span>;
};

export default UserAuthor;
