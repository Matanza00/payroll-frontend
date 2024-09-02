import React from 'react';
import { useGetAllAttendancesQuery } from '../../services/attendanceSlice';
import Loader from '../../common/Loader';
import { Link } from 'react-router-dom';

const AttendanceTable = ({ searchTerm }) => {
  const {
    data: attendanceRecords,
    isLoading,
    isError,
  } = useGetAllAttendancesQuery();

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading attendance records</div>;

  // Ensure attendanceRecords is an array before attempting to filter
  const filteredRecords = Array.isArray(attendanceRecords)
    ? attendanceRecords.filter((record) =>
        record.employeeId
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      )
    : [];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-boxdark">
        <thead>
          <tr>
            <th className="py-2 border-b border-slate-300 dark:border-slate-600">
              S.No
            </th>
            <th className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
              Employee ID
            </th>
            <th className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
              Clock In
            </th>
            <th className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
              Clock Out
            </th>
            <th className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
              Leave Hours
            </th>
            <th className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record.id}>
              <td className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
                {record.id}
              </td>
              <td className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
                {record.employeeId}
              </td>
              <td className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
                {record.clockIn?.slice(0, 16)}
              </td>
              <td className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
                {record.clockOut?.slice(0, 16)}
              </td>
              <td className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
                {record.leaveHours}
              </td>
              <td className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
                <Link
                  to={`/attendance/view/${record.id}`}
                  className="text-primary hover:underline"
                >
                  View
                </Link>
                <Link
                  to={`/attendance/edit/${record.id}`}
                  className="ml-2 text-primary hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
