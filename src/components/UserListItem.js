import Button from './Button'
import { GoTrashcan } from 'react-icons/go'
import { removeUser } from '../store'
import { useThunk } from '../hooks/useThunk'
import ExpandablePanel from './ExpandablePanel'
import AlbumsList from './AlbumsList'

function UserListItem({user}) {
    const [doDeleteUser, isDeletingUser, deletingUserError] = useThunk(removeUser)

    const handleUserDelete = () => {
        doDeleteUser(user)
    }

    const header = <>
        <Button className="mr-3" onClick={handleUserDelete} loading={isDeletingUser}>
            <GoTrashcan />
        </Button> 
        {user.name}
        {deletingUserError && 'Error deleting user'}
    </>
    return (
        <ExpandablePanel header={header}>
          <AlbumsList user={user}/>
        </ExpandablePanel>
    )
}

export default UserListItem