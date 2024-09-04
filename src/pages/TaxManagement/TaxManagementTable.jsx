import React, { useState, useEffect } from 'react';
import {
  useGetAllTaxesQuery,
  useDeleteTaxMutation,
} from '../../services/taxManagementSlice';
import Loader from '../../common/Loader';
import DeleteModal from '../../components/DeleteModal';
import { FcNext, FcPrevious } from 'react-icons/fc';
import useToast from '../../hooks/useToast';
import { useSelector } from 'react-redux';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';
import { formatDateAndTime } from '../../utils/helpers';

const TaxManagementTable = ({ searchTerm }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [taxesToShow, setTaxesToShow] = useState([]);
  const navigate = useNavigate();
  const { showErrorToast, showSuccessToast } = useToast();
  const { user } = useSelector((state) => state.auth);

  const {
    data: taxRecords,
    isLoading: getTaxesLoading,
    isError,
    refetch,
  } = useGetAllTaxesQuery();

  const [deleteTaxRecord, { isLoading: isDeleteLoading }] =
    useDeleteTaxMutation();
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    refetch();
  }, [searchTerm]);

  useEffect(() => {
    if (taxRecords && taxRecords.data && taxRecords.data.length > 0) {
      const totalPagesCount = Math.ceil(taxRecords.data.length / limit);
      setTotalPages(totalPagesCount);
      setTaxesToShow(taxRecords.data);
    }
  }, [taxRecords, limit]);

  const handlePage = (e) => {
    setPage(parseInt(e.target.textContent));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleDelete = async (id) => {
    try {
      await deleteTaxRecord(id);
      showSuccessToast('Tax record deleted successfully');
      setDeleteId(null);
      refetch();
    } catch (error) {
      showErrorToast('Failed to delete tax record');
    }
  };

  if (getTaxesLoading) return <Loader />;
  if (isError) return <div>Error loading tax records</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto bg-white border border-stroke rounded-sm my-2 px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
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
              taxType
            </th>
            <th className="py-4 px-4 text-black dark:text-white">taxAmount</th>
            <th className="py-4 px-4 text-black dark:text-white">Net Pay</th>
            <th className="py-4 px-4 text-black dark:text-white">Pay Date</th>
            <th className="py-4 px-4 text-center text-black dark:text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {taxesToShow.map((tax, index) => (
            <tr
              key={tax.id}
              className="border-b border-[#eee] dark:border-strokedark"
            >
              <td className="py-4 px-4 pl-9 xl:pl-11">
                <p className="font-medium text-black dark:text-white">
                  {index + 1}
                </p>
              </td>
              <td className="py-4 px-4">
                <p className="font-medium text-black dark:text-white">
                  {tax.payroll.employeeId}
                </p>
              </td>
              <td className="py-4 px-4">
                <p className="font-medium text-black dark:text-white">
                  {tax.payroll.salary}
                </p>
              </td>
              <td className="py-4 px-4">
                <p className="font-medium text-black dark:text-white">
                  {tax.taxType}
                </p>
              </td>
              <td className="py-4 px-4">
                <p className="font-medium text-black dark:text-white">
                  {tax.amount}
                </p>
              </td>
              <td className="py-4 px-4">
                <p className="font-medium text-black dark:text-white">
                  {tax.payroll.netPay}
                </p>
              </td>
              <td className="py-4 px-4">
                <p className="font-medium text-black dark:text-white">
                  {formatDateAndTime(tax.created_at)}
                </p>
              </td>
              <td className="py-4 px-4 text-center">
                <div className="flex justify-center space-x-2">
                  <button
                    className="text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-500"
                    onClick={() => navigate(`/edit-tax/${tax.id}`)}
                  >
                    <CiEdit />
                  </button>
                  <button
                    className="text-red-500 dark:text-red-300 hover:text-red-700 dark:hover:text-red-500"
                    onClick={() => {
                      setDeleteId(tax.id);
                    }}
                  >
                    <RiDeleteBinLine />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Showing {taxesToShow.length} of{' '}
            {taxRecords.data ? taxRecords.data.length : 0} records
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            className={`px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-boxdark text-sm text-gray-600 dark:text-gray-300 ${page === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            <FcPrevious />
          </button>
          <div className="flex items-center space-x-2">
            Page {page} of {totalPages}
          </div>
          <button
            className={`px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-boxdark text-sm text-gray-600 dark:text-gray-300 ${page === totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            <FcNext />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaxManagementTable;
