import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BreadcrumbNav from '../../components/Breadcrumbs/BreadcrumbNav';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  useCreateExpenseMutation,
  useGetLastDateExpenseRecordsQuery,
} from '../../services/expenseSlice';
import useToast from '../../hooks/useToast';
import LoadingButton from '../../components/LoadingButton';

const ExpenseAddForm = () => {
  const navigate = useNavigate();
  const { showErrorToast, showSuccessToast } = useToast();

  // Initialize form values with an array for multiple expenses
  const [formValues, setFormValues] = useState({
    employeeId: '',
    expenses: [{ description: '', amount: '', date: '' }], // Array to store multiple expenses
  });

  const [previousExpenses, setPreviousExpenses] = useState([]);

  const { data: lastDateExpensesData, isLoading: lastDateExpensesLoading } =
    useGetLastDateExpenseRecordsQuery(formValues.employeeId, {
      skip: !formValues.employeeId, // Skip query if employeeId is empty
    });

  // Set previous expenses when new data is fetched
  useEffect(() => {
    if (lastDateExpensesData && formValues.employeeId) {
      setPreviousExpenses(lastDateExpensesData);
    }
  }, [lastDateExpensesData, formValues.employeeId]);

  const [AddExpense, { isLoading }] = useCreateExpenseMutation();

  // Handle form field changes for both employeeId and expenses
  const handleChangeValue = (index, e) => {
    const { name, value } = e.target;
    const updatedExpenses = [...formValues.expenses];
    updatedExpenses[index][name] = value;
    setFormValues({
      ...formValues,
      expenses: updatedExpenses,
    });
  };

  // Handle employeeId change
  const handleEmployeeIdChange = (e) => {
    setFormValues({ ...formValues, employeeId: e.target.value });
  };

  // Handle adding new expense entry
  const handleAddExpense = () => {
    setFormValues({
      ...formValues,
      expenses: [
        ...formValues.expenses,
        { description: '', amount: '', date: '' },
      ],
    });
  };

  // Handle removing an expense entry
  const handleRemoveExpense = (index) => {
    const updatedExpenses = formValues.expenses.filter((_, i) => i !== index);
    setFormValues({ ...formValues, expenses: updatedExpenses });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AddExpense({
        ...formValues,
        expenses: formValues.expenses.map((expense) => ({
          description: expense.description,
          amount: parseFloat(expense.amount),
          date: new Date(expense.date),
        })),
      }).unwrap();
      showSuccessToast('Expenses Added Successfully!');
      navigate(-1);
    } catch (err) {
      showErrorToast('An error occurred while adding expenses');
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-600">
        <BreadcrumbNav
          pageName="Add Expenses"
          pageNameprev="Expenses"
          pagePrevPath="expenses"
        />
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5">
            {/* Expense Information */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-md text-black dark:text-white">
                  Expense Information
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
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
                      onChange={handleEmployeeIdChange}
                      value={formValues.employeeId}
                    />
                  </div>

                  {/* Expenses Fields */}
                  {formValues.expenses.map((expense, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5.5"
                    >
                      <div>
                        <label
                          className="mb-3 block text-md font-medium text-black dark:text-white"
                          htmlFor={`description-${index}`}
                        >
                          Description
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="description"
                          id={`description-${index}`}
                          placeholder="Enter Description"
                          value={expense.description}
                          onChange={(e) => handleChangeValue(index, e)}
                        />
                      </div>
                      <div>
                        <label
                          className="mb-3 block text-md font-medium text-black dark:text-white"
                          htmlFor={`amount-${index}`}
                        >
                          Amount
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="amount"
                          id={`amount-${index}`}
                          placeholder="Enter Amount"
                          value={expense.amount}
                          onChange={(e) => handleChangeValue(index, e)}
                        />
                      </div>
                      <div>
                        <label
                          className="mb-3 block text-md font-medium text-black dark:text-white"
                          htmlFor={`date-${index}`}
                        >
                          Date
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="date"
                          name="date"
                          id={`date-${index}`}
                          value={expense.date}
                          onChange={(e) => handleChangeValue(index, e)}
                        />
                      </div>
                      {/* Remove Expense Button */}
                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => handleRemoveExpense(index)}
                          className="text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add New Expense Button */}
                  <div className="flex justify-end mb-5.5">
                    <button
                      type="button"
                      onClick={handleAddExpense}
                      className="flex justify-center rounded bg-blue-500 py-2 px-4 font-medium text-white hover:bg-blue-600"
                    >
                      + Add Expense
                    </button>
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
                          btnText="Adding..."
                          isLoading={isLoading}
                        />
                      ) : (
                        <button
                          className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
                          type="submit"
                        >
                          Add
                        </button>
                      )}
                    </>
                  </div>
                </form>
              </div>
            </div>

            {/* Previous Expenses Information */}
            {previousExpenses.length > 0 && (
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-8">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-md text-black dark:text-white">
                    Previous Expense Information
                  </h3>
                </div>
                <div className="p-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {previousExpenses.map((expense, index) => (
                    <div key={index} className="mb-5.5">
                      <label className="block text-md font-medium text-black dark:text-white">
                        Description
                      </label>
                      <p className="dark:text-white">{expense.description}</p>
                      <label className="block text-md font-medium text-black dark:text-white mt-3">
                        Amount
                      </label>
                      <p className="dark:text-white">{expense.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ExpenseAddForm;
