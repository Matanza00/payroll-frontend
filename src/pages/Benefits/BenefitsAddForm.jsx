import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BreadcrumbNav from '../../components/Breadcrumbs/BreadcrumbNav';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  useCreateBenefitMutation,
  useGetLastDateBenefitRecordsQuery,
} from '../../services/benefitsSlice';
import useToast from '../../hooks/useToast';
import LoadingButton from '../../components/LoadingButton';

const BenefitsAddForm = () => {
  const navigate = useNavigate();
  const { showErrorToast, showSuccessToast } = useToast();

  // Initialize form values with an array for multiple benefits
  const [formValues, setFormValues] = useState({
    employeeId: '',
    benefits: [{ benefitType: '', amount: '' }], // Array to store multiple benefits
  });

  const [previousBenefits, setPreviousBenefits] = useState([]);

  const { data: lastDateBenefitsData, isLoading: lastDateBenefitsLoading } =
    useGetLastDateBenefitRecordsQuery(formValues.employeeId, {
      skip: !formValues.employeeId, // Skip query if employeeId is empty
    });

  // Set previous benefits when new data is fetched
  useEffect(() => {
    if (lastDateBenefitsData && formValues.employeeId) {
      setPreviousBenefits(lastDateBenefitsData);
    }
  }, [lastDateBenefitsData, formValues.employeeId]);

  const [AddBenefit, { isLoading }] = useCreateBenefitMutation();

  // Handle form field changes for both employeeId and benefits
  const handleChangeValue = (index, e) => {
    const { name, value } = e.target;
    const updatedBenefits = [...formValues.benefits];
    updatedBenefits[index][name] = value;
    setFormValues({
      ...formValues,
      benefits: updatedBenefits,
    });
  };

  // Handle employeeId change
  const handleEmployeeIdChange = (e) => {
    setFormValues({ ...formValues, employeeId: e.target.value });
  };

  // Handle adding new benefit entry
  const handleAddBenefit = () => {
    setFormValues({
      ...formValues,
      benefits: [...formValues.benefits, { benefitType: '', amount: '' }],
    });
  };

  // Handle removing a benefit entry
  const handleRemoveBenefit = (index) => {
    const updatedBenefits = formValues.benefits.filter((_, i) => i !== index);
    setFormValues({ ...formValues, benefits: updatedBenefits });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AddBenefit({
        ...formValues,
        benefits: formValues.benefits.map((benefit) => ({
          benefitType: benefit.benefitType,
          amount: parseFloat(benefit.amount),
        })),
      }).unwrap();
      showSuccessToast('Benefits Added Successfully!');
      navigate(-1);
    } catch (err) {
      showErrorToast('An error occurred while adding benefits');
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-600">
        <BreadcrumbNav
          pageName="Add Benefits"
          pageNameprev="Benefits"
          pagePrevPath="benefits"
        />
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5">
            {/* Benefits Information */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-md text-black dark:text-white">
                  Benefits Information
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

                  {/* Benefits Fields */}
                  {formValues.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5.5"
                    >
                      <div>
                        <label
                          className="mb-3 block text-md font-medium text-black dark:text-white"
                          htmlFor={`benefitType-${index}`}
                        >
                          Benefit Type
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="benefitType"
                          id={`benefitType-${index}`}
                          placeholder="Enter Benefit Type"
                          value={benefit.benefitType}
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
                          value={benefit.amount}
                          onChange={(e) => handleChangeValue(index, e)}
                        />
                      </div>
                      {/* Remove Benefit Button */}
                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => handleRemoveBenefit(index)}
                          className="text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add New Benefit Button */}
                  <div className="flex justify-end mb-5.5">
                    <button
                      type="button"
                      onClick={handleAddBenefit}
                      className="flex justify-center rounded bg-blue-500 py-2 px-4 font-medium text-white hover:bg-blue-600"
                    >
                      + Add Benefit
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

            {/* Previous Benefits Information */}
            {previousBenefits.length > 0 && (
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-8">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-md text-black dark:text-white">
                    Previous Benefit Information
                  </h3>
                </div>
                <div className="p-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {previousBenefits.map((benefit, index) => (
                    <div key={index} className="mb-5.5">
                      <label className="block text-md font-medium text-black dark:text-white">
                        Benefit Type
                      </label>
                      <p className="dark:text-white">{benefit.benefitType}</p>
                      <label className="block text-md font-medium text-black dark:text-white mt-3">
                        Amount
                      </label>
                      <p className="dark:text-white">{benefit.amount}</p>
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

export default BenefitsAddForm;
