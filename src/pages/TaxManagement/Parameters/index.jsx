// Parameters.jsx
import React from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import BreadcrumbNav from '../../../components/Breadcrumbs/BreadcrumbNav';
import ParametersTable from './ParametersTable';
import { Link } from 'react-router-dom';

const Parameters = () => {
  return (
    <DefaultLayout>
      <BreadcrumbNav
        pageName="Tax Parameters"
        pageNameprev="Tax Management"
        pagePrevPath="tax-management"
      />
      <div className="flex justify-end mb-4">
        <Link
          to="add"
          className="inline-flex items-center justify-center gap-1.5 rounded-md bg-primary py-1 px-2.5 text-center font-medium text-white hover:bg-opacity-90"
        >
          <span className="text-sm">Add New Parameter</span>
        </Link>
      </div>
      <ParametersTable />
    </DefaultLayout>
  );
};

export default Parameters;
