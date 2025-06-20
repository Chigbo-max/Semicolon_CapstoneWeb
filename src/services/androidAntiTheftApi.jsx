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

        getAllDevices: builder.query({
            query: () => "api/v1/device/all",
        }),

        getDeviceDetails: builder.query({
            query: (deviceId) => `api/v1/device/deviceDetails/${deviceId}`,
        }),

        getDeviceMetaData: builder.query({
            query: (deviceId) => `api/v1/device/meta-data`,
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

        reportTheft: builder.mutation({
            query: (deviceId) => ({
                url: `api/v1/theft/report`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'deviceId': deviceId,
                },
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
                query: ({ deviceId, contact }) => ({
                    url: `api/v1/trusted-contact/delete/${deviceId}`,
                    method: 'DELETE',
                    body: {
                        email: contact.email
                    }
                })
            }),

            getTrustedContacts: builder.query({
                query: (deviceId) => `api/v1/trusted-contact/${deviceId}`,
            }),

            updateTrustedContact: builder.mutation({
                query: ({ deviceId, contact }) => ({
                    url: `/devices/${deviceId}/contacts`,
                    method: 'PUT',
                    body: contact,
                }),
            }),



        }),
    })



export const {
        useGetAllDevicesQuery,
        useUpdateTrustedContactMutation,
        useGenerateEnrollmentUrlQuery,
        useGetDeviceDetailsQuery,
        useGetDeviceMetaDataQuery,
        useGetDeviceLocationQuery,
        useLockDeviceMutation,
        useWipeDeviceMutation,
        useAddTrustedContactMutation,
        useDeleteTrustedContactMutation,
        useGetTrustedContactsQuery,
        useReportTheftMutation

    } = androidAntiTheftApi

