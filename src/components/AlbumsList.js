import { useFetchAlbumsQuery } from "../store"

function AlbumsList({ user }) {
    const {data, error, isLoading} = useFetchAlbumsQuery(user)
    console.log(data, error, isLoading)

    return(
        <div>
            <div>
                Albums for {user.name}
            </div>
            <div></div>
        </div>
        
    )
}

export default AlbumsList