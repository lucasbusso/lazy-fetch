import { useEffect } from "react"
import { useSelector } from "react-redux"
import { fetchUsers, addUsers } from "../store"
import { useThunk } from "../hooks/useThunk"
import SkeletonSpinner from "./SkeletonSpinner"
import Button from './Button'
import UserListItem from "./UserListItem"

function UsersList() {
    const [doFetchUsers, isLoadingUsers, fetchingUserError] = useThunk(fetchUsers)
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUsers)
    
    const { data } = useSelector((state) => {
        return state.users
    })

    useEffect(() => {
        doFetchUsers()
    }, [doFetchUsers]);

    const handleUserAdd = () => {
        doCreateUser()
    }

    let content
    if(isLoadingUsers) {
        content = <SkeletonSpinner times={1} className="h-10 w-full"/>
    } else if (fetchingUserError) {
        content = <div>Error fetching data</div>
    } else {
        content = data.map((user) => {
            return (
                <UserListItem key={user.id} user={user}/>
            )
        })
    }

    return(
        <div>
            <div className="flex flex-grow justify-between m-3">
                <h1 className="m-2 text-xl">Users</h1>
                <Button onClick={handleUserAdd} loading={isCreatingUser}>Add User</Button>
                { creatingUserError && 'Error creating user' }
            </div>
            {content}
        </div>
    )
}

export default UsersList