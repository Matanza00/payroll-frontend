import { CiEdit } from 'react-icons/ci';
import { IoEyeOutline } from 'react-icons/io5';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  useGetAllPayrollRecordsQuery,
  useDeletePayrollRecordMutation,
} from '../../services/payrollSlice';
import Loader from '../../common/Loader';
import DeleteModal from '../../components/DeleteModal';
import { FcNext, FcPrevious } from 'react-icons/fc';
import useToast from '../../hooks/useToast';

const PayrollTable = ({ searchTerm }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [payrollsToShow, setPayrollsToShow] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();
  const { showErrorToast, showSuccessToast } = useToast();

  const {
    data: payrolls,
    isLoading: getPayrollsLoading,
    isError,
    refetch,
  } = useGetAllPayrollRecordsQuery();
  const [deletePayrollRecord, { isLoading: isDeleteLoading }] =
    useDeletePayrollRecordMutation();
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    refetch();
  }, [searchTerm]);

  useEffect(() => {
    if (!getPayrollsLoading && !isError && payrolls?.length > 0) {
      const totalPagesCount = Math.ceil(payrolls.length / limit);
      setTotalPages(totalPagesCount);
      const updatedPayrolls = payrolls.slice(startIndex, startIndex + limit);
      setPayrollsToShow(updatedPayrolls);
      const updatedPages = Array.from(
        { length: totalPagesCount },
        (_, i) => i + 1,
      );
      setPages(updatedPages);
      setIsLoading(false);
    }
  }, [getPayrollsLoading, isError, payrolls, limit, startIndex]);

  const handlePage = (e) => {
    setPage(parseInt(e.target.textContent));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const deletePayroll = async (id) => {
    try {
      await deletePayrollRecord(id).unwrap();
      showSuccessToast('Payroll Record Deleted Successfully!');
    } catch (err) {
      showErrorToast('An error occurred while deleting the payroll record');
    }
  };

  if (getPayrollsLoading) return <Loader />;
  if (isError) return <div>Error occurred while fetching payroll records.</div>;
  if (!payrollsToShow.length) return <div>No Payroll Records Found!</div>;

  return (
    <>
      <div className="h-150 rounded-sm border border-stroke bg-white my-2 px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto h-[550px] overflow-y-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="max-w-[10px] py-4 px-4 text-black dark:text-white">
                  S. No
                </th>
                <th className="min-w-[200px] py-4 px-4 text-black dark:text-white">
                  Employee ID
                </th>
                <th className="min-w-[250px] py-4 px-4 text-black dark:text-white">
                  Salary
                </th>
                <th className="min-w-[250px] py-4 px-4 text-black dark:text-white">
                  Bonus
                </th>
                <th className="py-4 px-4 text-black dark:text-white">
                  Deductions
                </th>
                <th className="py-4 px-4 text-black dark:text-white">
                  Net Pay
                </th>
                <th className="py-4 px-4 text-black dark:text-white">
                  Pay Date
                </th>
                <th className="py-4 px-4 text-center text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {payrollsToShow.map((payroll, index) => (
                <tr key={payroll.id}>
                  <td className="border-b border-[#eee] py-4 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="font-medium text-black dark:text-white">
                      {startIndex + index + 1}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">
                    <p className="font-medium text-black dark:text-white">
                      {payroll.employeeId}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">
                    <p className="font-medium text-black dark:text-white">
                      {payroll.salary}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">
                    <p className="font-medium text-black dark:text-white">
                      {payroll.bonus ?? 'N/A'}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">
                    <p className="font-medium text-black dark:text-white">
                      {payroll.deductions ?? 'N/A'}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">
                    <p className="font-medium text-black dark:text-white">
                      {payroll.netPay}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">
                    <p className="font-medium text-black dark:text-white">
                      {new Date(payroll.payDate).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center justify-center space-x-3.5">
                      <button
                        onClick={() => navigate(`view/${payroll.id}`)}
                        className="hover:text-primary"
                      >
                        <IoEyeOutline style={{ fontSize: '20px' }} />
                      </button>
                      <button
                        onClick={() => navigate(`update/${payroll.id}`)}
                        className="hover:text-primary"
                      >
                        <CiEdit style={{ fontSize: '20px' }} />
                      </button>
                      <button
                        onClick={() => {
                          document.getElementById('delete_modal').showModal();
                          setDeleteId(payroll.id);
                        }}
                        className="hover:text-primary"
                      >
                        <RiDeleteBinLine style={{ fontSize: '20px' }} />
                      </button>
                      <DeleteModal
                        deleteModule="Payroll Record"
                        Id={payroll.id}
                        handleDelete={() => deletePayroll(deleteId)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full flex flex-col justify-between">
          {/* Container for Rows Per Page Dropdown and Page Numbers */}
          <div className="flex items-center justify-between px-4 py-2">
            {/* Rows Per Page Dropdown */}
            <div className="dropdown inline-block relative">
              <span>Rows per page:</span>
              <select
                value={limit}
                onChange={(e) => {
                  setPage(1);
                  setLimit(parseInt(e.target.value));
                }}
                className="px-1 ml-2 text-sm border bg-slate-100 border-slate-500 rounded-sm dark:border-slate-600 dark:bg-boxdark dark:text-slate-300"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
            {/* Page Navigation Buttons */}
            <div className="flex items-center justify-end flex-grow space-x-2">
              {/* Previous Button */}
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className={`px-2 py-2 rounded-md ${
                  page === 1
                    ? 'bg-slate-200 text-gray-600 cursor-not-allowed dark:bg-slate-600 dark:text-graydark'
                    : 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
                }`}
              >
                <FcPrevious />
              </button>
              {/* Selectable Page Numbers */}
              <div className="flex space-x-2">
                {/* Render first page */}
                {totalPages > 1 && (
                  <button
                    key={1}
                    onClick={handlePage}
                    className={`px-3 py-1 rounded-md ${
                      1 === page
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {1}
                  </button>
                )}
                {/* Render ellipsis if necessary */}
                {page > 4 && totalPages > 2 && (
                  <span className="px-3 py-1">...</span>
                )}
                {/* Render pages closer to the current page */}
                {pages
                  .filter(
                    (pageNumber) =>
                      pageNumber > page - 2 && pageNumber < page + 2,
                  )
                  .map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={handlePage}
                      className={`px-3 py-1 rounded-md ${
                        pageNumber === page
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                {/* Render ellipsis if necessary */}
                {page < totalPages - 3 && totalPages > 2 && (
                  <span className="px-3 py-1">...</span>
                )}
                {/* Render last page */}
                {totalPages > 1 && (
                  <button
                    key={totalPages}
                    onClick={handlePage}
                    className={`px-3 py-1 rounded-md ${
                      totalPages === page
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {totalPages}
                  </button>
                )}
              </div>
              {/* Next Button */}
              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className={`px-2 py-2 rounded-md ${
                  page === totalPages
                    ? 'bg-slate-200 text-gray-600 cursor-not-allowed dark:bg-slate-600 dark:text-graydark'
                    : 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
                }`}
              >
                <FcNext />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayrollTable;
