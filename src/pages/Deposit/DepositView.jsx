import React from 'react';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import { useGetDirectDepositQuery } from '../../services/directDepositSlice';
import Loader from '../../common/Loader';
import BreadcrumbNav from '../../components/Breadcrumbs/BreadcrumbNav';

const DepositView = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetDirectDepositQuery(id);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div>{`Error occurred while fetching deposit with this id: ${id}.`}</div>
    );
  if (!data) return <div>No Deposit Found!</div>;

  return (
    <DefaultLayout>
      <BreadcrumbNav
        pageName="View Deposit"
        pageNameprev="Deposits"
        pagePrevPath="deposits"
      />
      <div className="flex flex-col bg-gray-100 rounded-lg overflow-hidden shadow-lg">
        <div className="flex justify-between items-end p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold">Deposit Details</h2>
        </div>

        <div className="flex p-5 bg-brand-primary">
          <div className="flex flex-col gap-1 w-4/5">
            <div className="grid grid-cols-2 gap-1">
              <div>
                <p className="text-md font-semibold">Payroll ID:</p>
                <p className="text-md mb-5 font-normal">{data?.payrollId}</p>
              </div>
              <div>
                <p className="text-md font-semibold">Bank Account:</p>
                <p className="text-md mb-5 font-normal">{data?.bankAccount}</p>
              </div>
              <div>
                <p className="text-md font-semibold">Amount:</p>
                <p className="text-md mb-5 font-normal">{data?.amount}</p>
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

export default DepositView;
