import { apiSlice } from './apiSlice';

export const taxManagementSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all tax records
    getAllTaxes: builder.query({
      query: () => '/tax-management',
      providesTags: ['TaxManagement'],
    }),

    // Get a specific tax record by ID
    getTax: builder.query({
      query: (id) => `/tax-management/${id}`,
      providesTags: ['TaxManagement'],
    }),

    // Create a new tax record
    createTax: builder.mutation({
      query: (formData) => ({
        url: '/tax-management',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['TaxManagement'],
    }),

    // Update a tax record
    updateTax: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tax-management/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['TaxManagement'],
    }),

    // Delete a tax record
    deleteTax: builder.mutation({
      query: (id) => ({
        url: `/tax-management/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TaxManagement'],
    }),
  }),
});

export const {
  useGetAllTaxesQuery,
  useGetTaxQuery,
  useCreateTaxMutation,
  useUpdateTaxMutation,
  useDeleteTaxMutation,
} = taxManagementSlice;
