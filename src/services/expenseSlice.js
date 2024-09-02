import { apiSlice } from './apiSlice';

export const expenseSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all expenses
    getAllExpenses: builder.query({
      query: () => '/expenses',
      providesTags: ['Expense'],
    }),

    // Get a specific expense by ID
    getExpense: builder.query({
      query: (id) => `/expenses/${id}`,
      providesTags: ['Expense'],
    }),

    // Create a new expense
    createExpense: builder.mutation({
      query: (formData) => ({
        url: '/expenses',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Expense'],
    }),

    // Update an expense
    updateExpense: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/expenses/${id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data, // No need to stringify here
      }),
      invalidatesTags: ['Expense'],
    }),

    // Delete an expense
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Expense'],
    }),
  }),
});

export const {
  useGetAllExpensesQuery,
  useGetExpenseQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseSlice;
