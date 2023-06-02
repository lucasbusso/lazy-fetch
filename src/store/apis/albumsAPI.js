import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const albumsApi = createApi({
    reducerPath: 'albums', // es la key con la que podes acceder con el reducer desde el store
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost:3005"
    }),
    endpoints(builder){
        return {
            fetchAlbums: builder.query({ // aca podria ser mutation
                query: (user) => { // va venir un objeto con con la request conteniendo un name y un id
                    return {
                        url: '/albums', // relativa al baseUrl
                        params: {
                            userId: user.id // query string de la request, en este caso ?userId=user.id(number)
                        },
                        method: 'GET' 
                    }
                }
            })
        }
    }
})

export const { useFetchAlbumsQuery } = albumsApi // hook generado automaticamente por RTK
export { albumsApi }