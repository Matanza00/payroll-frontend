// taxParametersSlice.js
import { apiSlice } from './apiSlice';

export const taxParametersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all tax parameters
    getAllTaxParameters: builder.query({
      query: () => '/tax-parameters',
      providesTags: ['TaxParameters'],
    }),

    // Get a specific tax parameter by ID
    getTaxParameter: builder.query({
      query: (id) => `/tax-parameters/${id}`,
      providesTags: ['TaxParameters'],
    }),

    // Create a new tax parameter
    createTaxParameter: builder.mutation({
      query: (formData) => ({
        url: '/tax-parameters',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['TaxParameters'],
    }),

    // Update a tax parameter
    updateTaxParameter: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tax-parameters/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['TaxParameters'],
    }),

    // Delete a tax parameter
    deleteTaxParameter: builder.mutation({
      query: (id) => ({
        url: `/tax-parameters/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TaxParameters'],
    }),
  }),
});

export const {
  useGetAllTaxParametersQuery,
  useGetTaxParameterQuery,
  useCreateTaxParameterMutation,
  useUpdateTaxParameterMutation,
  useDeleteTaxParameterMutation,
} = taxParametersSlice;
