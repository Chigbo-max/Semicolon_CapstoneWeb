import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = "http://localhost:8080/"

export const androidAntiTheftApi = createApi({
    reducerPath: 'androidAntiTheftApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({

        //devices
        generateEnrollmentUrl: builder.query({
            query: () => "api/v1/device/enrol",
        })
        ,
        getDeviceDetails: builder.query({
            query: (deviceId) => `api/v1/device/deviceDetails/${deviceId}`,
        }),

        getDeviceMetaData: builder.query({
            query: (deviceId) => `api/v1/device/meta-data/${deviceId}`,
        }),

        getDeviceLocation: builder.query({
            query: (deviceId) => `api/v1/device/location/${deviceId}`,
        }),

        //commands
        lockDevice: builder.mutation({
            query: (deviceId) => ({
                url: `api/v1/commands/lock/${deviceId}`,
                method: 'POST',
            })
        }),

        wipeDevice: builder.mutation({
            query: (deviceId) => ({
                url: `api/v1/commands/wipe/${deviceId}`,
                method: 'POST',
            })
        }),

        issueCommand: builder.mutation({
            query: ({ command }) => ({
                url: `api/v1/commands/issue`,
                method: 'POST',
                body: command,
            })
        }),

        //contacts
        addTrustedContact: builder.mutation({
            query: ({ deviceId, contact }) => ({
                url: `api/v1/trusted-contact/add/${deviceId}`,
                method: 'POST',
                body: contact,
            })
        }),

        deleteTrustedContact: builder.mutation({
            query: ({ deviceId, contactId }) => ({
                url: `api/v1/trusted-contact/delete/${deviceId}/${contactId}`,
                method: 'DELETE',
            })
        }),

        getTrustedContacts: builder.query({
            query: (deviceId) => `api/v1/trusted-contact/${deviceId}`,
        }),

        updateTrustedContact: builder.mutation({
            query: ({ deviceId, contactId, contact }) => ({
                url: `/devices/${deviceId}/contacts/${contactId}`,
                method: 'PUT',
                body: contact,
            }),
        }),

        //theftReport
        reportTheft: builder.mutation({
            query: (deviceId) => ({
                url: `api/v1/theft/report/${deviceId}`,
                method: 'POST',
            })
        }),



    }),
})



export const {
    useUpdateTrustedContactMutation,
    useGenerateEnrollmentUrlQuery,
    useGetDeviceDetailsQuery,
    useGetDeviceMetaDataQuery,
    useGetDeviceLocationQuery,
    useLockDeviceMutation,
    useWipeDeviceMutation,
    useIssueCommandMutation,
    useAddTrustedContactMutation,
    useDeleteTrustedContactMutation,
    useGetTrustedContactsQuery,
    useReportTheftMutation

} = androidAntiTheftApi

