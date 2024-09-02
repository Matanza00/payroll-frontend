import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useGetAllTaxesQuery } from '../../services/taxManagementSlice';
import TaxManagementTable from './TaxManagementTable';

const TaxManagementIndex = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

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
            onChange={handleSearch}
          />
          <button type="submit" className="absolute right-0 top-0 mt-6 mr-5">
            <FaSearch />
          </button>
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
      <TaxManagementTable searchTerm={searchTerm} />
    </DefaultLayout>
  );
};

export default TaxManagementIndex;
