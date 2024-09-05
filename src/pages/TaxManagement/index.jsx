import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useGetAllTaxesFromTaxRouteQuery } from '../../services/taxManagementSlice';
import TaxManagementTable from './TaxManagementTable';

const TaxManagementIndex = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
    search: '',
  });

  const handleSearch = () => {
    setQueryParams((prev) => ({
      ...prev,
      search: searchTerm,
    }));
  };

  // Call the query with the search term
  const { data, error, isLoading } =
    useGetAllTaxesFromTaxRouteQuery(queryParams);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tax Management" />
      <div className="flex justify-between">
        <div className="ml-7 mr-auto pt-2 relative text-gray-600 w-90">
          <input
            className="rounded-full border border-slate-300 bg-white h-12 px-5 pr-16 text-md focus:outline-none focus:border-slate-400 w-full dark:border-slate-600 dark:bg-boxdark dark:text-slate-300 dark:focus:border-slate-400"
            type="text"
            name="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-0 top-0 mt-6 mr-5"
            onClick={handleSearch} // Trigger the search on click
          >
            <FaSearch />
          </button>
        </div>
        <div className="flex items-end gap-2">
          <Link
            to="parameters"
            className="btn h-[30px] min-h-[30px] text-sm border-slate-200 hover:bg-opacity-70 dark:text-white dark:bg-slate-700 dark:border-slate-700 dark:hover:bg-opacity-70 transition duration-150 ease-in-out rounded-md"
          >
            <span className="text-sm">Parameters</span>
          </Link>
        </div>
        <div className="flex items-end gap-2">
          <Link
            to="add"
            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary mx-2 py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:mx-2 lg:px-4"
          >
            <span>
              <IoDocumentTextOutline />
            </span>
            Add Tax Management
          </Link>
        </div>
      </div>

      {/* Pass the searchTerm and query data to TaxManagementTable */}
      <TaxManagementTable
        data={data}
        isLoading={isLoading}
        error={error}
        searchTerm={searchTerm}
      />
    </DefaultLayout>
  );
};

export default TaxManagementIndex;
