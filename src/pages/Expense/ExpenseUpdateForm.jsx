import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  useGetExpenseQuery,
  useUpdateExpenseMutation,
} from '../../services/expenseSlice';
import useToast from '../../hooks/useToast';
import LoadingButton from '../../components/LoadingButton';
import Loader from '../../common/Loader';
import BreadcrumbNav from '../../components/Breadcrumbs/BreadcrumbNav';

const ExpenseUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showErrorToast, showSuccessToast } = useToast();
  const { data, isLoading: GetExpenseLoader } = useGetExpenseQuery(id);
  const [formValues, setFormValues] = useState({
    employeeId: '',
    description: '',
    amount: '',
    date: '',
  });
  const [UpdateExpense, { isLoading }] = useUpdateExpenseMutation();

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validate and prepare the payload
    const payload = {
      id,
      employeeId: formValues.employeeId,
      description: formValues.description || 'Default description',
      amount: parseFloat(formValues.amount) || 0, // Ensure amount is a valid number
      date: formValues.date ? new Date(formValues.date).toISOString() : null, // Convert to ISO string
    };

    // Log the payload to ensure it's correct
    console.log('Payload being sent:', payload);

    try {
      await UpdateExpense(payload).unwrap();
      showSuccessToast('Expense Updated Successfully!');
      navigate(-1);
    } catch (err) {
      console.error('Update failed:', err);
      showErrorToast('An error occurred while updating the expense');
    }
  };

  useEffect(() => {
    if (data) {
      setFormValues({
        employeeId: data?.employeeId || '',
        description: data?.description || '',
        amount: data?.amount || '',
        date: data?.date?.slice(0, 10) || '',
      });
    }
  }, [data]);

  if (GetExpenseLoader) return <Loader />;

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-600">
        <BreadcrumbNav
          pageName="Edit Expense"
          pageNameprev="Expenses"
          pagePrevPath="expenses"
        />
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-md text-black dark:text-white">
                  Expense Information
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleUpdate}>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-md font-medium text-black dark:text-white"
                      htmlFor="employeeId"
                    >
                      Employee ID
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="employeeId"
                      id="employeeId"
                      placeholder="Enter Employee ID"
                      onChange={handleChangeValue}
                      value={formValues.employeeId}
                    />
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-md font-medium text-black dark:text-white"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="description"
                      id="description"
                      placeholder="Enter Description"
                      onChange={handleChangeValue}
                      value={formValues.description}
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
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-md font-medium text-black dark:text-white"
                      htmlFor="date"
                    >
                      Date
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="date"
                      name="date"
                      id="date"
                      onChange={handleChangeValue}
                      value={formValues.date}
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

export default ExpenseUpdateForm;
