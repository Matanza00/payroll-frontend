// ParametersTable.jsx
import React from 'react';
import { useGetAllTaxParametersQuery } from '../../../services/taxParametersSlice';
import Loader from '../../../common/Loader';

const ParametersTable = () => {
  const {
    data: parameters,
    isLoading,
    isError,
    error,
  } = useGetAllTaxParametersQuery();

  if (isLoading) return <Loader />;
  if (isError) return <p>Error: {error.message}</p>;

  if (!parameters || parameters.length === 0) {
    return (
      <div>
        <p>No tax parameters available. Please add new parameters.</p>
      </div>
    );
  }

  return (
    <div className="h-[570px] rounded-sm border border-stroke bg-white my-2 px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto h-[530px] overflow-y-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 text-black dark:text-white border">
                Min Salary
              </th>
              <th className="py-4 px-4 text-black dark:text-white border">
                Max Salary
              </th>
              <th className="py-4 px-4 text-black dark:text-white border">
                Base Tax
              </th>
              <th className="py-4 px-4 text-black dark:text-white border">
                Excess Tax Rate %
              </th>
              <th className="py-4 px-4 text-black dark:text-white border">
                Tax Type
              </th>
            </tr>
          </thead>
          <tbody>
            {parameters.map((param) => (
              <tr key={param.id}>
                <td className="border py-4 px-4">{param.minSalary}</td>
                <td className="border py-4 px-4">{param.maxSalary || 'N/A'}</td>
                <td className="border py-4 px-4">{param.baseTax}</td>
                <td className="border py-4 px-4">{param.excessTaxRate}</td>
                <td className="border py-4 px-4">{param.taxType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParametersTable;
