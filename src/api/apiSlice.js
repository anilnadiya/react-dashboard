import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: '' }) =>
        async ({ url, method, data, params }) => {
            try {
                const result = await axios({ url: baseUrl + url, method, data, params });
                return { data: result.data };
            } catch (error) {
                return {
                    error: { status: error.response?.status, data: error.response?.data },
                };
            }
        };


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:5000/' }),
    endpoints: (builder) => ({
        addClient: builder.mutation({
            query: (newClient) => ({
                url: 'clients',
                method: 'post',
                data: newClient
            })
        })

    })

})

export const { useAddClientMutation } = apiSlice;