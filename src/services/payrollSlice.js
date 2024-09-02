import { apiSlice } from './apiSlice';

export const payrollSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all payroll records
    getAllPayrollRecords: builder.query({
      query: () => '/payroll',
      transformResponse: (response) => {
        // If your API response is not already structured correctly, adjust it here
        return response; // or modify as needed
      },
      providesTags: ['Payroll'],
    }),

    // Get a specific payroll record by ID
    getPayrollRecord: builder.query({
      query: (id) => `/payroll/${id}`,
      providesTags: ['Payroll'],
    }),

    // Create a new payroll record
    createPayrollRecord: builder.mutation({
      query: (formData) => ({
        url: '/payroll',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Payroll'],
    }),

    // Update a payroll record
    updatePayrollRecord: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/payroll/${id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data, // Ensure it's an object, not a string
      }),
      invalidatesTags: ['Payroll'],
    }),

    // Delete a payroll record
    deletePayrollRecord: builder.mutation({
      query: (id) => ({
        url: `/payroll/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Payroll'],
    }),
  }),
});

export const {
  useGetAllPayrollRecordsQuery,
  useGetPayrollRecordQuery,
  useCreatePayrollRecordMutation,
  useUpdatePayrollRecordMutation,
  useDeletePayrollRecordMutation,
} = payrollSlice;
