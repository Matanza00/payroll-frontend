import React from 'react';
import { useGetAllTaxesQuery } from '../../services/taxManagementSlice';
import Loader from '../../common/Loader';
import { Link } from 'react-router-dom';

const TaxManagementTable = ({ searchTerm }) => {
  const { data: taxRecords, isLoading, isError } = useGetAllTaxesQuery();

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading tax management records</div>;

  // Ensure taxRecords is an array before filtering
  const filteredRecords = Array.isArray(taxRecords)
    ? taxRecords.filter((record) =>
        record.taxType.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-boxdark">
        <thead>
          <tr>
            <th className="py-2border-b border-slate-300 dark:border-slate-600">
              ID
            </th>
            <th className="py-2border-b border-slate-300 dark:border-slate-600">
              Payroll ID
            </th>
            <th className="py-2 border-b border-slate-300 dark:border-slate-600">
              Tax Type
            </th>
            <th className="py-2 border-b border-slate-300 dark:border-slate-600">
              Amount
            </th>
            <th className="py-2 border-b border-slate-300 dark:border-slate-600">
              Created At
            </th>
            <th className="py-2 border-b border-slate-300 dark:border-slate-600">
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
                {record.payrollId}
              </td>
              <td className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
                {record.taxType}
              </td>
              <td className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
                {record.amount}
              </td>
              <td className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
                {record.created_at?.slice(0, 10)}
              </td>
              <td className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
                <Link
                  to={`/tax-management/view/${record.id}`}
                  className="text-primary hover:underline"
                >
                  View
                </Link>
                <Link
                  to={`/tax-management/edit/${record.id}`}
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

export default TaxManagementTable;
