import { apiSlice } from './apiSlice';

export const directDepositSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all direct deposit records
    getAllDirectDeposits: builder.query({
      query: () => '/direct-deposits',
      providesTags: ['DirectDeposit'],
    }),

    // Get a specific direct deposit record by ID
    getDirectDeposit: builder.query({
      query: (id) => `/direct-deposits/${id}`,
      providesTags: ['DirectDeposit'],
    }),

    // Create a new direct deposit record
    createDirectDeposit: builder.mutation({
      query: (formData) => ({
        url: '/direct-deposits',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['DirectDeposit'],
    }),

    // Update a direct deposit record
    updateDirectDeposit: builder.mutation({
      query: ({ id, data }) => ({
        url: `/direct-deposits/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['DirectDeposit'],
    }),

    // Delete a direct deposit record
    deleteDirectDeposit: builder.mutation({
      query: (id) => ({
        url: `/direct-deposits/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['DirectDeposit'],
    }),
  }),
});

export const {
  useGetAllDirectDepositsQuery,
  useGetDirectDepositQuery,
  useCreateDirectDepositMutation,
  useUpdateDirectDepositMutation,
  useDeleteDirectDepositMutation,
} = directDepositSlice;
