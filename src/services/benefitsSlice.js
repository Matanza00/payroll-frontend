import { apiSlice } from './apiSlice';

export const benefitsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all benefits records
    getAllBenefits: builder.query({
      query: () => '/benefits',
      providesTags: ['Benefits'],
    }),

    // Get a specific benefit record by ID
    getBenefit: builder.query({
      query: (id) => `/benefits/${id}`,
      providesTags: ['Benefits'],
    }),

    // Create a new benefit record
    createBenefit: builder.mutation({
      query: (formData) => ({
        url: '/benefits',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Benefits'],
    }),

    // Update a benefit record
    updateBenefit: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/benefits/${id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data, // Make sure it's an object, not a string
      }),
      invalidatesTags: ['Benefits'],
    }),

    // Delete a benefit record
    deleteBenefit: builder.mutation({
      query: (id) => ({
        url: `/benefits/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Benefits'],
    }),
  }),
});

export const {
  useGetAllBenefitsQuery,
  useGetBenefitQuery,
  useCreateBenefitMutation,
  useUpdateBenefitMutation,
  useDeleteBenefitMutation,
} = benefitsSlice;
