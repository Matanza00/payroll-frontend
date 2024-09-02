import React from 'react';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import { useGetAttendanceQuery } from '../../services/attendanceSlice';
import Loader from '../../common/Loader';
import BreadcrumbNav from '../../components/Breadcrumbs/BreadcrumbNav';

const AttendanceView = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetAttendanceQuery(id);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div>{`Error occurred while fetching attendance with this id: ${id}.`}</div>
    );
  if (!data) return <div>No Attendance Found!</div>;

  return (
    <DefaultLayout>
      <BreadcrumbNav
        pageName="View Attendance"
        pageNameprev="Attendance"
        pagePrevPath="attendance"
      />
      <div className="flex flex-col bg-gray-100 rounded-lg overflow-hidden shadow-lg">
        <div className="flex justify-between items-end p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold">Attendance Details</h2>
        </div>

        <div className="flex p-5 bg-brand-primary">
          <div className="flex flex-col gap-1 w-4/5">
            <div className="grid grid-cols-2 gap-1">
              <div>
                <p className="text-md font-semibold">Employee ID:</p>
                <p className="text-md mb-5 font-normal">{data?.employeeId}</p>
              </div>
              <div>
                <p className="text-md font-semibold">Clock In:</p>
                <p className="text-md mb-5 font-normal">
                  {data?.clockIn?.slice(0, 16)}
                </p>
              </div>
              <div>
                <p className="text-md font-semibold">Clock Out:</p>
                <p className="text-md mb-5 font-normal">
                  {data?.clockOut?.slice(0, 16)}
                </p>
              </div>
              <div>
                <p className="text-md font-semibold">Leave Hours:</p>
                <p className="text-md mb-5 font-normal">{data?.leaveHours}</p>
              </div>
              <div>
                <p className="text-md font-semibold">Created At:</p>
                <p className="text-md mb-5 font-normal">
                  {data?.created_at?.slice(0, 10)}
                </p>
              </div>
              <div>
                <p className="text-md font-semibold">Updated At:</p>
                <p className="text-md mb-5 font-normal">
                  {data?.updated_at?.slice(0, 10)}
                </p>
              </div>
              <div>
                <p className="text-md font-semibold">Is Active:</p>
                <p className="text-md mb-5 font-normal">
                  {data?.isActive ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AttendanceView;
