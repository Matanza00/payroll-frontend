import { useEffect, useState } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import SetPassword from './pages/SetPassword/SetPassword';
import ECommerce from './pages/Dashboard/ECommerce';
import Roles from './pages/Roles';
import RoleUpdate from './pages/Roles/RoleUpdate';
import Companies from './pages/Companies';
import CompanyView from './pages/Companies/CompanyView';
import CompanyForm from './pages/Companies/CompanyForm';
import Users from './pages/Users/index';
import UserAddForm from './pages/Users/UsersAddForm';
import UserUpdateForm from './pages/Users/UsersUpdateForm';
import UserView from './pages/Users/UsersView';

// Import your newly created components
import PayrollIndex from './pages/Payroll/index';
import PayrollAddForm from './pages/Payroll/PayrollAddForm';
import PayrollUpdateForm from './pages/Payroll/PayrollUpdateForm';
import PayrollView from './pages/Payroll/PayrollView';

import PayslipIndex from './pages/Payslips';
import PayslipGenerateForm from './pages/Payslips/PayslipGenerateForm';
import PayslipUpdateForm from './pages/Payslips/PayslipUpdateForm';
import PayslipView from './pages/Payslips/PaySlipView';

import BenefitsIndex from './pages/Benefits/index';
import BenefitsAddForm from './pages/Benefits/BenefitsAddForm';
import BenefitsUpdateForm from './pages/Benefits/BenefitsUpdateForm';
import BenefitsView from './pages/Benefits/BenefitsView';

import ExpenseIndex from './pages/Expense/index';
import ExpenseAddForm from './pages/Expense/ExpenseAddForm';
import ExpenseUpdateForm from './pages/Expense/ExpenseUpdateForm';
import ExpenseView from './pages/Expense/ExpenseView';

import DepositIndex from './pages/Deposit/index';
import DepositAddForm from './pages/Deposit/DepositAddForm';
import DepositUpdateForm from './pages/Deposit/DepositUpdateForm';
import DepositView from './pages/Deposit/DepositView';

import AttendanceIndex from './pages/Attendance/index';
import AttendanceAddForm from './pages/Attendance/AttendanceAddForm';
import AttendanceUpdateForm from './pages/Attendance/AttendanceUpdateForm';
import AttendanceView from './pages/Attendance/AttendanceView';

import TaxManagementIndex from './pages/TaxManagement/index';
import TaxManagementAddForm from './pages/TaxManagement/TaxManagementAddForm';
import TaxManagementUpdateForm from './pages/TaxManagement/TaxManagementUpdateForm';
import TaxManagementView from './pages/TaxManagement/TaxManagementView';
import Parameters from './pages/TaxManagement/Parameters';
import ParametersTable from './pages/TaxManagement/Parameters/ParametersTable';
import ParametersAddForm from './pages/TaxManagement/Parameters/ParametersAddForm';

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route path="/set-admin-password/:token" element={<SetPassword />} />
        <Route path="/set-password/:token" element={<SetPassword />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route
          path="/"
          element={
            auth.isAuthenticated ? (
              <Navigate to="/dashboard" replace={true} />
            ) : (
              <Navigate to="/auth/signin" replace={true} />
            )
          }
        />
        <Route path="/dashboard" element={<ECommerce />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/roles/update" element={<RoleUpdate />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/view/:id" element={<CompanyView />} />
        <Route path="/companies/add" element={<CompanyForm />} />
        <Route path="/companies/update/:id" element={<CompanyForm />} />

        {/* User Management Routes */}
        <Route path="/users" element={<Users />} />
        <Route path="/users/view/:id" element={<UserView />} />
        <Route path="/users/add" element={<UserAddForm />} />
        <Route path="/users/update/:id" element={<UserUpdateForm />} />

        {/* Payroll Management Routes */}
        <Route path="/payroll" element={<PayrollIndex />} />
        <Route path="/payroll/add" element={<PayrollAddForm />} />
        <Route path="/payroll/update/:id" element={<PayrollUpdateForm />} />
        <Route path="/payroll/view/:id" element={<PayrollView />} />

        {/* PaySlip Management Routes */}
        <Route path="/payslip" element={<PayslipIndex />} />
        <Route path="/payslip/generate" element={<PayslipGenerateForm />} />
        <Route path="/payslip/update/:id" element={<PayslipUpdateForm />} />
        <Route path="/payslip/view/:id" element={<PayslipView />} />

        {/* Benefits Management Routes */}
        <Route path="/benefits" element={<BenefitsIndex />} />
        <Route path="/benefits/add" element={<BenefitsAddForm />} />
        <Route path="/benefits/update/:id" element={<BenefitsUpdateForm />} />
        <Route path="/benefits/view/:id" element={<BenefitsView />} />

        {/* Expense Management Routes */}
        <Route path="/expenses" element={<ExpenseIndex />} />
        <Route path="/expenses/add" element={<ExpenseAddForm />} />
        <Route path="/expenses/update/:id" element={<ExpenseUpdateForm />} />
        <Route path="/expenses/view/:id" element={<ExpenseView />} />

        {/* Direct Deposit Management Routes */}
        <Route path="/deposits" element={<DepositIndex />} />
        <Route path="/deposits/add" element={<DepositAddForm />} />
        <Route path="/deposits/update/:id" element={<DepositUpdateForm />} />
        <Route path="/deposits/view/:id" element={<DepositView />} />

        {/* Attendance Management Routes */}
        <Route path="/attendance" element={<AttendanceIndex />} />
        <Route path="/attendance/add" element={<AttendanceAddForm />} />
        <Route
          path="/attendance/update/:id"
          element={<AttendanceUpdateForm />}
        />
        <Route path="/attendance/view/:id" element={<AttendanceView />} />

        {/* Tax Management Routes */}
        <Route path="/tax-management" element={<TaxManagementIndex />} />
        <Route path="/tax-management/add" element={<TaxManagementAddForm />} />
        <Route
          path="/tax-management/update/:id"
          element={<TaxManagementUpdateForm />}
        />
        <Route
          path="/tax-management/view/:id"
          element={<TaxManagementView />}
        />
        <Route path="/tax-management/parameters" element={<Parameters />} />
        <Route
          path="/tax-management/parameters/add"
          element={<ParametersAddForm />} // Assuming this is where you add new parameters
        />
      </Routes>
    </>
  );
}

export default App;
