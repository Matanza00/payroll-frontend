import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  useGetBenefitQuery,
  useUpdateBenefitMutation,
} from '../../services/benefitsSlice';
import useToast from '../../hooks/useToast';
import LoadingButton from '../../components/LoadingButton';
import Loader from '../../common/Loader';
import BreadcrumbNav from '../../components/Breadcrumbs/BreadcrumbNav';

const BenefitsUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showErrorToast, showSuccessToast } = useToast();
  const { data, isLoading: GetBenefitLoader } = useGetBenefitQuery(id);
  const [formValues, setFormValues] = useState({
    employeeId: '',
    benefitType: '',
    amount: '',
  });
  const [UpdateBenefit, { isLoading }] = useUpdateBenefitMutation();

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Prepare and validate the payload
    const payload = {
      id,
      employeeId: formValues.employeeId,
      benefitType: formValues.benefitType || 'Default Benefit Type', // Fallback value
      amount: parseFloat(formValues.amount) || 0, // Ensure amount is a valid number
    };

    // Log the payload to ensure correctness
    console.log('Payload being sent:', payload);

    try {
      await UpdateBenefit(payload).unwrap();
      showSuccessToast('Benefit Updated Successfully!');
      navigate(-1);
    } catch (err) {
      showErrorToast('An error occurred while updating the benefit');
    }
  };

  useEffect(() => {
    if (data) {
      setFormValues({
        employeeId: data?.employeeId || '',
        benefitType: data?.benefitType || '',
        amount: data?.amount || '',
      });
    }
  }, [data]);

  if (GetBenefitLoader) return <Loader />;

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-600">
        <BreadcrumbNav
          pageName="Edit Benefit"
          pageNameprev="Benefits"
          pagePrevPath="benefits"
        />
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-md text-black dark:text-white">
                  Benefit Information
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
                      htmlFor="benefitType"
                    >
                      Benefit Type
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="benefitType"
                      id="benefitType"
                      placeholder="Enter Benefit Type"
                      onChange={handleChangeValue}
                      value={formValues.benefitType}
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

export default BenefitsUpdateForm;
