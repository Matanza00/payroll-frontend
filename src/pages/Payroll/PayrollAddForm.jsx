import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BreadcrumbNav from '../../components/Breadcrumbs/BreadcrumbNav';
import DefaultLayout from '../../layout/DefaultLayout';
import { useCreatePayrollRecordMutation } from '../../services/payrollSlice';
import useToast from '../../hooks/useToast';
import LoadingButton from '../../components/LoadingButton';

const PayrollAddForm = () => {
  const navigate = useNavigate();
  const { showErrorToast, showSuccessToast } = useToast();
  const [formValues, setFormValues] = useState({
    employeeId: '',
    salary: '',
    bonus: '',
    deductions: '',
    netPay: '',
    payDate: '',
  });

  const [AddPayroll, { isLoading }] = useCreatePayrollRecordMutation();

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AddPayroll({
        ...formValues,
        salary: parseFloat(formValues.salary),
        bonus: formValues.bonus ? parseFloat(formValues.bonus) : null,
        deductions: formValues.deductions
          ? parseFloat(formValues.deductions)
          : null,
        netPay: parseFloat(formValues.netPay),
        payDate: new Date(formValues.payDate),
      }).unwrap();
      showSuccessToast('Payroll Added Successfully!');
      navigate(-1);
    } catch (err) {
      showErrorToast('An error occurred while adding payroll');
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-600">
        <BreadcrumbNav
          pageName="Add Payroll"
          pageNameprev="Payrolls"
          pagePrevPath="payrolls"
        />
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-md text-black dark:text-white">
                  Payroll Information
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
                      onChange={handleChangeValue}
                      value={formValues.employeeId}
                    />
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-md font-medium text-black dark:text-white"
                      htmlFor="salary"
                    >
                      Salary
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="salary"
                      id="salary"
                      placeholder="Enter Salary"
                      onChange={handleChangeValue}
                      value={formValues.salary}
                    />
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-md font-medium text-black dark:text-white"
                      htmlFor="bonus"
                    >
                      Bonus
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="bonus"
                      id="bonus"
                      placeholder="Enter Bonus (optional)"
                      onChange={handleChangeValue}
                      value={formValues.bonus}
                    />
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-md font-medium text-black dark:text-white"
                      htmlFor="deductions"
                    >
                      Deductions
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="deductions"
                      id="deductions"
                      placeholder="Enter Deductions (optional)"
                      onChange={handleChangeValue}
                      value={formValues.deductions}
                    />
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-md font-medium text-black dark:text-white"
                      htmlFor="netPay"
                    >
                      Net Pay
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="netPay"
                      id="netPay"
                      placeholder="Enter Net Pay"
                      onChange={handleChangeValue}
                      value={formValues.netPay}
                    />
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-md font-medium text-black dark:text-white"
                      htmlFor="payDate"
                    >
                      Pay Date
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="date"
                      name="payDate"
                      id="payDate"
                      onChange={handleChangeValue}
                      value={formValues.payDate}
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
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PayrollAddForm;
