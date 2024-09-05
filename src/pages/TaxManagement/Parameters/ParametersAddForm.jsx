import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ParametersAddForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    minSalary: '',
    maxSalary: '',
    baseTax: '',
    excessTaxRate: '',
    taxType: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError(null);

    try {
      // Make sure to send data in correct format
      const response = await axios.post(
        'http://localhost:8080/api/v1/tax-parameters',
        {
          minSalary: parseFloat(formData.minSalary),
          maxSalary: formData.maxSalary ? parseFloat(formData.maxSalary) : null,
          baseTax: parseFloat(formData.baseTax),
          excessTaxRate: parseFloat(formData.excessTaxRate),
          taxType: formData.taxType,
        },
      );

      // Redirect or handle success
      console.log('Tax Parameter created:', response.data);
      navigate('/tax-management/parameters');
    } catch (err) {
      // Handle errors
      console.error('Failed to create tax parameter:', err);
      setError('Failed to create tax parameter. Please try again.');
    }
  };

  return (
    <div>
      <h1>Add New Tax Parameter</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="minSalary">Min Salary</label>
          <input
            type="number"
            id="minSalary"
            name="minSalary"
            value={formData.minSalary}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="maxSalary">Max Salary</label>
          <input
            type="number"
            id="maxSalary"
            name="maxSalary"
            value={formData.maxSalary}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="baseTax">Base Tax</label>
          <input
            type="number"
            id="baseTax"
            name="baseTax"
            value={formData.baseTax}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="excessTaxRate">Excess Tax Rate %</label>
          <input
            type="number"
            id="excessTaxRate"
            name="excessTaxRate"
            value={formData.excessTaxRate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="taxType">Tax Type</label>
          <input
            type="text"
            id="taxType"
            name="taxType"
            value={formData.taxType}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded"
        >
          Create Parameter
        </button>
      </form>
    </div>
  );
};

export default ParametersAddForm;
