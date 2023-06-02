import Button from './Button'
import { GoTrashcan } from 'react-icons/go'
import { removeUser } from '../store'
import { useThunk } from '../hooks/useThunk'

function UserListItem({user}) {
    const [doDeleteUser, isDeletingUser, deletingUserError] = useThunk(removeUser)

    const handleUserDelete = () => {
        doDeleteUser(user)
    }

    return (
        <div className="mb-2 border rounded">
            <div className="flex p-2 justify-between items-center cursor-pointer">
                <div className='flex flex-row items-center justify-between'>   
                    <Button className="mr-3" onClick={handleUserDelete} loading={isDeletingUser}>
                        <GoTrashcan />
                    </Button> 
                    {user.name}
                </div>
                {deletingUserError && 'Error deleting user'}
            </div> 
        </div> 
    )
}

export default UserListItem