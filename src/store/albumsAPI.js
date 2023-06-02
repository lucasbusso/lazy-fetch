import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const albumsApi = createApi({
    reducerPath: 'albums',
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
