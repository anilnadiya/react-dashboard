import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

// const axiosBaseQuery___ =
//     ({ baseUrl } = { baseUrl: '' }) =>
//         async ({ url, method, data, params }) => {
//             try {
//                 const result = await axios({ url: baseUrl + url, method, data, params });
//                 return { data: result.data };
//             } catch (error) {
//                 return {
//                     error: { status: error.response?.status, data: error.response?.data },
//                 };
//             }
//         };

const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: '' }) =>
        async ({ url, method, data, params }) => {
            try {
                // Get the token from localStorage
                const token = localStorage.getItem('authToken');
                console.log('token-get', token)
                // Configure headers
                const headers = {};
                if (token) {
                    headers['Authorization'] = `${token}`;
                }

                // Make the request
                const result = await axios({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    headers,
                });

                return { data: result.data };
            } catch (error) {
                return {
                    error: { status: error.response?.status, data: error.response?.data },
                };
            }
        };


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_APP_API_BASE_URL }),
    endpoints: (builder) => ({
        addClient: builder.mutation({
            query: (newClient) => ({
                url: 'clientsave',
                method: 'post',
                data: newClient
            })
        }),
        updateClient: builder.mutation({
            query: ({ id, ...updateClientData }) => ({
                url: `clients/${id}`,
                method: 'put',
                data: updateClientData
            })
        }),
        deleteClient: builder.mutation({
            query: ({ id }) => ({
                url: `deleteClientSingle/${id}`,
                method: 'POST',
                //data: updateClientData
            })
        }),
        // deleteClient: builder.mutation({
        //     query: ({id}) => ({
        //         url: `deleteClientSingle/${id}`,
        //         method: 'delete',
        //         //data: updateClientData
        //     })
        // }),
        loginUser: builder.mutation({
            query: (postData) => ({
                url: 'authenticate',
                method: 'post',
                data: postData
            })
        }),

    })

})

export const { useLoginUserMutation, useAddClientMutation, useUpdateClientMutation, useDeleteClientMutation } = apiSlice;