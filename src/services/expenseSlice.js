import { apiSlice } from './apiSlice';

export const expenseSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all expenses with pagination and search
    getExpensesByCompanyId: builder.query({
      query: ({ companyId, page, limit, searchTerm }) => {
        let queryString = `/expenses/company/${companyId}?page=${page}&limit=${limit}`;
        if (searchTerm) {
          queryString += `&search=${searchTerm}`;
        }
        return queryString;
      },
      providesTags: ['Expense'],
    }),
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

    // Get the latest/previous Expense record by employeeId
    getLastDateExpenseRecords: builder.query({
      query: (employeeId) => `/expenses/latest/${employeeId}`,
      providesTags: ['Expenses'],
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
  useGetExpensesByCompanyIdQuery,
  useGetAllExpensesQuery,
  useGetExpenseQuery,
  useGetLastDateExpenseRecordsQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseSlice;
