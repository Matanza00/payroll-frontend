import React from 'react';
import { useGetAllDirectDepositsQuery } from '../../services/directDepositSlice';
import Loader from '../../common/Loader';
import { Link } from 'react-router-dom';

const DepositTable = ({ searchTerm }) => {
  const { data: deposits, isLoading, isError } = useGetAllDirectDepositsQuery();

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading deposits</div>;

  const filteredDeposits = deposits?.filter((deposit) =>
    deposit.bankAccount.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-boxdark">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
              ID
            </th>
            <th className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
              Payroll ID
            </th>
            <th className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
              Bank Account
            </th>
            <th className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
              Amount
            </th>
            <th className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
              Created At
            </th>
            <th className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredDeposits?.map((deposit) => (
            <tr key={deposit.id}>
              <td className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
                {deposit.id}
              </td>
              <td className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
                {deposit.payrollId}
              </td>
              <td className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
                {deposit.bankAccount}
              </td>
              <td className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
                {deposit.amount}
              </td>
              <td className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
                {deposit.created_at?.slice(0, 10)}
              </td>
              <td className="py-2 px-4 border-b border-slate-300 dark:border-slate-600">
                <Link
                  to={`/deposits/view/${deposit.id}`}
                  className="text-primary hover:underline"
                >
                  View
                </Link>
                <Link
                  to={`/deposits/edit/${deposit.id}`}
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

export default DepositTable;
