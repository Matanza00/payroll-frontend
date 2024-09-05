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

    // Search Query with Pagination, Sorting, and Dynamic Filters
    getAllTaxesFromTaxRoute: builder.query({
      query: ({
        page = 1,
        limit = 10,
        sortBy = 'id',
        sortType = 'desc', // Default to 'desc' if not specified
        searchTerm,
        keys,
        filters = {},
      }) => {
        const params = new URLSearchParams();

        // Add basic pagination, sorting parameters
        params.append('page', page);
        params.append('limit', limit);
        params.append('sortBy', sortBy);
        params.append('sortType', sortType);

        // Add search parameter if provided
        if (searchTerm) params.append('search', searchTerm);
        if (keys) params.append('keys', keys);

        // Add dynamic filters to the query params
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            params.append(key, value);
          }
        });

        // Construct the API route with the query parameters
        return `/tax-management/tax?${params.toString()}`;
      },
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
  useGetAllTaxesFromTaxRouteQuery,
  useCreateTaxMutation,
  useUpdateTaxMutation,
  useDeleteTaxMutation,
} = taxManagementSlice;
