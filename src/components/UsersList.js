import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers, addUsers, removeUser } from "../store"
import SkeletonSpinner from "./SkeletonSpinner"
import Button from './Button'

function UsersList() {
    const [isLoadingUsers, setIsLoadingUsers] = useState(false)
    const [loadingUsersError, setLoadingUsersError] = useState(null)
    const [isCreatingUser, setIsCreatingUser] = useState(false)
    const [creatingUserError, setCreatingUserError] = useState(null)

    const dispatch = useDispatch()
    
    const { data } = useSelector((state) => {
        return state.users
    })

    useEffect(() => {
      setIsLoadingUsers(true);
      dispatch(fetchUsers())
        .unwrap() // this function returns a new promise that follows the conventional rules of then and catch. The dispatch promise doesn't because all the results are wrapped inside then function
        .then(() => console.log("success"))
        .catch((error) => setLoadingUsersError(error.message))
        .finally(() => setIsLoadingUsers(false))
    }, [dispatch, loadingUsersError]);

    function handleUserAdd() {
        setIsCreatingUser(true)
        dispatch(addUsers())
            .unwrap()
            .then(() => console.log("user created"))
            .catch((error) => setCreatingUserError(error))
            .finally(() => setIsCreatingUser(false))
    }

    function handleUserDelete(uderId) {
        dispatch(removeUser(uderId))
    }


    if(loadingUsersError) {
        return <div>Error fetching data: {loadingUsersError}</div>
    }

    const renderedUsers = data.map((user) => {
        return (
            <div key={user.id} className="mb-2 border rounded">
                <div className="flex p-2 justify-between items-center cursor-pointer">
                    {user.name}
                    <Button onClick={() => handleUserDelete(user.id)}>
                        Delete
                    </Button>
                </div>
            </div>
        )
    })

    return(
        <div>
            <div className="flex flex-grow justify-between m-3">
                <h1 className="m-2 text-xl">Users</h1>
                { isCreatingUser 
                    ? 'Creating' 
                    : <Button onClick={handleUserAdd}>Add User</Button>
                }
                { creatingUserError && 'Error creating user' }
            </div>
            { isLoadingUsers
                ? ( <SkeletonSpinner times={data.length} className="h-10 w-full"/> )
                : ( renderedUsers )
            }
        </div>

    )
}

export default UsersList