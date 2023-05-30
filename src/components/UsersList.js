import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers, addUsers } from "../store"
import SkeletonSpinner from "./SkeletonSpinner"
import Button from './Button'

function UsersList() {
    const dispatch = useDispatch()
    
    const {isLoading, data, error} = useSelector((state) => {
        return state.users
    })

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    function handleUserAdd() {
        dispatch(addUsers())
    }

    if(isLoading) {
        return <SkeletonSpinner times={6} className="h-10 w-full"/>
    }
    if(error) {
        return <div>Error fetching data...</div>
    }

    const renderedUsers = data.map((user) => {
        return (
            <div key={user.id} className="mb-2 border rounded">
                <div className="flex p-2 justify-between items-center cursor-pointer">
                    {user.name}
                </div>
            </div>
        )
    })
    return(
        <div>
            <div className="flex flex-grow justify-between m3">
                <h1 className="m-2 text-xl">Users</h1>
                <Button onClick={handleUserAdd}>
                    Add User
                </Button>
            </div>
            {renderedUsers}
        </div>
    )
}

export default UsersList