import { CiEdit } from 'react-icons/ci';
import { IoEyeOutline } from 'react-icons/io5';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import useToast from '../../hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  useDeleteUserMutation,
  useGetUserByCompanyIdQuery,
  useGetAllUsersInfoQuery,
} from '../../services/usersSlice';
import DeleteModal from '../DeleteModal';
import Loader from '../../common/Loader';
import { FcNext, FcPrevious } from 'react-icons/fc';
import roleValue from '../../utils/helpers';

const UserTable = ({ searchTerm }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [usersToShow, setUsersToShow] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState([]);

  const handlePage = (e) => {
    setPage(parseInt(e.target.textContent));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const navigate = useNavigate();
  const { showErrorToast, showSuccessToast } = useToast();
  const { user } = useSelector((state) => state.auth);
  const {
    data,
    isError,
    error,
    isLoading: getUsersLoading,
    refetch,
  } = useGetUserByCompanyIdQuery({
    companyId: user?.companyId,
    page,
    limit,
    searchTerm,
  });
  const { userData } = useGetAllUsersInfoQuery();

  console.log('first', data);
  console.log('UserData', userData);

  useEffect(() => {
    refetch();
  }, [searchTerm]);

  useEffect(() => {
    if (!getUsersLoading && !isError && data?.results > 0) {
      const totalPagesCount = Math.ceil(data.results / limit);
      setTotalPages(totalPagesCount);
      const updatedUsers = data.data.slice(startIndex, startIndex + limit);
      setUsersToShow(updatedUsers);

      // Calculate page numbers dynamically based on total pages
      let updatedPages = [];
      if (totalPagesCount <= 5) {
        updatedPages = Array.from({ length: totalPagesCount }, (_, i) => i + 1);
      } else {
        if (page <= 3) {
          updatedPages = [1, 2, 3, 4, 5];
        } else if (page >= totalPagesCount - 2) {
          updatedPages = [
            totalPagesCount - 4,
            totalPagesCount - 3,
            totalPagesCount - 2,
            totalPagesCount - 1,
            totalPagesCount,
          ];
        } else {
          updatedPages = [page - 2, page - 1, page, page + 1, page + 2];
        }
      }
      setPages(updatedPages);
      setIsLoading(false);
    }
  }, [getUsersLoading, isError, data, limit, startIndex, page, totalPages]);

  const [DeleteUser, { isLoading: isDeleteLoading }] = useDeleteUserMutation();
  const [deleteId, setDeleteId] = useState(null);

  const deleteUser = async (id) => {
    try {
      await DeleteUser(id).unwrap();
      showSuccessToast('User Deleted Successfully!');
    } catch (err) {
      console?.log(err);
      showErrorToast(`An error has occurred while deleting user`);
    }
  };

  if (getUsersLoading) return <Loader />;
  if (isError) return <div>Error occurred while fetching users.</div>;
  if (!data?.data?.length) return <div>No Users Found!</div>;

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
                  Email
                </th>
                <th className="min-w-[250px] py-4 px-4 text-black dark:text-white">
                  Name
                </th>

                <th className="py-4 px-4 text-black dark:text-white">
                  Employee Id
                </th>
                <th className="py-4 px-4 text-black dark:text-white">Phone</th>
                <th className="py-4 px-4 text-black dark:text-white">Role</th>

                <th className="py-4 px-4 text-center text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((e, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-4 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="font-medium text-black dark:text-white">
                      {e?.id}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">
                    <p className="font-medium text-black dark:text-white">
                      {e?.email}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">
                    <p className="font-medium text-black dark:text-white">
                      {e?.username}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">
                    <p className="font-medium text-black dark:text-white">
                      {e?.employeeId ?? 'none'}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">
                    <p className="font-medium text-black dark:text-white">
                      {e?.phone}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">
                    <p className="font-medium text-black dark:text-white">
                      {e?.role?.roleName}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center justify-center space-x-3.5">
                      <button
                        onClick={() => navigate(`view/${e?.id}`)}
                        className="hover:text-primary"
                      >
                        <IoEyeOutline style={{ fontSize: '20px' }} />
                      </button>
                      <button
                        onClick={() => navigate(`update/${e?.id}`)}
                        className="hover:text-primary"
                      >
                        <CiEdit style={{ fontSize: '20px' }} />
                      </button>
                      <button
                        onClick={() => {
                          document.getElementById('delete_modal').showModal();
                          setDeleteId(e?.id);
                        }}
                        className="hover:text-primary"
                      >
                        <RiDeleteBinLine style={{ fontSize: '20px' }} />
                      </button>
                      <DeleteModal
                        deleteModule="User"
                        Id={e?.id}
                        handleDelete={() => deleteUser(deleteId)}
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
        <div className=" w-full  flex flex-col justify-between ">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="dropdown inline-block relative">
              <span>Rows per page:</span>
              <select
                value={limit}
                onChange={(e) => {
                  setPage(1);
                  setLimit(parseInt(e.target.value));
                }}
                className=" px-1 ml-2 text-sm border bg-slate-100 border-slate-500 rounded-sm dark:border-slate-600 dark:bg-boxdark dark:text-slate-300 "
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="flex items-center justify-end flex-grow space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className={`px-2 py-2 rounded-md ${
                  page === 1
                    ? 'bg-slate-200 text-gray-600 cursor-not-allowed  dark:bg-slate-600 dark:text-graydark '
                    : 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600 '
                }`}
              >
                <FcPrevious />
              </button>

              <div className="flex space-x-2">
                {pages.map((pageNumber) => (
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
              </div>

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

export default UserTable;
