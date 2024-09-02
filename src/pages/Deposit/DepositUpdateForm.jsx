import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  useGetDirectDepositQuery,
  useUpdateDirectDepositMutation,
} from '../../services/directDepositSlice';
import useToast from '../../hooks/useToast';
import LoadingButton from '../../components/LoadingButton';
import Loader from '../../common/Loader';
import BreadcrumbNav from '../../components/Breadcrumbs/BreadcrumbNav';

const DepositUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showErrorToast, showSuccessToast } = useToast();
  const { data, isLoading: GetDepositLoader } = useGetDirectDepositQuery(id);
  const [formValues, setFormValues] = useState({
    payrollId: '',
    bankAccount: '',
    amount: '',
  });
  const [UpdateDeposit, { isLoading }] = useUpdateDirectDepositMutation();

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
      await UpdateDeposit({
        id,
        ...formValues,
        amount: parseFloat(formValues.amount),
      }).unwrap();
      showSuccessToast('Direct Deposit Updated Successfully!');
      navigate(-1);
    } catch (err) {
      showErrorToast('An error occurred while updating deposit');
    }
  };

  useEffect(() => {
    if (data) {
      setFormValues({
        payrollId: data?.payrollId || '',
        bankAccount: data?.bankAccount || '',
        amount: data?.amount || '',
      });
    }
  }, [data]);

  if (GetDepositLoader) return <Loader />;

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-600">
        <BreadcrumbNav
          pageName="Edit Deposit"
          pageNameprev="Deposits"
          pagePrevPath="deposits"
        />
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-md text-black dark:text-white">
                  Deposit Information
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleUpdate}>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-md font-medium text-black dark:text-white"
                      htmlFor="payrollId"
                    >
                      Payroll ID
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="payrollId"
                      id="payrollId"
                      placeholder="Enter Payroll ID"
                      onChange={handleChangeValue}
                      value={formValues.payrollId}
                    />
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-md font-medium text-black dark:text-white"
                      htmlFor="bankAccount"
                    >
                      Bank Account
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="bankAccount"
                      id="bankAccount"
                      placeholder="Enter Bank Account"
                      onChange={handleChangeValue}
                      value={formValues.bankAccount}
                    />
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-md font-medium text-black dark:text-white"
                      htmlFor="amount"
                    >
                      Amount
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="amount"
                      id="amount"
                      placeholder="Enter Amount"
                      onChange={handleChangeValue}
                      value={formValues.amount}
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

export default DepositUpdateForm;
