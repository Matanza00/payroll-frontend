import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  useGetAttendanceQuery,
  useUpdateAttendanceMutation,
} from '../../services/attendanceSlice';
import useToast from '../../hooks/useToast';
import LoadingButton from '../../components/LoadingButton';
import Loader from '../../common/Loader';
import BreadcrumbNav from '../../components/Breadcrumbs/BreadcrumbNav';

const AttendanceUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showErrorToast, showSuccessToast } = useToast();
  const { data, isLoading: GetAttendanceLoader } = useGetAttendanceQuery(id);
  const [formValues, setFormValues] = useState({
    employeeId: '',
    clockIn: '',
    clockOut: '',
    leaveHours: '',
  });
  const [UpdateAttendance, { isLoading }] = useUpdateAttendanceMutation();

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await UpdateAttendance({
        id,
        ...formValues,
        leaveHours: parseFloat(formValues.leaveHours),
        clockIn: new Date(formValues.clockIn),
        clockOut: new Date(formValues.clockOut),
      }).unwrap();
      showSuccessToast('Attendance Updated Successfully!');
      navigate(-1);
    } catch (err) {
      showErrorToast('An error occurred while updating attendance');
    }
  };

  useEffect(() => {
    if (data) {
      setFormValues({
        employeeId: data?.employeeId || '',
        clockIn: data?.clockIn ? data.clockIn.slice(0, 16) : '',
        clockOut: data?.clockOut ? data.clockOut.slice(0, 16) : '',
        leaveHours: data?.leaveHours || '',
      });
    }
  }, [data]);

  if (GetAttendanceLoader) return <Loader />;

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-600">
        <BreadcrumbNav
          pageName="Edit Attendance"
          pageNameprev="Attendance"
          pagePrevPath="attendance"
        />
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-md text-black dark:text-white">
                  Attendance Information
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleUpdate}>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-md font-medium text-black dark:text-white"
                      htmlFor="employeeId"
                    >
                      Employee ID
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="employeeId"
                      id="employeeId"
                      placeholder="Enter Employee ID"
                      onChange={handleChangeValue}
                      value={formValues.employeeId}
                    />
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-md font-medium text-black dark:text-white"
                      htmlFor="clockIn"
                    >
                      Clock In
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="datetime-local"
                      name="clockIn"
                      id="clockIn"
                      onChange={handleChangeValue}
                      value={formValues.clockIn}
                    />
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-md font-medium text-black dark:text-white"
                      htmlFor="clockOut"
                    >
                      Clock Out
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="datetime-local"
                      name="clockOut"
                      id="clockOut"
                      onChange={handleChangeValue}
                      value={formValues.clockOut}
                    />
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-md font-medium text-black dark:text-white"
                      htmlFor="leaveHours"
                    >
                      Leave Hours
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="leaveHours"
                      id="leaveHours"
                      placeholder="Enter Leave Hours"
                      onChange={handleChangeValue}
                      value={formValues.leaveHours}
                    />
                  </div>
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black dark:border-strokedark dark:text-white transition duration-150 ease-in-out hover:border-black dark:hover:border-white"
                      type="button"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </button>
                    <>
                      {isLoading ? (
                        <LoadingButton
                          btnText="Updating..."
                          isLoading={isLoading}
                        />
                      ) : (
                        <button
                          className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
                          type="submit"
                        >
                          Save
                        </button>
                      )}
                    </>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AttendanceUpdateForm;
