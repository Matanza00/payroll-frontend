import { apiSlice } from './apiSlice';

export const paySlipSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all pay slips
    getAllPaySlips: builder.query({
      query: () => '/pay-slips',
      providesTags: ['PaySlip'],
    }),

    // Get a specific pay slip by ID
    getPaySlip: builder.query({
      query: (id) => `/pay-slips/${id}`,
      providesTags: ['PaySlip'],
    }),

    // Create a new pay slip
    createPaySlip: builder.mutation({
      query: (formData) => ({
        url: '/pay-slips',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['PaySlip'],
    }),

    // Update a pay slip
    updatePaySlip: builder.mutation({
      query: ({ id, data }) => ({
        url: `/pay-slips/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['PaySlip'],
    }),

    // Delete a pay slip
    deletePaySlip: builder.mutation({
      query: (id) => ({
        url: `/pay-slips/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PaySlip'],
    }),
  }),
});

export const {
  useGetAllPaySlipsQuery,
  useGetPaySlipQuery,
  useCreatePaySlipMutation,
  useUpdatePaySlipMutation,
  useDeletePaySlipMutation,
} = paySlipSlice;
