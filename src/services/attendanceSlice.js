import { apiSlice } from './apiSlice';

export const attendanceTrackingSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all attendance records
    getAllAttendances: builder.query({
      query: () => '/attendance-tracking',
      providesTags: ['AttendanceTracking'],
    }),

    // Get a specific attendance record by ID
    getAttendance: builder.query({
      query: (id) => `/attendance-tracking/${id}`,
      providesTags: ['AttendanceTracking'],
    }),

    // Create a new attendance record
    createAttendance: builder.mutation({
      query: (formData) => ({
        url: '/attendance-tracking',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['AttendanceTracking'],
    }),

    // Update an attendance record
    updateAttendance: builder.mutation({
      query: ({ id, data }) => ({
        url: `/attendance-tracking/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['AttendanceTracking'],
    }),

    // Delete an attendance record
    deleteAttendance: builder.mutation({
      query: (id) => ({
        url: `/attendance-tracking/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AttendanceTracking'],
    }),
  }),
});

export const {
  useGetAllAttendancesQuery,
  useGetAttendanceQuery,
  useCreateAttendanceMutation,
  useUpdateAttendanceMutation,
  useDeleteAttendanceMutation,
} = attendanceTrackingSlice;
